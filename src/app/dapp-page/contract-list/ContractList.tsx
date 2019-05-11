import * as React from 'react';

import { getNetworkEtherscanAddress } from '../../../helpers/eth';
import { copyTextToClipboard } from '../../../helpers/utils';
import { ISmartcontracts } from '../../../store/entities/common-entities';
import AddressString from '../../ui-kit/address-string/AddressString';
import CopyButton from '../../ui-kit/copy-button/CopyButton';
import Title from '../../ui-kit/title/Title';

import './ContractList.less';


interface IContractListProps {
  contractList: ISmartcontracts[];
}

export default class ContractList extends React.PureComponent<IContractListProps, any> {
  public render() {
    const { contractList } = this.props;

    return (
      <div className="cn-contract-list">
        <Title type="small" className="title">Contracts</Title>
        <div className="list-wrapper">
          {contractList.map((contract, i) => {
            let link = contract.blockchain.slug === 'ethereum'
              ? `${getNetworkEtherscanAddress(contract.network_id)}/address/${contract.address}`
              : null;

            return (
              <div className="flex-v" key={contract.address + i}>
                <a
                  className="item flex"
                  href={link}
                  target="_blank"
                >
                  <AddressString str={contract.address} />
                </a>
                <CopyButton
                  isShowText={false}
                  onClick={() => copyTextToClipboard(contract.address)}
                  className="item-copy"
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
