import { action, observable, runInAction } from 'mobx';

import { fetch } from '../api/api';
import { DappModel } from './entities/dapp-entity';
import { RootStore } from './root-store';


export default class DappPageStore {
  public rootStore: RootStore;

  @observable public dapp: DappModel.IDapp;
  @observable public currentDappId: DappModel.Id;
  @observable public error: string;
  @observable public isLoading: boolean;

  constructor(rootStore) {
    this.rootStore = rootStore;

    this.currentDappId = null;
    this.dapp = null;
    this.isLoading = false;
    this.error = null;

    this.fetchDapp = this.fetchDapp.bind(this);
    this.selectDapp = this.selectDapp.bind(this);
  }

  @action('fetchDapp')
  public fetchDapp() {
    const pathname = this.rootStore.router.location.pathname;
    const result = fetch(pathname, null, 'get');

    this.isLoading = true;

    result
      .then((response) => {
        runInAction(() => {
          if (response.status === 200) {
            this.dapp = response.data;
            this.error = null;
          }

          this.isLoading = false;
        });
      })
      .catch((error) => {
        runInAction(() => {
          this.error = error;
          this.isLoading = false;
        });
      });

    return result;
  }

  @action('add selected dapp id')
  public selectDapp(id: DappModel.Id) {
    this.currentDappId = id;
  }
}
