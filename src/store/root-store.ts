import { RouterStore } from 'mobx-react-router';

import AppStore from './app-store';
import CategoryStore from './category-store';
import CollectionStore from './collection-store';
import DappPageStore from './dapp-page-store';
import DappStore from './dapps-store';
import FilterStore from './filter-store';
import GlobalSearchStore from './global-search-store';
import ProjectStore from './projects-store';


export class RootStore {
  public router: RouterStore;
  public dappStore: DappStore;
  public projectStore: ProjectStore;
  public dappPageStore: DappPageStore;
  public appStore: AppStore;
  public collectionStore: CollectionStore;
  public categoryStore: CategoryStore;
  public filterStore: FilterStore;
  public globalSearchStore: GlobalSearchStore;

  constructor() {
    this.router = new RouterStore();
    this.dappStore = new DappStore(this);
    this.projectStore = new ProjectStore(this);
    this.dappPageStore = new DappPageStore(this);
    this.appStore = new AppStore(this);
    this.collectionStore = new CollectionStore(this);
    this.categoryStore = new CategoryStore(this);
    this.filterStore = new FilterStore(this);
    this.globalSearchStore = new GlobalSearchStore(this);
  }
}

export default new RootStore();
