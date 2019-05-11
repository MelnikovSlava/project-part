import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { RootStore } from '../../../../../store/root-store';
import FilterDropdownItem from '../../common/filter-dropdown-item/FilterDropdownItem';
import FilterDropdown from '../../common/filter-dropdown/FilterDropdown';

import './CriteriaCategory.less';


interface ICriteriaCategoryProps {
  rootStore?: RootStore;
}

@inject('rootStore')
@observer
export default class CriteriaCategory extends React.Component<ICriteriaCategoryProps, any> {
  public render() {
    const {
      rootStore: {
        filterStore: {
          selectedCategories,
          toggleCategory,
          references: {
            categories,
          },
        },
      },
    } = this.props;

    return (
      <div className="criteria-category">
        <FilterDropdown title="Category">
          {categories.map((cat) =>
            <FilterDropdownItem
              key={cat.slug + cat.id}
              title={cat.name}
              active={selectedCategories.has(cat.id)}
              onClick={() => toggleCategory(cat.id)} />)}
        </FilterDropdown>
      </div>
    );
  }
}
