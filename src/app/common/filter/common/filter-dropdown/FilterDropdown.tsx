import * as classNames from 'classnames';
import * as React from 'react';
import InlineSVG from 'svg-inline-react';

import './FilterDropdown.less';


interface IFilterDropdownProps {
  title: string;
  children: any;
}

interface IFilterDropdownState {
  isVisibleDropdown: boolean;
}

export default class FilterDropdown extends React.Component<IFilterDropdownProps, IFilterDropdownState> {
  constructor(props) {
    super(props);

    this.state = {
      isVisibleDropdown: false,
    };

    this.setVisibleDropdown = this.setVisibleDropdown.bind(this);
  }

  private setVisibleDropdown() {
    this.setState((prevState: IFilterDropdownState) =>
      ({ isVisibleDropdown: !prevState.isVisibleDropdown }));
  }

  public render() {
    const { title, children } = this.props;
    const { isVisibleDropdown } = this.state;

    return (
      <div
        className="filter-dropdown"
        onMouseEnter={this.setVisibleDropdown}
        onMouseLeave={this.setVisibleDropdown}>

        <section className={classNames('filter-dropdown-header', {
          'filter-dropdown-header-hover': isVisibleDropdown,
        })}>
          <p className="filter-dropdown-text">{title}</p>
          <InlineSVG
            className="filter-dropdown-icon"
            src={require('../../../../../assets/img/v.svg')} />
        </section>

        {isVisibleDropdown &&
          <section className="filter-dropdown-body">
            {children}
          </section>}

      </div>
    );
  }
}
