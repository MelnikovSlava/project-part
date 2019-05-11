import * as classNames from 'classnames';
import * as React from 'react';

import './ListSortBar.less';


interface IListSortBarProps extends React.HTMLProps<any> {
  className?: string;
  children: any;
}

export default class ListSortBar extends React.Component<IListSortBarProps, any> {
  public render() {
    const { children, className = '', ...rest } = this.props;

    return (
      <div className={classNames('component-list-sort-bar', className)} {...rest}>
        {children}
      </div>
    );
  }
}
