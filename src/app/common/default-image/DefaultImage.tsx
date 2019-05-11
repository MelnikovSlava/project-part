import * as classNames from 'classnames';
import * as React from 'react';

import { requestsConfig } from '../../../../config/config';

import './DefaultImage.less';


interface IDefaultImageProps extends React.HTMLProps<any> {
  className?: string;
  icon: string;
}

export default class DefaultImage extends React.Component<IDefaultImageProps, any> {
  public render() {
    const { className = null, icon, ...rest } = this.props;

    return (
      <div className={classNames('component-default-image', className, {
        'component-default-no-image': icon === null,
      })} {...rest}>
        {icon && <img src={`${requestsConfig.BASE_URL}${icon}`} alt={`icon`} />}
      </div>
    );
  }
}
