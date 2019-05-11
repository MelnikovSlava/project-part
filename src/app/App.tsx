import { createBrowserHistory } from 'history';
import { Provider } from 'mobx-react';
import { syncHistoryWithStore } from 'mobx-react-router';
import * as React from 'react';
import { Router } from 'react-router';

import RootStore from '../store/root-store';
import AppContainer from './app-container/AppContainer';
import { Root } from './Root';

import './App.less';


const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, RootStore.router);

export default class App extends React.Component<any, any> {
  public render() {
    return (
      <Provider rootStore={RootStore}>
        <Router history={history}>
          <Root>
            <AppContainer />
          </Root>
        </Router>
      </Provider>
    );
  }
}
