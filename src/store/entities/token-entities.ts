import { IBlockchainLite, ICategory } from './common-entities';
import { ProjectModel } from './project-entity';


export namespace TokenModel {
  export type Id = number;

  export interface ITokenLite {
    readonly id?: Id;
    readonly icon?: { [propertyName: string]: string };
    readonly blockchains?: IBlockchainLite[];
    readonly categories?: ICategory[];
    readonly rank_points?: number;
    project: ProjectModel.IProject;
    slug: string;
    name: string;
    short_description?: string;
  }

  export interface IToken extends ITokenLite {
  }
}
