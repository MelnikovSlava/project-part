import * as React from 'react';

import Text from '../../ui-kit/text/Text';
import SwitchBtn from './switch-btn/SwitchBtn';

import './CurationSwitch.less';


export default class CurationSwitch extends React.Component<any, any> {
  public render() {
    return (
      <div className="curation-switch flex">
        <Text type="bold" className="curation-switch-text">Curation is</Text>
        <SwitchBtn />
      </div>
    );
  }
}
