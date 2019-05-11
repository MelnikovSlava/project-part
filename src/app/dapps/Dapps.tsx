import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { withRouter } from 'react-router';

import { RootStore } from '../../store/root-store';
import CountFound from '../common/count-found/CountFound';
import Filter from '../common/filter/Filter';
import DappList from './dapp-list/DappList';

import './Dapps.less';


interface IDappsProps {
  rootStore?: RootStore;
}

@inject('rootStore')
@withRouter
@observer
export default class Dapps extends React.Component<IDappsProps, {}> {
  public render() {
    const {
      rootStore: { dappStore: { count, isLoadingNew } } } = this.props;

    return (
      <div className="dapp-store">
        <Filter page="dapp" />

        <CountFound
          count={count}
          text="Dapps found"
          style={{ marginBottom: '10px' }}
          isLoading={isLoadingNew} />

        <DappList />
      </div>
    );
  }
}
