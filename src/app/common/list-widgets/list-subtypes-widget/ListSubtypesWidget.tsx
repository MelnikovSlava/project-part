import * as classNames from 'classnames';
import * as React from 'react';

import Tag from '../../tag/Tag';

import './ListSubtypesWidget.less';


interface IListSubtypesWidgetProps extends React.HTMLProps<any> {
  subtypes: { [propertyName: string]: boolean };
  className?: string;
}

export default class ListSubtypesWidget extends React.Component<IListSubtypesWidgetProps, any> {
  public render() {
    const { subtypes, className = '', ...rest } = this.props;

    return (
      <div className={classNames('component-list-subtypes-widget', className)} {...rest}>
        {Object.keys(subtypes).length > 0
          ? Object.keys(subtypes).map((property, i) =>
            <Tag key={property + i} tag={property} />)
          : <p>-</p>}
      </div>
    );
  }
}
