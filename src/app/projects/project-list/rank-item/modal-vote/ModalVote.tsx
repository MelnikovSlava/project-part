import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { formatWei, getStage, getTimeSec } from '../../../../../helpers/c-rank';
import {
    getAccountAddress, getHashFromContract, readCRankContract, waitTransaction, web3Local,
} from '../../../../../helpers/eth';
import {
    cutDecimals, getFromLocalStorage, getRandomInt, putToLocalStorage,
} from '../../../../../helpers/utils';
import { ProjectModel } from '../../../../../store/entities/project-entity';
import Rank from '../../../../../store/models/rank';
import { RootStore } from '../../../../../store/root-store';
import Input from '../../../../ui-kit/input/Input';
import Loader from '../../../../ui-kit/loader/Loader';

import './ModalVote.less';


interface IModalVoteProps {
  item: Rank;
  project: ProjectModel.IProjectLite;
  onClose: () => void;
  rootStore?: RootStore;
}

interface IModalVoteState {
  flexComm: string;
  fixCom: string;
  stake: string;
  direction: 'up' | 'down';
  isLoader: boolean;
}

@inject('rootStore')
@observer
export default class ModalVote extends React.Component<IModalVoteProps, IModalVoteState> {
  constructor(props) {
    super(props);

    this.state = {
      flexComm: null,
      fixCom: null,
      stake: null,
      direction: 'up',
      isLoader: false,
    };

    this.changeStake = this.changeStake.bind(this);
    this.submitStake = this.submitStake.bind(this);
    this.selectDirection = this.selectDirection.bind(this);
    this.sendTrans = this.sendTrans.bind(this);
    this.voteFinish = this.voteFinish.bind(this);
    this.voteReveal = this.voteReveal.bind(this);
    this.generateHash = this.generateHash.bind(this);
  }

  private generateHash(prefix: string, itemId: ProjectModel.Id): string {
    return `${prefix}_${itemId}_${getAccountAddress()}`;
  }

  public changeStake(str) {
    this.setState({ stake: str });
  }

  public submitStake(stake: string) {
    const { item } = this.props;
    const isVoting = item.votingId !== '0';

    if (!isVoting) {
      readCRankContract('avgStake')
        .then((avgStk) => {
          readCRankContract('getDynamicCommission', [formatWei(stake, 'to'), avgStk.toString()])
            .then((flexComm) => this.setState({ flexComm: flexComm.toString() }))
            .catch((error) => {
              this.setState({ flexComm: 'Some problem!' });
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  public selectDirection(direction) {
    return () => this.setState({ direction });
  }

  public componentWillMount() {
    const { item, project } = this.props;
    const isVoting = item.votingId !== '0';

    if (isVoting) {
      this.setState({
        fixCom: item.vote.fixedFee,
        flexComm: item.vote.avgStake,
      });
    } else {
      readCRankContract('getFixedCommission', [project.id])
        .then((result) => this.setState({ fixCom: result.toString() }))
        .catch((error) => {
          this.setState({ fixCom: 'Some problem!' });
          console.error(error);
        });
    }
  }

  public sendTrans() {
    const { direction, stake, flexComm, fixCom } = this.state;
    const { item, project, onClose, rootStore: { projectStore: { fetchRankProject } } } = this.props;
    const biDir = direction === 'up' ? 1 : 0;

    const salt: number = getRandomInt(0, 9999) + project.id;

    getHashFromContract([biDir, formatWei(stake, 'to'), salt])
      .then((hash) => {
        readCRankContract('voteCommit', [project.id, hash])
          .then((res) => {
            putToLocalStorage(this.generateHash('vote_data', project.id),
              { flexComm, fixCom, stake, direction });
            putToLocalStorage(this.generateHash('salt', project.id), salt);

            this.setState({ isLoader: true });

            waitTransaction(res)
              .then((result) => {
                onClose();
                fetchRankProject(project.id);
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  public voteFinish() {
    const { item, project, onClose, rootStore: { projectStore: { fetchRankProject } } } = this.props;

    readCRankContract('finishVoting', [project.id])
      .then((result) => {
        this.setState({ isLoader: true });

        waitTransaction(result)
          .then((result) => {
            onClose();
            fetchRankProject(project.id);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  public voteReveal() {
    const { item, project, onClose, rootStore: { projectStore: { fetchRankProject } } } = this.props;

    const data = getFromLocalStorage(this.generateHash('vote_data', project.id));
    const biDir = data.direction === 'up' ? 1 : 0;

    const salt: number = +getFromLocalStorage(this.generateHash('salt', project.id));

    readCRankContract('voteReveal', [project.id, biDir, formatWei(data.stake, 'to'), salt])
      .then((result) => {
        this.setState({ isLoader: true });

        waitTransaction(result)
          .then((result) => {
            onClose();
            fetchRankProject(project.id);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  public render() {
    const { flexComm, direction, fixCom, isLoader } = this.state;
    const { item, project } = this.props;

    let content;
    let btn;
    const isVoting = item.votingId !== '0';
    const stage = isVoting
      ? getStage(item.vote.startTime, item.vote.commitTtl, item.vote.revealTtl)
      : null;

    if (!isVoting || stage === 'commit') {
      const fixComElement = `Fix commission: ${cutDecimals(+formatWei(fixCom, 'from'))}`;
      const flexComElement = `Flex commission: ${flexComm === null
        ? '-' : cutDecimals(+formatWei(flexComm, 'from'))}`;

      content = (
        <div>
          <div className="input-wrapper">
            <p className="caption t-medium">Stake:</p>
            <Input
              className="custom-input"
              autofocus={true}
              onValidate={(str) => /^\d+$/.test(str)}
              onChange={this.changeStake}
              onSubmit={this.submitStake}
            />
          </div>
          <div className="commission-container flex">
            <p className="fix-comm">{fixComElement}</p>
            <p className="flex-comm">{flexComElement}</p>
          </div>

          <div className="switch flex">
            <section
              onClick={this.selectDirection('up')}
              className={classNames('up flex', { active: direction === 'up' })}
            >
              <svg className="up-icon" viewBox="0 0 24 24">
                <path fill="#000000" d="M7,10L12,15L17,10H7Z" />
              </svg>
              Up</section>
            <section
              onClick={this.selectDirection('down')}
              className={classNames('down flex', { active: direction === 'down' })}
            >
              <svg className="down-icon" viewBox="0 0 24 24">
                <path fill="#000000" d="M7,10L12,15L17,10H7Z" />
              </svg>
              Down</section>
          </div>
        </div>
      );

      btn = <button className="submit btn" onClick={this.sendTrans}>Commit vote</button>;

    } else if (stage === 'reveal') {
      const data = getFromLocalStorage(`vote_data_${project.id}_${getAccountAddress()}`);
      const fixCom = cutDecimals(+formatWei(data.fixCom, 'from'));
      const flexComm = cutDecimals(+formatWei(data.flexComm, 'from'));

      content = (
        <div className="old-info">
          <p className="stake">{`Stake: ${data.stake}`}</p>
          <p className="commission">{`Commission: ${fixCom} + ${flexComm}`}</p>
          <p className="direction">{`Direction: ${data.direction}`}</p>
        </div>
      );

      btn = <button className="submit btn" onClick={this.voteReveal}>Reveal</button>;

    } else {
      btn = <button className="submit btn" onClick={this.voteFinish}>Finish</button>;
    }

    return (
      <div className="modal-vote">
        {isLoader &&
          <div className="overlay flex">
            <Loader size={80} />
          </div>
        }
        <h2 className="title">Voting</h2>
        {content}
        {btn}
      </div>
    );
  }
}
