import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { RootStore } from '../../../../../store/root-store';
import FilterDropdownItem from '../../common/filter-dropdown-item/FilterDropdownItem';
import FilterDropdown from '../../common/filter-dropdown/FilterDropdown';

import './CriteriaPlatform.less';


interface ICriteriaPlatformProps {
  rootStore?: RootStore;
}

@inject('rootStore')
@observer
export default class CriteriaPlatform extends React.Component<ICriteriaPlatformProps, any> {
  public render() {
    const {
      rootStore: {
        filterStore: {
          selectedPlatforms,
          togglePlatform,
          references: {
            platforms,
          },
        },
      },
    } = this.props;

    return (
      <div className="criteria-platform">
        <FilterDropdown title="Platform">
          {platforms.map((platform) =>
            <FilterDropdownItem
              key={platform.slug + platform.id}
              title={platform.name}
              active={selectedPlatforms.has(platform.id)}
              onClick={() => togglePlatform(platform.id)} />)}
        </FilterDropdown>
      </div>
    );
  }
}
