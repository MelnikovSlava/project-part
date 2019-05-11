import { observable } from 'mobx';

import { CollectionModel } from '../entities/collection-entity';
import { DappModel } from '../entities/dapp-entity';
import { ProjectModel } from '../entities/project-entity';
import { TokenModel } from '../entities/token-entities';


export default class Collection {
  @observable public readonly slug: string;

  @observable public isLoading: boolean;
  @observable public error: string;

  @observable public data: {
    projects: ProjectModel.IProjectLite[],
    dapps: DappModel.IDappLite[],
    tokens: TokenModel.ITokenLite[],
  };

  constructor(slug: CollectionModel.Slug) {
    this.slug = slug;
    this.isLoading = false;
    this.error = null;
    this.data = null;
  }
}
