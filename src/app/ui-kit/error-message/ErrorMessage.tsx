import * as React from 'react';

import './ErrorMessage.less';


interface IErrorMessageProps {
  style?: object;
  text: string;
}

export default class ErrorMessage extends React.PureComponent<IErrorMessageProps, any> {
  public render() {
    const { text, style = null } = this.props;

    return (
      <div className="component-error-message flex" style={style}>
        <p className="component-error-message-text">{text}</p>
      </div>
    );
  }
}
