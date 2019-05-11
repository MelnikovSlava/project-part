import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { RootStore } from '../../../../../store/root-store';
import FilterDropdownItem from '../../common/filter-dropdown-item/FilterDropdownItem';
import FilterDropdown from '../../common/filter-dropdown/FilterDropdown';

import './CriteriaBlockchain.less';


interface ICriteriaBlockchainProps {
  rootStore?: RootStore;
}

@inject('rootStore')
@observer
export default class CriteriaBlockchain extends React.Component<ICriteriaBlockchainProps, any> {
  public render() {
    const {
      rootStore: {
        filterStore: {
          selectedBlockchains,
          toggleBlockchain,
          references: {
            blockchains,
          },
        },
      },
    } = this.props;

    return (
      <div className="criteria-blockchain">
        <FilterDropdown title="Blockchain">
          {blockchains.map((blkchn) =>
            <FilterDropdownItem
              key={blkchn.slug + blkchn.id}
              title={blkchn.name}
              active={selectedBlockchains.has(blkchn.id)}
              onClick={() => toggleBlockchain(blkchn.id)} />)}
        </FilterDropdown>
      </div>
    );
  }
}
