import * as classNames from 'classnames';
import * as React from 'react';

import './ListItem.less';


interface IListItemProps extends React.HTMLProps<any> {
  children: any;
  className?: string;
  onClick?: () => void;
}

export default class ListItem extends React.Component<IListItemProps, any> {
  public render() {
    const { children, className = null, onClick } = this.props;

    return (
      <div className={classNames('component-list-item', className)} onClick={onClick}>
        {children}
      </div>
    );
  }
}
