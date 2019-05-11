import * as React from 'react';
import InlineSVG from 'svg-inline-react';

import './CopyButton.less';


interface ICopyButtonProps {
  className?: string;
  onClick: () => void;
  isShowText?: boolean;
}

export default class CopyButton extends React.PureComponent<ICopyButtonProps, {}> {
  public render() {
    const { className, onClick, isShowText = true } = this.props;

    return (
      <div className={`copy-button ${className}`} onClick={onClick}>
        <InlineSVG
          className="img-copy-button"
          src={require('../../../assets/img/copy.svg')}
        />
        {isShowText && <span>Copy</span>}
      </div>
    );
  }
}
