import { Address } from 'cluster';
import { observable } from 'mobx';

import { ProjectModel } from '../entities/project-entity';


export default class Rank {
  @observable public owner: Address;
  @observable public lastRank: string;
  @observable public rank: string;
  @observable public balance: string;
  @observable public votingId: string;
  @observable public movingsIds: string[];
  @observable public movings: {
    startTime: string;
    speed: string;
    distance: string;
    direction: string;
    votingId: string;
  }[];
  @observable public vote?: {
    fixedFee: string;
    unstakeSpeed: string;
    commitTtl: string;
    revealTtl: string;
    startTime: string;
    totalPrize: string;
    avgStake: string;
    votersAddresses: Address[]
  };

  constructor() {
    this.owner = null;
    this.lastRank = null;
    this.rank = null;
    this.balance = null;
    this.votingId = null;
    this.movingsIds = null;
    this.movings = null;
    this.vote = null;
  }
}
