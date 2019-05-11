import * as classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { CollectionModel } from '../../../store/entities/collection-entity';
import { RootStore } from '../../../store/root-store';
import ErrorMessage from '../../ui-kit/error-message/ErrorMessage';
import Loader from '../../ui-kit/loader/Loader';
import ContainerBanner from '../container-baner/ContainerBanner';
import CollectionItem from './collection-item/CollectionItem';

import './CollectionBanner.less';


interface ICollectionBannerProps extends React.HTMLProps<any> {
  className?: string;
  rootStore?: RootStore;
  collectionSlug: CollectionModel.Slug;
  title: string;
}

@inject('rootStore')
@observer
export default class CollectionBanner extends React.Component<ICollectionBannerProps, any> {
  private countItemShow: number;

  constructor(props) {
    super(props);

    this.countItemShow = 5;

    this.goTo = this.goTo.bind(this);
  }

  private goTo(slug?: string) {
    const { rootStore: { router }, collectionSlug } = this.props;

    if (slug === undefined) {
      return () => router.push(`alpha/store/collections/${collectionSlug}`);
    } else {
      return () => router.push(`alpha/store/dapps/${slug}`);
    }
  }

  public componentWillMount() {
    const { rootStore: { collectionStore: { fetchCollectionList } }, collectionSlug } = this.props;

    fetchCollectionList(collectionSlug);
  }

  public render() {
    const {
      className = null,
      title,
      collectionSlug,
      rootStore: {
        collectionStore: {
          collectionList,
        },
      },
      ...rest } = this.props;

    if (!collectionList.has(collectionSlug)) {
      return null;
    }

    const { error, data, isLoading } = collectionList.get(collectionSlug);

    let content;
    if (isLoading && data === null) {
      content = <Loader />;

    } else if (error !== null) {
      content = <ErrorMessage text={error} />;

    } else if (data.dapps.length !== 0 || data.dapps.length !== 0 || data.tokens.length !== 0) {
      let items = [];

      [...data.dapps].forEach((item, i) => {
        items.push(
          <CollectionItem
            style={{ cursor: 'pointer' }}
            onClick={this.goTo(item.slug)}
            key={item.slug + i}
            name={item.name}
            description={item.short_description}
            icon={item.icon} />);
      });

      [...data.projects, ...data.tokens].forEach((item, i) => {
        items.push(
          <CollectionItem
            key={item.slug + i}
            name={item.name}
            description={item.short_description}
            icon={item.icon} />);
      });

      if (items.length > 5) {
        items = items.slice(0, this.countItemShow);
      }

      content = items;

    } else {
      content = <p>Empty</p>;
    }

    return (
      <div className={classNames('collection-banner', className)} {...rest}>
        <ContainerBanner onClickAll={this.goTo()} title={title}>
          {content}
        </ContainerBanner>
      </div>
    );
  }
}
