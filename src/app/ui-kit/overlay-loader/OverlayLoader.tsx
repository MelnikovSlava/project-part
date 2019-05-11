import * as React from 'react';

import Loader from '../loader/Loader';

import './OverlayLoader.less';


interface IOverlayLoaderProps {
  size?: number;
}

export default class OverlayLoader extends React.PureComponent<IOverlayLoaderProps, any> {
  public render() {
    const { size = 80 } = this.props;

    return (
      <div className="overlay-loader flex">
        <Loader size={size} />
      </div>
    );
  }
}
