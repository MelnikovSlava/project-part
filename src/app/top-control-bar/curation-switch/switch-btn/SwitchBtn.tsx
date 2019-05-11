import * as classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import InlineSVG from 'svg-inline-react';

import { getAccountAddress, getMetamaskStatus, readCRankContract } from '../../../../helpers/eth';
import { checkMetamaskStatus } from '../../../../helpers/utils';
import { RootStore } from '../../../../store/root-store';

import './SwitchBtn.less';


interface ISwitchBtnProps {
  className?: string;
  rootStore?: RootStore;
}

@inject('rootStore')
@observer
export default class SwitchBtn extends React.Component<ISwitchBtnProps, any> {
  private ref: HTMLElement;

  constructor(props) {
    super(props);

    this.click = this.click.bind(this);
    this.setStatus = this.setStatus.bind(this);
    this.goTo = this.goTo.bind(this);
    this.togglePop = this.togglePop.bind(this);
  }

  private togglePop() {
    if (this.ref.classList.contains('pop-visible')) {
      this.ref.classList.remove('pop-visible');
    } else {
      this.ref.classList.add('pop-visible');
    }
  }

  private goTo() {
    const { rootStore: { router } } = this.props;

    router.push('/alpha/curator-guide');
  }

  private setStatus() {
    const address = getAccountAddress();

    return readCRankContract('balanceOf', [address]);
  }

  private click() {
    const { rootStore: { appStore: { setUserStatusAction, isCurator } } } = this.props;

    const mStatus = getMetamaskStatus();
    if (mStatus === 'unlockMetamask' || mStatus === 'noMetamask') {
      this.goTo();
      return;
    }

    this.setStatus()
      .then((result) => {
        const tokenCount = +(result.toString().substr(0, 5));

        if (tokenCount > 0) {
          setUserStatusAction(!isCurator);
        } else {
          this.goTo();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  public componentDidMount() {
    const { rootStore: { appStore: { setUserStatusAction } } } = this.props;

    // wait 2s while web3 inject
    setTimeout(() => {
      const mStatus = getMetamaskStatus();
      if (mStatus === 'okMetamask') {
        this.setStatus()
          .then((result) => {
            const tokenCount = +(result.toString());

            if (tokenCount > 0) {
              setUserStatusAction(true);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }, 2000);
  }

  public render() {
    const { rootStore: { appStore: { isCurator } }, className = null } = this.props;

    return (
      <div
        className={classNames('switch-btn', className, { on: isCurator })}
        onMouseEnter={this.togglePop}
        onMouseLeave={this.togglePop}
        onClick={this.click}>
        <div className="internal-btn">
          <p className="internal-btn-text">{isCurator ? 'ON' : 'OFF'}</p>
        </div>
        <div className="pop" ref={(ref) => this.ref = ref}>
          <InlineSVG
            className="pop-icon"
            src={require('../../../../assets/img/become-a-curator.svg')} />

          <h2 className="pop-title1">Become a curator</h2>
          <h2 className="pop-title2">and earn money!</h2>

          <p className="pop-desc">Our ratings are based on the new Crank technology. We invite everyone to the testing and give the opportunity to earn money.</p>

          <p className="pop-sw">Switch ON to learn more</p>
        </div>
      </div>
    );
  }
}
