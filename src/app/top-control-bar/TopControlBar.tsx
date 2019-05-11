import * as React from 'react';

import CurationSwitch from './curation-switch/CurationSwitch';
import GlobalSearch from './global-search/GlobalSearch';

import './TopControlBar.less';


export default class TopControlBar extends React.Component<any, any> {
  public render() {
    return (
      <div className="top-control-bar">
        <GlobalSearch />
        <CurationSwitch />
      </div>
    );
  }
}
