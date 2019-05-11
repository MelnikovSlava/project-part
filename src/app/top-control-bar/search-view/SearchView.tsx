import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { RootStore } from '../../../store/root-store';
import ErrorBoundary from '../../ui-kit/error-boundary/ErrorBoundary';
import ErrorMessage from '../../ui-kit/error-message/ErrorMessage';
import Loader from '../../ui-kit/loader/Loader';
import Text from '../../ui-kit/text/Text';
import SearchGroup from './search-group/SearchGroup';

import './SearchView.less';


interface ISearchViewProps {
  rootStore?: RootStore;
  handle: any;
}

interface ISearchViewState { }

@inject('rootStore')
@observer
export default class SearchView extends React.Component<ISearchViewProps, ISearchViewState> {
  public componentDidMount() {
    const { handle } = this.props;
    window.addEventListener('click', handle, true);
  }

  public componentWillUnmount() {
    const { handle } = this.props;
    window.removeEventListener('click', handle, true);
  }

  public render() {
    const {
      rootStore: {
        globalSearchStore: {
          isLoading,
          error,
          dappList,
          projectList,
        },
      },
    } = this.props;

    let content;
    if (isLoading) {
      content = <Loader style={{ flex: 1 }} size={60} />;
    } else if (error !== null) {
      content = <ErrorMessage text={error} />;
    } else if (dappList.size !== 0 || projectList.size !== 0) {
      content = (
        <div className="search-view-container">
          {dappList.size !== 0 && <SearchGroup groupName="Dapps" items={dappList} />}
          {projectList.size !== 0 && <SearchGroup groupName="Project" items={projectList} />}
        </div>
      );
    } else {
      content = <Text className="s-v-not-found">Not found</Text>;
    }

    return (
      <div className="search-view">
        <ErrorBoundary>
          {content}
        </ErrorBoundary>
      </div>
    );
  }
}
