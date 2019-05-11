import { Blockchain, Platform } from './types';


export interface IIcon {
  [propertyName: string]: string;
}

export interface ICategory {
  readonly id?: number;
  readonly icon?: IIcon;
  slug: string;
  name: string;
  sorting_order: number;
  on_homepage: boolean;
}

export interface IImage {
  readonly id?: number;
  image: IIcon;
}

export interface IWebLink {
  readonly id?: number;
  type?: 'site' | 'twitter' | 'instagram' | 'bitcointalk' | 'github';
  url?: string;
}

export interface ISmartcontracts {
  readonly id?: number;
  network_id?: string;
  address?: string;
  blockchain?: IBlockchainLite;
}

export interface IPlatform {
  readonly id?: number;
  readonly icon?: IIcon;
  slug?: Platform;
  name?: string;
}

export interface IStat {
  addresses_24h?: number;
  addresses_7d?: number;
  values_24h?: number;
  values_7d?: number;
  txs_24h?: number;
  txs_7d?: number;
}

export interface IBlockchainLite {
  id: number;
  slug: Blockchain;
  name: string;
  readonly icon?: IIcon;
}
