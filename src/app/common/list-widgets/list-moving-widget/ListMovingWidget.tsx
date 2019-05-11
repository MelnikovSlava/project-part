import * as classNames from 'classnames';
import * as React from 'react';

import './ListMovingWidget.less';


interface IListMovingWidgetProps extends React.HTMLProps<any> {
  className?: string;
  moving: string;
}

export default class ListMovingWidget extends React.Component<IListMovingWidgetProps, any> {
  public render() {
    const { className = null, moving, ...rest } = this.props;
    const element = moving !== null && moving !== '0' ? `${moving} CRN/sec` : '-';

    return (
      <div className={classNames('component-list-moving-widget', className)} {...rest}>
        <p style={{ margin: 0 }}>{element}</p>
      </div>
    );
  }
}
