import { inject } from 'mobx-react';
import * as React from 'react';

import { RootStore } from '../../store/root-store';
import ContentPageContainer from '../common/content-page-container/ContentPageContainer';
import TopControlBar from '../top-control-bar/TopControlBar';
import CategoryBanner from './category-banner/CategoryBanner';
import CollectionBanner from './collection-banner/CollectionBanner';

import './MainPage.less';


interface IMainPageProps extends React.HTMLProps<any> {
  rootStore?: RootStore;
}

@inject('rootStore')
export default class MainPage extends React.Component<IMainPageProps, any> {
  constructor(props) {
    super(props);

    this.goTo = this.goTo.bind(this);
  }

  private goTo(route: string) {
    const { rootStore: { router } } = this.props;

    return () => router.push(route);
  }

  public render() {

    return (
      <div className="main-page" >

        <section className="collections-container">
          <CollectionBanner title="Top games" collectionSlug="games" />
        </section>

        <section className="categoty-container">
          <CategoryBanner
            title="Top wallets"
            categoryId={2}
            categorySlug="wallet"
          />
        </section>

      </div >
    );
  }
}
