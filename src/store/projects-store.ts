import { action, observable, runInAction, toJS } from 'mobx';
import * as urlParse from 'url-parse';

import { fetch } from '../api/api';
import { arrToItem, arrToMoving, arrToVoting, isEqual } from '../helpers/c-rank';
import { readCRankContract } from '../helpers/eth';
import { DappModel } from './entities/dapp-entity';
import { ProjectModel } from './entities/project-entity';
import Rank from './models/rank';
import { RootStore } from './root-store';


interface IProjectRank {
  project: ProjectModel.IProjectLite;
  isLoading: boolean;
  error: string;
  rankData: Rank;
}

export default class ProjectStore {
  public rootStore: RootStore;

  @observable public projectList: Map<ProjectModel.Id, IProjectRank>;
  @observable public count: number;
  @observable public nextPage: number;
  @observable public error: string;
  @observable public isLoadingMore: boolean;
  @observable public isLoadingNew: boolean;
  @observable public params: object;

  constructor(rootStore) {
    this.rootStore = rootStore;

    this.projectList = new Map();
    this.isLoadingMore = false;
    this.isLoadingNew = false;
    this.error = null;
    this.count = null;
    this.params = {};

    this.fetchProjectList = this.fetchProjectList.bind(this);
    this.setParams = this.setParams.bind(this);
    this.clearParams = this.clearParams.bind(this);
    this.fetchRankProject = this.fetchRankProject.bind(this);
  }

  @action('set params')
  public setParams(objParams: object) {
    this.params = { ...this.params, ...objParams, page: null };

    this.fetchProjectList(true);
  }

  @action('clear params')
  public clearParams() {
    this.params = {};

    this.fetchProjectList(true);
  }

  @action('fetchProjectList')
  public fetchProjectList(isLoadNewList?: boolean) {
    const result = fetch(`/store/projects`, null, 'get', toJS(this.params));

    if (isLoadNewList) {
      this.isLoadingNew = true;
    } else {
      this.isLoadingMore = true;
    }

    result
      .then((response) => {
        runInAction(() => {
          if (response.status === 200) {
            const { count, results, next } = response.data;

            this.params['page'] = next !== null
              ? +urlParse(next, true).query.page
              : null;

            if (isLoadNewList) {
              this.projectList.clear();
            }

            results.forEach((project) => this.projectList.set(project.id, {
              project,
              isLoading: false,
              error: '',
              rankData: null,
            }));

            this.count = count;
            this.error = null;
          } else {
            this.error = 'Something wrong. Try again later!';
          }

          if (isLoadNewList) {
            this.isLoadingNew = false;
          } else {
            this.isLoadingMore = false;
          }
        });
      })
      .catch((error) => {
        runInAction(() => {
          this.error = error.toString();
          if (isLoadNewList) {
            this.isLoadingNew = false;
          } else {
            this.isLoadingMore = false;
          }
        });
      });

    return result;
  }

  @action('fetchRankProject')
  public fetchRankProject(projectId: ProjectModel.Id) {
    const curItem = this.projectList.get(projectId);

    curItem.isLoading = true;

    readCRankContract('getCurrentRank', [projectId])
      .then((rank) => {
        readCRankContract('getItem', [projectId])
          .then((responseItem: any[]) => {

            const item = arrToItem(responseItem);
            const promises = [];

            item.movingsIds.forEach((movingId) => {
              promises.push(readCRankContract('getMoving', [movingId]));
            });

            Promise.all(promises)
              .then((movings: any[]) => {

                item['movings'] = movings.map((mov) => arrToMoving(mov));
                item['rank'] = rank.toString();

                const putToStore = (item) => {
                  const old = toJS(this.projectList.get(projectId).rankData);

                  if (old === null || !isEqual(old, item)) {
                    runInAction(() => {
                      this.projectList.set(projectId, {
                        ...this.projectList.get(projectId),
                        isLoading: false,
                        rankData: {
                          ...this.projectList.get(projectId).rankData,
                          ...item,
                        },
                      });
                    });
                  } else {
                    runInAction(() => {
                      this.projectList.set(projectId, {
                        ...this.projectList.get(projectId),
                        isLoading: false,
                      });
                    });
                  }
                };

                if (item.votingId !== '0') {
                  readCRankContract('getVoting', [item.votingId])
                    .then((responseVote: any[]) => {
                      item['vote'] = arrToVoting(responseVote);

                      putToStore(item);
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                } else {
                  putToStore(item);
                }
              })
              // TODO: handle error runInAction
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
