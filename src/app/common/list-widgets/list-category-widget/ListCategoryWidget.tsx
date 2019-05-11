import * as classNames from 'classnames';
import * as React from 'react';

import Category from '../../category/Category';

import './ListCategoryWidget.less';


interface IListCategoryWidgetProps extends React.HTMLProps<any> {
  className?: string;
  categories: string[];
}

export default class ListCategoryWidget extends React.Component<IListCategoryWidgetProps, any> {
  public render() {
    const { className = null, categories, ...rest } = this.props;

    let content = categories.length > 0
      ? categories.map((cat, i) => <Category key={i} category={cat} className="category-widget-item" />)
      : '-';

    return (
      <div className={classNames('component-list-category-widget', className)} {...rest}>
        {content}
      </div>
    );
  }
}

