import * as deepEqual from 'deep-equal';

import { VotingStage } from '../store/entities/types';
import { web3Local } from './eth';


export const arrToItem = (arr: any[]) => {
  return Array.isArray(arr) && arr.length > 0
    ? {
      owner: arr[0].toString(),
      lastRank: arr[1].toString(),
      balance: arr[2].toString(),
      votingId: arr[3].toString(),
      movingsIds: arr[4],
    }
    : {};
};

export const arrToMoving = (arr: any[]) => {
  return Array.isArray(arr) && arr.length > 0
    ? {
      startTime: arr[0].toString(),
      speed: arr[1].toString(),
      distance: arr[2].toString(),
      direction: arr[3].toString(),
      votingId: arr[4].toString(),
    }
    : {};
};

export const arrToVoting = (arr: any[]) => {
  return Array.isArray(arr) && arr.length > 0
    ? {
      fixedFee: arr[0].toString(),
      unstakeSpeed: arr[1].toString(),
      commitTtl: arr[2].toString(),
      revealTtl: arr[3].toString(),
      startTime: arr[4].toString(),
      totalPrize: arr[5].toString(),
      votersAddresses: arr[6],
    }
    : {};
};

export const getStage = (startTime: string,
                         commitTtl: string, revealTtl: string): VotingStage => {
  const startTimeNumber = parseInt(startTime, 10);
  const commitTtlNumber = parseInt(commitTtl, 10);
  const revealTtlNumber = parseInt(revealTtl, 10);

  const endTimeCommit = startTimeNumber + commitTtlNumber;
  const endTimeReveal = startTimeNumber + commitTtlNumber + revealTtlNumber;
  const now = getTimeSec();


  if (now > startTimeNumber && now < endTimeCommit) {
    return 'commit';
  }

  if (now > startTimeNumber && now > endTimeCommit && now < endTimeReveal) {
    return 'reveal';
  }

  if (now > endTimeReveal) {
    return 'end';
  }
};

export const getTimeLeft = (startTime: string,
                            commitTtl: string, revealTtl: string): string => {
  const startTimeNumber = parseInt(startTime, 10);
  const commitTtlNumber = parseInt(commitTtl, 10);
  const revealTtlNumber = parseInt(revealTtl, 10);

  const endTimeCommit: number = startTimeNumber + commitTtlNumber;
  const endTimeReveal: number = startTimeNumber + commitTtlNumber + revealTtlNumber;
  const now = getTimeSec();

  if (now > startTimeNumber && now < endTimeCommit) {
    return (endTimeCommit - now).toString();
  }

  if (now > startTimeNumber && now > endTimeCommit && now < endTimeReveal) {
    return (endTimeReveal - now).toString();
  }

  if (now > endTimeReveal) {
    return '0';
  }
};

export const getTimeSec = (): number => {
  return new Date().getTime() / 1000 | 0;
};

export const getDataFromSec = (timeSec) => {
  const date = new Date(timeSec * 1000);

  return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

export const formatWei = (str: string, direction: 'to' | 'from'): string => {
  const digit = 'ether'; // 18

  return direction === 'from'
    ? web3Local.fromWei(str, digit)
    : web3Local.toWei(str, digit);
};

export const isEqual = (oldObj: any, newObj: any): boolean => {
  return Object.keys(newObj).every((objKey) => {
    const value = newObj[objKey];

    if (typeof value === 'object') {
      return deepEqual(value, oldObj[objKey]);
    } else {
      return value === oldObj[objKey];
    }
  });
};
