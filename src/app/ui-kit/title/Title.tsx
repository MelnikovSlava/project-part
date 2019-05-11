import * as classNames from 'classnames';
import * as React from 'react';

import './Title.less';


interface ITitleProps extends React.HTMLProps<any> {
  type?: 'big' | 'medium' | 'small' | 'thin';
  className?: string;
}

export default class Title extends React.PureComponent<ITitleProps, {}> {
  public render() {
    const { type = 'medium', className = null, children, ...rest } = this.props;

    return (
      <h2 className={classNames('component-title', className, {
        'component-title-big': type === 'big',
        'component-title-medium': type === 'medium', // curnet
        'component-title-small': type === 'small',
        'component-title-thin': type === 'thin',
      })} {...rest}>
        {children}
      </h2>
    );
  }
}
