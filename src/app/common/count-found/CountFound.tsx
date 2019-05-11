import * as classNames from 'classnames';
import * as React from 'react';

import Loader from '../../ui-kit/loader/Loader';
import Text from '../../ui-kit/text/Text';

import './CountFound.less';


interface ICountFoundProps extends React.HTMLProps<any> {
  className?: string;
  count: number;
  text: string;
  isLoading: boolean;
}

export default class CountFound extends React.Component<ICountFoundProps, any> {
  public render() {
    const { className = null, count, text, isLoading, ...rest } = this.props;

    return (
      <div className={classNames('component-count-found', className)} {...rest}>
        <Text type="big">{`${count ? count : 0} ${text}`}</Text>
        {isLoading && <Loader size={20} style={{ marginLeft: '14px' }} />}
      </div>
    );
  }
}
