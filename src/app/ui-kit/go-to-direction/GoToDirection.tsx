import * as classNames from 'classnames';
import * as React from 'react';
import InlineSVG from 'svg-inline-react';

import './GoToDirection.less';


interface IGoToDirectionProps extends React.HTMLProps<any> {
  className?: string;
  text: string;
  onClick: () => void;
}

export default class GoToDirection extends React.Component<IGoToDirectionProps, any> {
  public render() {
    const { className = null, text, onClick, ...rest } = this.props;

    return (
      <div
        className={classNames('component-go-to-direction', className)}
        onClick={onClick}
        {...rest}>
        {text}
        <InlineSVG
          className="component-go-to-direction-icon"
          src={require('../../../assets/img/arrow-down.svg')}
        />
      </div>
    );
  }
}

