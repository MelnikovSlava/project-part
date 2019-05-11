import * as classNames from 'classnames';
import * as React from 'react';

import { IPlatform } from '../../../../store/entities/common-entities';
import PlatformIcon from '../../../ui-kit/platform-icon/PlatformIcon';

import './ListPlatformWidget.less';


interface IListPlatformWidgetProps extends React.HTMLProps<any> {
  platforms: IPlatform[];
  className?: string;
  classNameIcon?: string;
}

export default class ListPlatformWidget extends React.Component<IListPlatformWidgetProps, any> {
  public render() {
    const { platforms, className = null, classNameIcon = null, ...rest } = this.props;

    return (
      <div className={classNames('component-list-platform-widget', className)} {...rest}>
        {platforms.length > 0
          ? platforms.map((platform, i) =>
            <PlatformIcon
              key={platform.slug + i}
              platform={platform.slug}
              className={classNameIcon} />)
          : <p style={{ margin: '0' }}>-</p>}
      </div>
    );
  }
}
