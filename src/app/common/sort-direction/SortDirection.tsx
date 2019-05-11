import * as classNames from 'classnames';
import * as React from 'react';
import InlineSVG from 'svg-inline-react';

import Title from '../../ui-kit/title/Title';

import './SortDirection.less';


export type SortDirectionType = 'up' | 'down';

interface ISortDirectionProps {
  text: string;
  initialState?: SortDirectionType;
  className?: string;
  classNameIcon?: string;
  classNameText?: string;
  onChangeDirection?: (direction: SortDirectionType) => void;
  style?: object;
}

interface ISortDirectionState {
  state: SortDirectionType;
}


export default class SortDirection extends React.PureComponent
  <ISortDirectionProps, ISortDirectionState> {
  constructor(props) {
    super(props);

    this.state = {
      state: null,
    };

    this.changeDirection = this.changeDirection.bind(this);
  }

  private changeDirection() {
    const { onChangeDirection = null } = this.props;
    const state: SortDirectionType = this.state.state === 'up' ? 'down' : 'up';

    this.setState({ state });

    if (onChangeDirection != null) {
      onChangeDirection(state);
    }
  }

  public render() {
    const {
      text,
      initialState = null,
      className = null,
      classNameIcon = null,
      classNameText = null,
      style = null,
    } = this.props;

    const { state } = this.state;

    return (
      <div
        className={classNames('sort-direction flex-v', className)}
        onClick={this.changeDirection}
        style={style}
      >
        <Title
          className={classNames('sort-direction-text', classNameText)}>
          {text}
        </Title>
        {/* <InlineSVG
          className={classNames('sort-direction-icon', classNameIcon, { 'up': state === 'up' })}
          src={require('../../../../../assets/img/common/v.svg')}
        /> */}
      </div>
    );
  }
}
