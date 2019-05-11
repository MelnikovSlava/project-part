import { IBlockchainLite, ICategory, IImage, IPlatform, IWebLink } from './common-entities';
import { DappModel } from './dapp-entity';


export namespace ProjectModel {
  export type Id = number;

  export interface IProjectLite {
    readonly id?: Id;
    readonly icon?: { [propertyName: string]: string };
    readonly platforms?: IPlatform[];
    readonly subprojects_types?: { [propertyName: string]: boolean };
    readonly blockchains?: IBlockchainLite[];
    readonly categories?: ICategory[];
    slug: string;
    name: string;
    short_description?: string;
  }

  export interface IProject extends IProjectLite {
    images: IImage[];
    links: IWebLink[];
    dapps: DappModel.IDapp[];
    sorting_order?: number;
    description?: string;
    created_at?: string;
    updated_at?: string;
  }
}
