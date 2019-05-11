import * as React from 'react';

import './Overlay.less';


export default class Overlay extends React.Component<any, any> {
  private ref: HTMLElement;

  public componentDidMount() {
    setTimeout(() => this.ref.classList.add('component-overlay-ok'), 0);
  }

  public render() {
    return (
      <div className="component-overlay" ref={(ref) => this.ref = ref} />
    );
  }
}
