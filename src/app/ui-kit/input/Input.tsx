import * as classNames from 'classnames';
import * as React from 'react';
import InlineSVG from 'svg-inline-react';

import { Key } from '../../../constants/constants';

import './Input.less';


interface IInputProps {
  className?: string;
  onSubmit?: (value: string) => void;
  onValidate?: (value: string) => boolean;
  autofocus?: boolean;
  onChange?: (str: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

interface IInputState {
  value: string;
  stateInput: 'error' | 'ok' | 'normal';
  autofocus: boolean;
}


export default class Input extends React.PureComponent<IInputProps, IInputState> {
  private ref: HTMLElement;

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      stateInput: 'normal',
      autofocus: false,
    };

    this.onKeyPress = this.onKeyPress.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  private onKeyPress(event) {
    const { onValidate = null, onSubmit } = this.props;
    const { value } = this.state;

    if (event.charCode === Key.ENTER) {
      if (onValidate != null) {
        if (onValidate(value)) {
          onSubmit(value);
          this.setState({ stateInput: 'ok' });
        } else {
          this.setState({ stateInput: 'error' });
        }
      } else {
        onSubmit(value);
        this.setState({ stateInput: 'ok' });
      }

      this.ref.blur();
    }
  }

  private onChange(event) {
    const { stateInput } = this.state;
    const { onChange = null } = this.props;

    const newState = {
      value: event.target.value,
    };

    if (stateInput === 'error' || stateInput === 'ok') {
      newState['stateInput'] = 'normal';
    }

    if (onChange != null) {
      onChange(event.target.value);
    }

    this.setState(newState);
  }

  public onBlur() {
    const { onValidate = null, onSubmit } = this.props;
    const { value } = this.state;

    if (onValidate != null) {
      if (onValidate(value)) {
        onSubmit(value);
        this.setState({ stateInput: 'ok' });
      } else {
        this.setState({ stateInput: 'error' });
      }
    } else {
      onSubmit(value);
      this.setState({ stateInput: 'ok' });
    }
  }

  public componentDidMount() {
    const { autofocus = false } = this.props;

    if (autofocus) {
      this.setState({ autofocus: true });
    }
  }

  public render() {
    const { value, stateInput, autofocus } = this.state;
    const { className = null, placeholder = '', disabled = false } = this.props;

    return (
      <div className="component-input-container">
        <input
          onKeyPress={this.onKeyPress}
          onChange={this.onChange}
          value={value}
          className={classNames('component-input', className, {
            error: stateInput === 'error',
          })}
          ref={(r) => this.ref = r}
          autoFocus={autofocus}
          disabled={disabled}
          placeholder={placeholder}
        />
        <InlineSVG
          className={classNames('component-input-icon', {
            ok: stateInput === 'ok',
          })}
          src={require('../../../assets/img/input-done.svg')}
        />
      </div>
    );
  }
}
