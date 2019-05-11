import * as classNames from 'classnames';
import * as React from 'react';

import './ButtonLoadMore.less';


interface IButtonLoadMoreProps extends React.HTMLProps<any> {
  className?: string;
}

export default class ButtonLoadMore extends React.Component<IButtonLoadMoreProps, any> {
  public render() {
    const { className = null, ...rest } = this.props;

    return (
      <button className={classNames('component-button-load-more', className)} {...rest}>
        <p>Load more...</p>
      </button>
    );
  }
}
