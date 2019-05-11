import * as classNames from 'classnames';
import * as React from 'react';

import './Button.less';


interface IButtonProps {
  content?: string;
  children?: any;
  className?: string;
  isDisabled?: boolean;
  kind?: 'green' | 'white' | 'lightgreen' | 'gray' | 'small' | 'large';
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export default class Button extends React.PureComponent<IButtonProps, {}> {
  public render() {
    const {
      content = null,
      className = null,
      onClick = null,
      kind = 'green',
      children = null,
      isDisabled = false,
      type = 'button',
    } = this.props;

    return (
      <button
        onClick={onClick}
        type={type}
        className={
          classNames('component-button', className, {
            'component-button-green': kind === 'green',
            'component-button-white': kind === 'white',
            'component-button-lightgreen': kind === 'lightgreen',
            'component-button-gray': kind === 'gray',
            'component-button-small': kind === 'small',
            'component-button-large': kind === 'large',
            'component-button-disabled': isDisabled,
          })}
      >
        {content}
        {children}
      </button >
    );
  }
}
