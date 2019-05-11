import * as classNames from 'classnames';
import { inject } from 'mobx-react';
import * as React from 'react';

import { numToEth, trimNumber } from '../../../../helpers/utils';
import { DappModel } from '../../../../store/entities/dapp-entity';
import { RootStore } from '../../../../store/root-store';
import ListItem from '../../../common/list-item/ListItem';
import ListCategoryWidget from '../../../common/list-widgets/list-category-widget/ListCategoryWidget';
import ListNameWidget from '../../../common/list-widgets/list-name-widget/ListNameWidget';
import ListRankWidget from '../../../common/list-widgets/list-rank-widget/ListRankWidget';
import ListSimpleValue from '../../../common/list-widgets/list-simple-value/ListSimpleValue';

import './DappListItem.less';


interface IDappListItemProps extends React.HTMLProps<any> {
  className?: string;
  dapp: DappModel.IDapp;
  rootStore?: RootStore;
  num: number;
}

@inject('rootStore')
export default class DappListItem extends React.Component<IDappListItemProps, any> {
  constructor(props) {
    super(props);

    this.goTo = this.goTo.bind(this);
  }

  private goTo() {
    const { rootStore: { router, dappPageStore: { selectDapp } }, dapp } = this.props;

    selectDapp(dapp.id);

    router.push(`/store/dapps/${dapp.slug}`);
  }

  public render() {
    const {
      className = '',
      dapp: {
        rank_points,
        name,
        short_description,
        stat,
        categories,
        icon,
      },
      num,
      ...rest } = this.props;

    const volume = numToEth(stat.values_7d);
    const trans = trimNumber(stat.txs_24h);
    const dau = trimNumber(stat.addresses_24h);
    const wau = trimNumber(stat.addresses_7d);
    const cats = categories.map((cat) => cat.name);


    return (
      <ListItem
        className={classNames('project-list-item', className)}
        onClick={this.goTo}>

        <ListRankWidget
          num={(num + 1).toString()}
          rank={' '}
          className="project-list-item-rank" />

        <ListNameWidget
          icon={icon}
          name={name}
          description={short_description}
          className="project-list-item-name" />

        <ListSimpleValue
          value={trans}
          className="project-list-item-transactions" />

        <ListSimpleValue
          value={volume}
          className="project-list-item-volume" />

        <ListSimpleValue
          value={dau}
          className="project-list-item-hour24" />

        <ListSimpleValue
          value={wau}
          className="project-list-item-week" />

        <ListCategoryWidget
          categories={cats}
          className="project-list-item-category" />

      </ListItem>
    );
  }
}

