import * as classNames from 'classnames';
import * as React from 'react';

import ListSortBar from '../../../common/list-sort-bar/ListSortBar';
import SortDirection from '../../../common/sort-direction/SortDirection';

import './ProjectSortBar.less';


interface IProjectSortBarProps extends React.HTMLProps<any> {
  className?: string;
}

export default class ProjectSortBar extends React.Component<IProjectSortBarProps, any> {
  public render() {
    const { className = '', ...rest } = this.props;

    return (
      <ListSortBar className={classNames('project-sort-bar', className)} {...rest}>

        <SortDirection
          text="Rank"
          className="project-sort-bar-rank" />

        <SortDirection
          text="Name"
          className="project-sort-bar-name" />

        <SortDirection
          text="Blockchains"
          className="project-sort-bar-blockchain" />

        <SortDirection
          text="Platforms"
          className="project-sort-bar-platform" />

        <SortDirection
          text="What's inside"
          className="project-sort-bar-subtype" />

        <SortDirection
          text="Category"
          className="project-sort-bar-subtype" />

      </ListSortBar>
    );
  }
}
