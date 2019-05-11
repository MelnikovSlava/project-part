import * as classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import InlineSVG from 'svg-inline-react';

import { routes } from '../../constants/constants';
import { RootStore } from '../../store/root-store';

import './Menu.less';


interface IMenuProps {
  rootStore?: RootStore;
}

@inject('rootStore')
@observer
export default class Menu extends React.Component<IMenuProps, any> {
  constructor(props) {
    super(props);

    this.goTo = this.goTo.bind(this);
  }

  private goTo(route: string) {
    const { rootStore: { router } } = this.props;

    return () => router.push(route);
  }

  public render() {
    const { rootStore: { router: { location: { pathname } } } } = this.props;

    const items = [
      {
        text: 'All projects',
        isActive: pathname === routes.projects,
        route: routes.projects,
        cln: 'm-i-all-project',
      },
      {
        text: 'Dapps',
        isActive: pathname === routes.dapps,
        route: routes.dapps,
        cln: 'm-i-dapps',
      },
      {
        text: 'Apps',
        isActive: false,
        route: null,
        cln: 'm-i-apps',
      },
      {
        text: 'Blockchains',
        isActive: false,
        route: null,
        cln: 'm-i-blockchains',
      },
      {
        text: 'Constructors',
        isActive: false,
        route: null,
        cln: 'm-i-constructors',
      },
      {
        text: 'Media',
        isActive: false,
        route: null,
        cln: 'm-i-media',
      },
      {
        text: 'Tokens',
        isActive: false,
        route: null,
        cln: 'm-i-tokens',
      },
      {
        text: 'Blog',
        isActive: false,
        route: null,
        cln: 'm-i-blog',
      },
      {
        text: 'Wiki',
        isActive: false,
        route: null,
        cln: 'm-i-wiki',
      },
    ];

    return (
      <div className="menu">
        <div>
          <InlineSVG
            onClick={this.goTo('/')}
            className="logo-img"
            style={{ cursor: 'pointer' }}
            src={require('../../assets/img/logo.svg')}
          />

          {items.map((item, i) =>
            <p
              key={item.text + i}
              className={classNames('menu-item flex', item.cln, { active: item.isActive })}
              onClick={this.goTo(item.route)}>
              {item.text}
            </p>,
          )}
        </div>

      </div>
    );
  }
}
