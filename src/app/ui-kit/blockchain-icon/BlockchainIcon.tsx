import * as React from 'react';
import InlineSVG from 'svg-inline-react';

import { Blockchain } from '../../../store/entities/types';

import './BlockchainIcon.less';


interface IBlockchainIconProps {
  style?: any;
  className?: string;
  blockchain: Blockchain;
}

export default class BlockchainIcon extends React.PureComponent<IBlockchainIconProps, any> {
  public render() {
    const { style = null, className = null, blockchain } = this.props;

    let path;
    switch (blockchain) {
      case 'eos':
        path = require('../../../assets/img/blockchain/EOS-off.svg');
        break;

      case 'ethereum':
        path = require('../../../assets/img/blockchain/ethereum-off.svg');
        break;

      default:
        path = '';
        break;
    }

    return (
      <div className="blockchain-icon">
        <InlineSVG
          className={className}
          style={style}
          src={path}
        />
      </div>
    );
  }
}
