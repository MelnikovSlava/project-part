import { BigNumber } from 'bignumber.js';
import * as classNames from 'classnames';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { formatWei, getStage, getTimeLeft, getTimeSec } from '../../../../helpers/c-rank';
import { RootStore } from '../../../../store/root-store';
import ListItem from '../../../common/list-item/ListItem';
import ListMovingWidget from '../../../common/list-widgets/list-moving-widget/ListMovingWidget';
import ListNameWidget from '../../../common/list-widgets/list-name-widget/ListNameWidget';
import ListRankWidget from '../../../common/list-widgets/list-rank-widget/ListRankWidget';
import ListSimpleValue from '../../../common/list-widgets/list-simple-value/ListSimpleValue';
import ListStageWidget from '../../../common/list-widgets/list-stage-widget/ListStageWidget';
import ModalContainer from '../../../ui-kit/modal/ModalContainer';
import OverlayLoader from '../../../ui-kit/overlay-loader/OverlayLoader';
import ModalVote from './modal-vote/ModalVote';

import './RankItem.less';


interface IRankItemProps extends React.HTMLProps<any> {
  className?: string;
  rootStore?: RootStore;
  id: any;
  num: number;
}

interface IRankItemState {
  isOpenVoteModal: boolean;
}

@inject('rootStore')
@observer
export default class RankItem extends React.Component<IRankItemProps, IRankItemState> {
  private timerId: any;
  private timeRepeat: number;

  constructor(props) {
    super(props);

    this.state = {
      isOpenVoteModal: false,
    };

    this.timerId = null;
    this.timeRepeat = 5;

    this.toggleModal = this.toggleModal.bind(this);
  }

  private toggleModal() {
    this.setState((prevState: IRankItemState) => ({
      isOpenVoteModal: !prevState.isOpenVoteModal,
    }));
  }

  public componentWillMount() {
    const { rootStore: { projectStore: { fetchRankProject } }, id } = this.props;
    fetchRankProject(id);
  }

  public componentWillUnmount() {
    clearInterval(this.timerId);
  }

  public componentDidUpdate(prevProps, prevState) {
    const {
      rootStore: {
        projectStore: {
          projectList,
          fetchRankProject,
        },
      },
      id,
    } = this.props;

    const rankData = projectList.get(id).rankData;
    if (rankData === null) {
      fetchRankProject(id);
      return null;
    }

    // force reload every one sec (if voting)
    if (rankData.votingId !== '0') {
      const timeLeft = +getTimeLeft(rankData.vote.startTime,
        rankData.vote.commitTtl, rankData.vote.revealTtl);

      if (timeLeft !== 0) {
        setTimeout(() => this.forceUpdate(), 1000);
      }
    }

    // set timer for regular update item
    if (this.timerId === null &&
      (rankData.votingId !== '0' || rankData.movings.length !== 0)) {
      this.timerId = setInterval(() => fetchRankProject(id), this.timeRepeat * 1000);
    }
  }


  public render() {
    const {
      rootStore: {
        projectStore: {
          projectList,
        },
      },
      id,
      className = '',
      num,
      ...rest } = this.props;

    const { isOpenVoteModal } = this.state;

    const durationAnimation = 200;

    if (projectList === null) {
      return null;
    }
    const { error, isLoading, rankData, project } = projectList.get(id);

    let stage = null;
    let timeLeft = null;
    let bounty = '-';
    let rank = '-';
    let moving = null;

    if (rankData !== null) {
      const isVoting = rankData.votingId !== '0';

      stage = isVoting
        ? getStage(rankData.vote.startTime,
          rankData.vote.commitTtl, rankData.vote.revealTtl)
        : null;

      timeLeft = isVoting
        ? getTimeLeft(rankData.vote.startTime,
          rankData.vote.commitTtl, rankData.vote.revealTtl)
        : null;

      bounty = rankData.balance;

      rank = rankData.rank !== null ? formatWei(rankData.rank.toString(), 'from') : null;

      moving = rankData.movings.length > 0
        ? formatWei(rankData.movings.reduce((acc, cur) => (
          acc.plus(
            ((new BigNumber(cur.distance).div(cur.speed).toNumber() + +cur.startTime) > getTimeSec()
              ? new BigNumber(cur.speed).multipliedBy(cur.direction.toString() === '0' ? -1 : 1)
              : 0))), new BigNumber('0')).toString(), 'from').toString()
        : null;
    }

    return (
      <ListItem className={classNames('rank-item', className)} >
        {isLoading && rankData === null && <OverlayLoader size={30} />}
        <ListRankWidget
          num={num.toString()}
          rank={rank}
          className="rank-item-rank" />

        <ListNameWidget
          description={project.short_description}
          icon={project.icon}
          name={project.name}
          className="rank-item-name" />

        <ListStageWidget
          stage={stage}
          timeleft={timeLeft}
          className="rank-item-voting" />

        <ListSimpleValue
          value={bounty}
          className="rank-item-bounty" />

        <ListMovingWidget
          moving={moving}
          className="rank-item-moving" />

        <button
          className="rank-item-btn btn"
          onClick={this.toggleModal}>Vote</button>

        <ModalContainer
          isOpen={isOpenVoteModal}
          classNameWindow="dashboard-modal"
          onClose={this.toggleModal}
          animationWindow={{
            duration: durationAnimation,
            styleStart: {
              opacity: 0,
              transform: 'scale(.95,.95)',
            },
            styleEnd: {
              opacity: 1,
              transform: 'scale(1,1)',
            },
          }}
          animationBackdrop={{
            duration: durationAnimation,
            styleStart: { opacity: 0 },
            styleEnd: { opacity: 1 },
          }}
          blur={{
            block: 'app',
            duration: durationAnimation,
            size: 3,
          }}
        >
          <ModalVote item={rankData} onClose={this.toggleModal} project={project} />
        </ModalContainer>
      </ListItem>
    );
  }
}
