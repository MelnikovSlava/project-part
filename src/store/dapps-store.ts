import { action, observable, runInAction, toJS } from 'mobx';
import * as urlParse from 'url-parse';

import { fetch } from '../api/api';
import { DappModel } from './entities/dapp-entity';


export default class DappStore {
  public rootStore: any;

  @observable public dappList: Map<DappModel.IDapp['id'], DappModel.IDapp>;
  @observable public count: number;
  @observable public error: string;
  @observable public isLoadingMore: boolean;
  @observable public isLoadingNew: boolean;
  @observable public params: object;

  constructor(rootStore) {
    this.rootStore = rootStore;

    this.dappList = new Map<DappModel.Id, DappModel.IDapp>();
    this.isLoadingMore = false;
    this.isLoadingNew = false;
    this.error = null;
    this.count = null;
    this.params = {
      order_by: 'addresses_24h',
      order_type: 'desc',
    };

    this.fetchDappList = this.fetchDappList.bind(this);
    this.setParams = this.setParams.bind(this);
    this.clearParams = this.clearParams.bind(this);
  }

  @action('set params')
  public setParams(objParams: object) {
    this.params = { ...this.params, ...objParams, page: null };

    this.fetchDappList(true);
  }

  @action('clear params')
  public clearParams() {
    this.params = {};

    this.fetchDappList(true);
  }

  @action('fetchDappList')
  public fetchDappList(isLoadNewList?: boolean) {
    const result = fetch('/store/dapps', null, 'get', toJS(this.params));

    if (isLoadNewList) {
      this.isLoadingNew = true;
    } else {
      this.isLoadingMore = true;
    }

    result
      .then((response) => {
        runInAction(() => {
          if (response.status === 200) {
            const { count, results, next } = response.data;

            this.params['page'] = next !== null
              ? +urlParse(next, true).query.page
              : null;

            if (isLoadNewList) {
              this.dappList.clear();
            }

            results.forEach((dapp) => this.dappList.set(dapp.id, dapp));

            this.count = count;
            this.error = null;
          } else {
            this.error = 'Something wrong. Try again later!';
          }

          if (isLoadNewList) {
            this.isLoadingNew = false;
          } else {
            this.isLoadingMore = false;
          }
        });
      })
      .catch((error) => {
        runInAction(() => {
          this.error = error.toString();
          if (isLoadNewList) {
            this.isLoadingNew = false;
          } else {
            this.isLoadingMore = false;
          }
        });
      });

    return result;
  }
}
