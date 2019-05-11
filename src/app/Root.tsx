import * as React from 'react';


export class Root extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.renderDevTool = this.renderDevTool.bind(this);
  }

  private renderDevTool() {
    if (process.env.NODE_ENV !== 'production') {
      const DevTools = require('mobx-react-devtools').default;
      return <DevTools />;
    }
  }

  public render() {
    return (
      <div className="container">
        {this.props.children}
        {this.renderDevTool()}
      </div>
    );
  }
}
