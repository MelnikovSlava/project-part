import * as classNames from 'classnames';
import * as React from 'react';
import InlineSVG from 'svg-inline-react';

import { Key } from '../../../constants/constants';

import './Search.less';


interface ISearchProps {
  classname?: string;
  onSearch(str: string): void;
}

export default class Search extends React.PureComponent<ISearchProps, any> {
  private ref: HTMLElement;

  constructor(props) {
    super(props);

    this.keyPress = this.keyPress.bind(this);
  }

  private keyPress(event) {
    if (event.charCode === Key.ENTER) {
      this.props.onSearch(event.target.value);
      this.ref.blur();
    }
  }

  public render() {
    const { classname = null } = this.props;

    return (
      <div className={classNames('search', classname)}>
        <InlineSVG
          className="search-icon"
          src={require('../../../assets/img/search.svg')}
        />
        <input
          type="text"
          className="search-input"
          autoFocus={true}
          ref={(r) => this.ref = r}
          placeholder="Search..."
          onKeyPress={this.keyPress}
        />
      </div>
    );
  }
}
