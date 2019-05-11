import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch, withRouter } from 'react-router';

import CategoryPage from '../category-page/CategoryPage';
import CollectionPage from '../collection-page/CollectionPage';
import ContentPageContainer from '../common/content-page-container/ContentPageContainer';
import DappPage from '../dapp-page/DappPage';
import Dapps from '../dapps/Dapps';
import Guide from '../guide/Guide';
import MainPage from '../main-page/MainPage';
import Menu from '../menu/Menu';
import Projects from '../projects/Projects';
import TopControlBar from '../top-control-bar/TopControlBar';
import Simple from './Simple';

import './AppContainer.less';


@withRouter
class AppContainer extends React.PureComponent<any, any> {
  public render() {
    return (
      <div className="app-container screen" id="app">
        <nav className="navigation">
          <Menu />
        </nav>
        <main className="main-content-container" id="js-main-cont">
          <div className="m-wrapper">

            <section className="top-bar-container flex-v">
              <TopControlBar />
            </section>

            <ContentPageContainer className="main-content">
              <Switch>
                <Route exact={true} path="/" component={Simple} />
                <Route exact={true} path="/alpha/" component={MainPage} />
                <Route exact={true} path="/store/dapps/" component={Dapps} />
                <Route exact={true} path="/alpha/curator-guide" component={Guide} />
                <Route exact={true} path="/alpha/store/projects/" component={Projects} />
                <Route exact={true} path="/store/dapps/:slug" component={DappPage} />
                <Route exact={true} path="/alpha/store/collections/:slug" component={CollectionPage} />
                <Route exact={true} path="/alpha/store/category/:slug" component={CategoryPage} />
              </Switch>
            </ContentPageContainer>
          </div>

        </main>
      </div>
    );
  }
}

export default hot(module)(AppContainer);

