import { inject } from 'mobx-react';
import * as React from 'react';
import InlineSVG from 'svg-inline-react';

import { Key } from '../../../../constants/constants';
import { RootStore } from '../../../../store/root-store';

import './FilterInput.less';


interface IFilterInputProps {
  rootStore?: RootStore;
}

@inject('rootStore')
export default class FilterInput extends React.Component<IFilterInputProps, any> {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };

    this.changeQuery = this.changeQuery.bind(this);
    this.submitQuery = this.submitQuery.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  private changeQuery(e) {
    const value = e.target.value;

    this.setState({ query: value });
  }

  private submitQuery() {
    const { rootStore: { filterStore: { toggleQuery } } } = this.props;
    const { query } = this.state;

    if (query !== '') {
      toggleQuery(query);
      this.setState({ query: '' });
    }
  }

  private onKeyPress(event) {
    if (event.charCode === Key.ENTER) {
      this.submitQuery();
    }
  }

  public render() {
    const { rootStore: { filterStore: { clearAll } } } = this.props;
    const { query } = this.state;

    return (
      <div className="filter-input">
        <InlineSVG
          className="filter-input-icon"
          src={require('../../../../assets/img/filter.svg')} />

        <input
          className="filter-input-str"
          placeholder="Type to filter more"
          onKeyPress={this.onKeyPress}
          onChange={this.changeQuery}
          value={query}
          type="text" />

        <button
          onClick={clearAll}
          className="filter-input-btn btn">Clear all</button>
      </div>
    );
  }
}
