import * as classNames from 'classnames';
import * as React from 'react';

import './ListSimpleValue.less';


interface IListSimpleValueProps extends React.HTMLProps<any> {
  className?: string;
  value: string;
}

export default class ListSimpleValue extends React.Component<IListSimpleValueProps, any> {
  public render() {
    const { className = null, value, ...rest } = this.props;

    return (
      <div className={classNames('component-list-rank-widget', className)} {...rest}>
        <p style={{ margin: 0 }}>{value}</p>
      </div>
    );
  }
}
