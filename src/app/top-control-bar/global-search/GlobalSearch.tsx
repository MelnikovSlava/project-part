import * as classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import InlineSVG from 'svg-inline-react';

import { Key } from '../../../constants/constants';
import { childOf } from '../../../helpers/utils';
import { RootStore } from '../../../store/root-store';
import SearchView from '../search-view/SearchView';

import './GlobalSearch.less';


interface IGlobalSearchProps {
  rootStore?: RootStore;
  className?: string;
}

interface IGlobalSearchState {
  query: string;
  isShowClear: boolean;
}

@inject('rootStore')
@observer
export default class GlobalSearch extends React.Component<IGlobalSearchProps, IGlobalSearchState> {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      isShowClear: false,
    };

    this.changeQuery = this.changeQuery.bind(this);
    this.submitQuery = this.submitQuery.bind(this);
    this.clearQuery = this.clearQuery.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.handleWindowClick = this.handleWindowClick.bind(this);
  }

  private changeQuery(e) {
    const {
      rootStore: {
        globalSearchStore: {
          isShowResults,
          closeSearchResults,
        },
      },
    } = this.props;

    const value = e.target.value;

    if (value === '' && isShowResults) {
      closeSearchResults(false);
    }

    this.setState({ query: value });
  }

  private onKeyPress(event) {
    if (event.charCode === Key.ENTER) {
      this.submitQuery();
    }
  }

  private clearQuery() {
    const { rootStore: { globalSearchStore: { isShowResults, closeSearchResults } } } = this.props;

    this.setState({ query: '' });

    if (isShowResults) {
      closeSearchResults(false);
    }
  }

  private submitQuery() {
    const { rootStore: { globalSearchStore: { searchData } } } = this.props;
    const { query } = this.state;

    if (query !== '') {
      searchData(query);
    }
  }

  private handleWindowClick(e): void {
    const thisChildClicked = childOf(e.target, findDOMNode(this));

    if (!thisChildClicked) {
      this.clearQuery();
    }
  }

  public render() {
    const {
      className = null,
      rootStore: {
        globalSearchStore: {
          isShowResults,
        },
      },
    } = this.props;

    const { query } = this.state;

    return (
      <div className={classNames('global-search', className)} >

        <div className="global-search-input-container">
          <input
            onKeyPress={this.onKeyPress}
            onChange={this.changeQuery}
            value={query}
            className="global-search-input"
            placeholder="Find projects, Dapps, contracts, wallets or addresses" />

          {query !== '' &&
            <InlineSVG
              onClick={this.clearQuery}
              className="global-search-input-icon-clear"
              src={require('../../../assets/img/clear-x.svg')}
            />}
        </div>

        <button className="global-search-btn btn" onClick={this.submitQuery}>Find</button>

        {isShowResults && <SearchView handle={this.handleWindowClick} />}

      </div>
    );
  }
}
