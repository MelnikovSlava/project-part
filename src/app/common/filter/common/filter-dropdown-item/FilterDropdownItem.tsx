import * as classNames from 'classnames';
import * as React from 'react';
import InlineSVG from 'svg-inline-react';

import './FilterDropdownItem.less';


interface IFilterDropdownItemProps extends React.HTMLProps<any> {
  className?: string;
  active: boolean;
  onClick: any;
  title: string;
}

export default class FilterDropdownItem extends React.Component<IFilterDropdownItemProps, any> {
  public render() {
    const { className = null, title, active, ...rest } = this.props;

    return (
      <div className={classNames('component-filter-dropdown-item', className)} {...rest}>
        <div className="c-f-d-i-checkbox flex">
          {active &&
            <InlineSVG
              className="c-f-d-i-icon"
              src={require('../../../../../assets/img/v-long.svg')} />}
        </div>
        <p className="c-f-d-i-title">{title}</p>
      </div>
    );
  }
}
