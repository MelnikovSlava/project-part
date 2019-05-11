import * as classNames from 'classnames';
import * as React from 'react';

import ListSortBar from '../../../common/list-sort-bar/ListSortBar';
import SortDirection from '../../../common/sort-direction/SortDirection';

import './RankSortBar.less';


interface IRankSortBarProps extends React.HTMLProps<any> {
  className?: string;
}

export default class RankSortBar extends React.Component<IRankSortBarProps, any> {
  public render() {
    const { className = '', ...rest } = this.props;

    return (
      <ListSortBar className={classNames('rank-sort-bar', className)} {...rest}>
        <SortDirection text="Rank" className="rank-sort-bar-rank" />
        <SortDirection text="Name" className="rank-sort-bar-name" />
        <SortDirection text="Voting" className="rank-sort-bar-voting" />
        <SortDirection text="Bounty" className="rank-sort-bar-bounty" />
        <SortDirection text="Moving" className="rank-sort-bar-moving" />
        <SortDirection text="Vote" className="rank-sort-bar-vote" />
      </ListSortBar>
    );
  }
}
