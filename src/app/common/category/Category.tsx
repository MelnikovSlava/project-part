import * as classNames from 'classnames';
import * as React from 'react';

import './Category.less';


interface ICategoryProps extends React.HTMLProps<any> {
  className?: string;
  category: string;
}

export default class Category extends React.Component<ICategoryProps, any> {
  public render() {
    const { className = null, category, ...rest } = this.props;

    return (
      <div className={classNames('component-category', className)} {...rest}>
        {category}
      </div>
    );
  }
}
