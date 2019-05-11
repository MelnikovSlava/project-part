import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { RootStore } from '../../../store/root-store';
import ButtonLoadMore from '../../common/button-load-more/ButtonLoadMore';
import ListDynamicLoad from '../../common/list-dynamic-load/ListDynamicLoad';
import ErrorMessage from '../../ui-kit/error-message/ErrorMessage';
import Loader from '../../ui-kit/loader/Loader';
import DappListItem from './dapp-list-item/DappListItem';
import DappSortBar from './dapp-sort-bar/DappSortBar';

import './DappList.less';


interface IDappListProps {
  rootStore?: RootStore;
}

@inject('rootStore')
@observer
export default class DappList extends React.Component<IDappListProps, any> {
  constructor(props) {
    super(props);

    this.loadNextDapps = this.loadNextDapps.bind(this);
  }

  private loadNextDapps() {
    const {
      rootStore: {
        dappStore: {
          fetchDappList,
          isLoadingNew,
          params,
        },
      },
    } = this.props;

    if (!isLoadingNew && params['page'] !== null) {
      fetchDappList();
    }
  }

  public componentWillMount() {
    const { rootStore } = this.props;

    rootStore.dappStore.fetchDappList();
  }

  public render() {
    const {
      dappList,
      isLoadingNew,
      isLoadingMore,
      error,
      params,
    } = this.props.rootStore.dappStore;

    let content;
    if (isLoadingMore && dappList.size === 0) {
      content = <Loader style={{ marginTop: 20 }} />;
    } else if (error != null) {

      content = <ErrorMessage text={error} style={{ margin: '20px' }} />;
    } else if (dappList.size > 0) {

      content = [...dappList].map((dapp, key) =>
        <DappListItem key={dapp[1].id + key + dapp[1].slug} dapp={dapp[1]} num={key} />);

      if (params['page'] !== null) {
        content.push(<ButtonLoadMore key="uniq-btn" onClick={this.loadNextDapps} />);
      }

      if (isLoadingMore) {
        content.push(<Loader key="uniq-loader" style={{ marginTop: 20 }} />);
      }
    } else {

      content = <p style={{ margin: '50px', fontSize: '20px' }} className="flex">Empty</p>;
    }

    return (
      <div className="list-dapp">
        {isLoadingNew && <div className="opacity-overlay" />}

        <ListDynamicLoad
          idScrollParent="js-main-cont"
          onAction={this.loadNextDapps}>
          <DappSortBar />
          {content}
        </ListDynamicLoad>
      </div>
    );
  }
}
