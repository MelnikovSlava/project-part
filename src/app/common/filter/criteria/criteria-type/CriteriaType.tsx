import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { RootStore } from '../../../../../store/root-store';
import FilterDropdownItem from '../../common/filter-dropdown-item/FilterDropdownItem';
import FilterDropdown from '../../common/filter-dropdown/FilterDropdown';

import './CriteriaType.less';


interface ICriteriaTypeProps {
  rootStore?: RootStore;
}

@inject('rootStore')
@observer
export default class CriteriaType extends React.Component<ICriteriaTypeProps, any> {
  public render() {
    const {
      rootStore: {
        filterStore: {
          selectedTypes,
          toggleType,
          references: {
            types,
          },
        },
      },
    } = this.props;

    return (
      <div className="criteria-type">
        <FilterDropdown title="Type">
          {types.map((type, i) =>
            <FilterDropdownItem
              key={type + i.toString()}
              title={type}
              active={selectedTypes.has(type)}
              onClick={() => toggleType(type)} />)}
        </FilterDropdown>
      </div>
    );
  }
}
