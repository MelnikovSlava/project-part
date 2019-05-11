import * as React from 'react';
import InlineSVG from 'svg-inline-react';

import './Loader.less';


interface ILoaderProps {
  text?: string;
  className?: string;
  size?: number;
  style?: object;
}

class Loader extends React.Component<ILoaderProps, {}> {
  public render() {
    const { text = null, className = '', size = 40, style = {} } = this.props;

    return (
      <div className={`spinner flex ${className}`} style={style}>
        <InlineSVG
          style={{ width: `${size}px`, height: `${size}px` }}
          src={require('../../../assets/img/loader.svg')}
        />
        {text !== null && <p className="support-block__paragraph">{text}</p>}
      </div>
    );
  }
}

export default Loader;
