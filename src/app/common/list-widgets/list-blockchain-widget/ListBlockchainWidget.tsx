import * as classNames from 'classnames';
import * as React from 'react';

import { IBlockchainLite } from '../../../../store/entities/common-entities';
import BlockchainIcon from '../../../ui-kit/blockchain-icon/BlockchainIcon';

import './ListBlockchainWidget.less';


interface IListBlockchainWidgetProps extends React.HTMLProps<any> {
  blockchains: IBlockchainLite[];
  className?: string;
  classNameIcon?: string;
}

export default class ListBlockchainWidget extends React.Component<IListBlockchainWidgetProps, any> {
  public render() {
    const { blockchains, classNameIcon = null, className = null, ...rest } = this.props;

    return (
      <div className={classNames('component-list-blockchain-widget', className)} {...rest}>
        {blockchains.map((blchn, i) =>
          <BlockchainIcon
            key={blchn.name + i}
            blockchain={blchn.slug}
            className={classNameIcon} />)}
      </div>
    );
  }
}
