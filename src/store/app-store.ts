import { action, observable } from 'mobx';


export type MenuItem = 'projects' | 'dapps';

export default class AppStore {
  public rootStore: any;

  @observable public selectedMenuItem: MenuItem;
  @observable public isCurator: boolean;
  @observable public isBlurPage: boolean;

  constructor(rootStore) {
    this.rootStore = rootStore;

    this.selectedMenuItem = 'dapps';
    this.isCurator = false;
    this.isBlurPage = false;

    this.setUserStatusAction = this.setUserStatusAction.bind(this);
    this.selectMenuItem = this.selectMenuItem.bind(this);
  }

  @action('select menu item')
  public selectMenuItem(item: MenuItem) {
    this.selectedMenuItem = item;
  }

  @action('blur page')
  public blurPage(isBlur: boolean) {
    this.isBlurPage = isBlur;
  }

  @action('click "Im curator"')
  public setUserStatusAction(isCtr: boolean = null) {
    if (isCtr === null) {
      this.isCurator = !this.isCurator;
    } else {
      this.isCurator = isCtr;
    }
  }
}
