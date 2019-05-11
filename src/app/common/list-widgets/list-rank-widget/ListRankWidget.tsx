import * as classNames from 'classnames';
import * as React from 'react';

import Text from '../../../ui-kit/text/Text';

import './ListRankWidget.less';


interface IListRankWidgetProps extends React.HTMLProps<any> {
  num: string;
  rank?: string;
  className?: string;
}

export default class ListRankWidget extends React.Component<IListRankWidgetProps, any> {
  public render() {
    const { rank, num, className = '', ...rest } = this.props;

    let rankFormat;
    if (rank === null) {
      rankFormat = '-';
    } else {
      rankFormat = (+rank).toFixed(1);
    }

    return (
      <div className={classNames('component-list-rank-widget', className)} {...rest}>
        <p style={{ margin: '0' }}>{num}</p>
        <Text type="caption">{rankFormat}</Text>
      </div>
    );
  }
}
