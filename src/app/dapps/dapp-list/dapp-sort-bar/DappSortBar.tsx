import * as classNames from 'classnames';
import * as React from 'react';

import ListSortBar from '../../../common/list-sort-bar/ListSortBar';
import SortDirection from '../../../common/sort-direction/SortDirection';

import './DappSortBar.less';


interface IDappSortBarProps extends React.HTMLProps<any> {
  className?: string;
}

export default class DappSortBar extends React.Component<IDappSortBarProps, any> {
  public render() {
    const { className = '', ...rest } = this.props;

    return (
      <ListSortBar className={classNames('dapp-sort-bar', className)} {...rest}>
        <SortDirection text="#" className="dapp-sort-bar-rank" />
        <SortDirection text="Name" className="dapp-sort-bar-name" />
        <SortDirection text="Transactions" className="dapp-sort-bar-transactions" />
        <SortDirection text="Volume" className="dapp-sort-bar-volume" />
        <SortDirection text="DAU" className="dapp-sort-bar-hour24" />
        <SortDirection text="WAU" className="dapp-sort-bar-week" />
        <SortDirection text="Category" className="dapp-sort-bar-category" />
      </ListSortBar>
    );
  }
}
