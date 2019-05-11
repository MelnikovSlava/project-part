import * as React from 'react';
import InlineSVG from 'svg-inline-react';

import { Platform } from '../../../store/entities/types';

import './PlatformIcon.less';


interface IPlatformIconProps {
  style?: any;
  className?: string;
  platform: Platform;
}

export default class PlatformIcon extends React.PureComponent<IPlatformIconProps, any> {
  public render() {
    const { style = null, className = null, platform } = this.props;

    let path;
    switch (platform) {
      case 'android':
        path = require('../../../assets/img/platforms/android.svg');
        break;

      case 'ios':
        path = require('../../../assets/img/platforms/apple.svg');
        break;

      case 'linux':
        path = require('../../../assets/img/platforms/android.svg');
        break;

      case 'macos':
        path = require('../../../assets/img/platforms/mac.svg');
        break;

      case 'web':
        path = require('../../../assets/img/platforms/chrome.svg');
        break;

      case 'windows':
        path = require('../../../assets/img/platforms/windows.svg');
        break;

      default:
        path = '';
        break;
    }

    return (
      <div className="platform-icon">
        <InlineSVG
          className={className}
          style={style}
          src={path}
        />
      </div>
    );
  }
}
