import { action, observable, runInAction } from 'mobx';
import * as urlParse from 'url-parse';

import { fetch } from '../api/api';
import { ICategory } from './entities/common-entities';
import { ProjectModel } from './entities/project-entity';


export default class CategoryStore {
  public rootStore: any;

  @observable public categoryList: Map<ProjectModel.IProject['id'], ProjectModel.IProject>;
  @observable public error: string;
  @observable public isLoading: boolean;
  @observable public nextPage: number;

  constructor(rootStore) {
    this.rootStore = rootStore;

    this.categoryList = new Map();
    this.isLoading = false;
    this.nextPage = 1;
    this.error = null;

    this.fetchCategoryList = this.fetchCategoryList.bind(this);
  }

  @action('fetchCategoryList')
  public fetchCategoryList(str: ICategory['id']) {
    const nPage = this.nextPage === null ? 1 : this.nextPage;

    const result = fetch(`/store/projects?page=${nPage}&category=${str}`, null, 'get');

    this.isLoading = true;

    result
      .then((response) => {
        runInAction(() => {
          if (response.status === 200) {
            const { results, next } = response.data;

            this.nextPage = next !== null
              ? +urlParse(next, true).query.page
              : null;

            results.forEach((dapp) => this.categoryList.set(dapp.id, dapp));
            this.error = null;
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
