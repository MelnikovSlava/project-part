import { action, observable, runInAction } from 'mobx';

import { fetch } from '../api/api';
import { CollectionModel } from './entities/collection-entity';
import Collection from './models/collection';


export default class CollectionStore {
  public rootStore: any;

  @observable public collectionList: Map<CollectionModel.Slug, Collection>;

  constructor(rootStore) {
    this.rootStore = rootStore;

    this.collectionList = new Map();

    this.fetchCollectionList = this.fetchCollectionList.bind(this);
  }

  @action('fetchCollectionList')
  public fetchCollectionList(slug: CollectionModel.Slug) {
    const result = fetch(`/store/collections/${slug}`, null, 'get');

    if (this.collectionList.has(slug)) {
      this.collectionList.get(slug).isLoading = true;
    } else {
      this.collectionList.set(slug, new Collection(slug));
      this.collectionList.get(slug).isLoading = true;
    }

    result
      .then((response) => {
        runInAction(() => {
          if (response.status === 200) {
            const { projects, dapps, tokens, slug } = response.data;

            this.collectionList.get(slug).data = { projects, dapps, tokens };
            this.collectionList.get(slug).error = null;

          } else {
            this.collectionList.get(slug).error = 'Something wrong. Try again later!';
          }

          this.collectionList.get(slug).isLoading = false;
        });
      })
      .catch((error) => {
        runInAction(() => {
          this.collectionList.get(slug).error = error.toString();
          this.collectionList.get(slug).isLoading = false;
        });
      });

    return result;
  }
}
