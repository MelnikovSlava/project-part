import * as classNames from 'classnames';
import * as React from 'react';

import './Tag.less';


interface ITagProps extends React.HTMLProps<any> {
  tag: string;
  className?: string;
}

export default class Tag extends React.Component<ITagProps, any> {
  public render() {
    const { tag, className = '', ...rest } = this.props;

    return (
      <div className={classNames('component-tag', className)} {...rest}>
        {tag}
      </div>
    );
  }
}
