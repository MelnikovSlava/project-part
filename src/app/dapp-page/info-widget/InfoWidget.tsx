import * as classNames from 'classnames';
import * as React from 'react';

import Text from '../../ui-kit/text/Text';

import './InfoWidget.less';


interface IInfoWidgetProps {
  typeWidget?: 'content' | 'aside';
  size?: number;
  title: string;
  className?: string;
}

export default class InfoWidget extends React.PureComponent<IInfoWidgetProps, any> {
  public render() {
    const { typeWidget = 'content', title, className = null, children } = this.props;

    return (
      <div className={classNames('cn-info-widget', className)}>
        <Text style={{ fontSize: 12 }}>{title}</Text>
        <div className="flex-v">
          {children}
        </div>
      </div >
    );
  }
}
