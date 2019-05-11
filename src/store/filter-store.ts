import { action, observable, runInAction } from 'mobx';

import { fetch } from '../api/api';
import { convertSetToQuery } from '../helpers/utils';
import DappStore from './dapps-store';
import { IBlockchainLite, ICategory, IPlatform } from './entities/common-entities';
import { Type } from './entities/types';
import ProjectStore from './projects-store';
import { RootStore } from './root-store';


export type RangeType = 'rank' | 'volume' | 'users';

export default class FilterStore {
  public rootStore: RootStore;

  @observable public references: {
    categories: ICategory[];
    platforms: IPlatform[];
    blockchains: IBlockchainLite[];
    types: Type[];
  };

  @observable public selectedBlockchains: Set<IBlockchainLite['id']>;
  @observable public selectedPlatforms: Set<IPlatform['id']>;
  @observable public selectedCategories: Set<ICategory['id']>;
  @observable public selectedTypes: Set<Type>;
  @observable public selectedRank: [number, number];
  @observable public selectedVolume: [number, number];
  @observable public selectedUsers: [number, number];

  @observable public query: string;

  @observable public isLoading: boolean;
  @observable public error: string;
  public filteredStore: DappStore | ProjectStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    this.references = {
      categories: [],
      blockchains: [],
      platforms: [],
      types: [],
    };

    this.selectedBlockchains = new Set();
    this.selectedPlatforms = new Set();
    this.selectedCategories = new Set();
    this.selectedTypes = new Set();
    this.selectedRank = null;
    this.selectedVolume = null;
    this.selectedUsers = null;

    this.query = null;
    this.filteredStore = null;

    this.toggleCategory = this.toggleCategory.bind(this);
    this.togglePlatform = this.togglePlatform.bind(this);
    this.toggleBlockchain = this.toggleBlockchain.bind(this);
    this.toggleType = this.toggleType.bind(this);
    this.toggleRange = this.toggleRange.bind(this);
    this.toggleQuery = this.toggleQuery.bind(this);
    this.fetchReferences = this.fetchReferences.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
  }


  @action('set page')
  public setCurrentPage(page: 'dapp' | 'project') {
    if (page === 'dapp') {
      this.filteredStore = this.rootStore.dappStore;
    }

    if (page === 'project') {
      this.filteredStore = this.rootStore.projectStore;
    }
  }

  @action('clear all')
  public clearAll() {
    this.selectedBlockchains = new Set();
    this.selectedPlatforms = new Set();
    this.selectedCategories = new Set();
    this.selectedTypes = new Set();
    this.selectedRank = null;
    this.selectedVolume = null;
    this.selectedUsers = null;

    this.query = null;

    this.filteredStore.clearParams();
  }

  @action('toggle query')
  public toggleQuery(str: string) {
    this.query = str;

    this.filteredStore.setParams({ q: str });
  }

  @action('toggle range')
  public toggleRange(range: [number, number], type: RangeType) {
    switch (type) {
      case 'rank':
        this.selectedRank = range;
        const paramsRank = range === null
          ? { rank_from: null, rank_to: null }
          : { rank_from: range[0], rank_to: range[1] };

        this.filteredStore.setParams(paramsRank);
        break;
      case 'users':
        this.selectedUsers = range;
        const paramsUsers = range === null
          ? { dau_from: null, dau_to: null }
          : { dau_from: range[0], dau_to: range[1] };

        this.filteredStore.setParams(paramsUsers);
        break;
      case 'volume':
        this.selectedVolume = range;
        const paramsVolume = range === null
          ? { volume_from: null, volume_to: null }
          : { volume_from: range[0], volume_to: range[1] };

        this.filteredStore.setParams(paramsVolume);
        break;
      default:
        break;
    }
  }

  @action('toggle category')
  public toggleCategory(id: ICategory['id']) {
    if (this.selectedCategories.has(id)) {
      this.selectedCategories.delete(id);
      this.selectedCategories = new Set(this.selectedCategories);
    } else {
      this.selectedCategories.add(id);
      this.selectedCategories = new Set(this.selectedCategories);
    }

    this.filteredStore.setParams({
      category: convertSetToQuery(this.selectedCategories),
    });
  }

  @action('toggle platform')
  public togglePlatform(id: IPlatform['id']) {
    if (this.selectedPlatforms.has(id)) {
      this.selectedPlatforms.delete(id);
      this.selectedPlatforms = new Set(this.selectedPlatforms);
    } else {
      this.selectedPlatforms.add(id);
      this.selectedPlatforms = new Set(this.selectedPlatforms);
    }

    this.filteredStore.setParams({
      platform: convertSetToQuery(this.selectedPlatforms),
    });
  }

  @action('toggle blockchain')
  public toggleBlockchain(id: IBlockchainLite['id']) {
    if (this.selectedBlockchains.has(id)) {
      this.selectedBlockchains.delete(id);
      this.selectedBlockchains = new Set(this.selectedBlockchains);
    } else {
      this.selectedBlockchains.add(id);
      this.selectedBlockchains = new Set(this.selectedBlockchains);
    }

    this.filteredStore.setParams({
      blockchain: convertSetToQuery(this.selectedBlockchains),
    });
  }

  @action('toggle type')
  public toggleType(tp: Type) {
    if (this.selectedTypes.has(tp)) {
      this.selectedTypes.delete(tp);
      this.selectedTypes = new Set(this.selectedTypes);
    } else {
      this.selectedTypes.add(tp);
      this.selectedTypes = new Set(this.selectedTypes);
    }

    this.filteredStore.setParams({
      type: convertSetToQuery(this.selectedBlockchains),
    });
  }

  @action('fetch references')
  public fetchReferences() {
    const result = fetch('/store/references', null, 'get');

    this.isLoading = true;

    result
      .then((response) => {
        runInAction(() => {
          if (response.status === 200) {
            const { categories, platforms, blockchains } = response.data;

            this.references = {
              categories,
              platforms,
              blockchains,
              types: ['dapp', 'app', 'blockchain', 'media', 'token'],
            };

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
}
