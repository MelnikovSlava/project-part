import { ICategory, IImage, IPlatform, ISmartcontracts, IStat, IWebLink } from './common-entities';


export namespace DappModel {
  export type Id = number;

  export interface IDapp {
    readonly id?: number;
    readonly icon?: { [propertyName: string]: string };
    readonly categories?: ICategory[];
    slug: string;
    name: string;
    short_description?: string;
    description?: string;
    readonly rank_points?: number;
    images: IImage[];
    links: IWebLink[];
    smartcontracts: ISmartcontracts[];
    platforms?: IPlatform[];
    stat: IStat;
    sorting_order?: number;
    created_at?: string;
    updated_at?: string;
    is_constructor?: boolean;
  }

  export interface IDappLite {
    readonly id?: number;
    slug: string;
    name: string;
    short_description?: string;
    readonly icon?: { [propertyName: string]: string };
    readonly categories?: ICategory[];
    readonly rank_points?: number;
    stat: IStat;
    platforms?: IPlatform[];
  }
}
