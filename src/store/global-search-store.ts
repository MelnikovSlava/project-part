import { action, observable, runInAction } from 'mobx';

import { fetch } from '../api/api';
import { DappModel } from './entities/dapp-entity';
import { ProjectModel } from './entities/project-entity';
import { RootStore } from './root-store';


export default class GlobalSearchStore {
  public rootStore: RootStore;

  @observable public projectList: Map<ProjectModel.Id, ProjectModel.IProject>;
  @observable public dappList: Map<DappModel.Id, DappModel.IDapp>;
  @observable public isLoading: boolean;
  @observable public error: string;
  @observable public isShowResults: boolean;

  constructor(rootStore) {
    this.rootStore = rootStore;

    this.projectList = null;
    this.dappList = null;
    this.isLoading = false;
    this.error = null;
    this.isShowResults = false;

    this.searchData = this.searchData.bind(this);
    this.closeSearchResults = this.closeSearchResults.bind(this);
  }

  @action('search items')
  public searchData(query: string) {
    const result = fetch(`/search?q=${query}`, null, 'get');

    this.isLoading = true;
    this.closeSearchResults(true);

    result
      .then((response) => {
        runInAction(() => {
          if (response.status === 200) {
            const { projects, dapps } = response.data;

            this.projectList = new Map(projects.map((proj) => [proj.id, proj]));

            this.dappList = new Map(dapps.map((dapp) => [dapp.id, dapp]));

            this.error = null;
          } else {
            this.error = 'Something wrong. Try again later!';
          }

          this.isLoading = false;
        });
      })
      .catch((error) => {
        runInAction(() => {
          this.error = error.toString();
          this.isLoading = false;
        });
      });

    return result;

  }

  @action('close search results')
  public closeSearchResults(isOpen: boolean) {
    this.isShowResults = isOpen;
    this.rootStore.appStore.isBlurPage = isOpen;
  }
}
