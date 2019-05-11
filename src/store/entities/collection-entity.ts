import { IIcon } from './common-entities';
import { DappModel } from './dapp-entity';
import { ProjectModel } from './project-entity';
import { TokenModel } from './token-entities';


export namespace CollectionModel {
  export type Slug = string;

  export interface ICollection {
    readonly id?: number;
    readonly icon?: IIcon;
    readonly slug: Slug;
    projects: ProjectModel.IProjectLite;
    dapps: DappModel.IDappLite;
    tokens: TokenModel.ITokenLite;
    name: string;
    on_homepage?: boolean;
  }
}
