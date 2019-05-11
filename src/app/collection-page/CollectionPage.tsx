import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { CollectionModel } from '../../store/entities/collection-entity';
import { RootStore } from '../../store/root-store';
import CollectionItem from '../main-page/collection-banner/collection-item/CollectionItem';
import ErrorMessage from '../ui-kit/error-message/ErrorMessage';
import Loader from '../ui-kit/loader/Loader';
import Title from '../ui-kit/title/Title';

import './CollectionPage.less';


interface ICollectionPageProps {
  rootStore?: RootStore;
}

@inject('rootStore')
@observer
export default class CollectionPage extends React.Component<ICollectionPageProps, any> {
  private collectionSlug: CollectionModel.Slug;
  private title: string;

  constructor(props) {
    super(props);

    this.title = 'Top games';
    this.collectionSlug = 'games';

    this.goTo = this.goTo.bind(this);
  }

  private goTo(slug: string) {
    const { rootStore: { router } } = this.props;

    return () => router.push(`/store/dapps/${slug}`);
  }

  public componentWillMount() {
    const { rootStore: { collectionStore: { fetchCollectionList } } } = this.props;

    fetchCollectionList(this.collectionSlug);
  }

  public render() {
    const { rootStore: { collectionStore: { collectionList } } } = this.props;

    if (!collectionList.has(this.collectionSlug)) {
      return null;
    }

    const { data, isLoading, error } = collectionList.get(this.collectionSlug);

    let content;
    if (isLoading && data === null) {
      content = <Loader />;

    } else if (error !== null) {
      content = <ErrorMessage text={error} />;

    } else if (data.dapps.length !== 0 || data.dapps.length !== 0 || data.tokens.length !== 0) {
      content = [...data.projects, ...data.tokens].map((item, i) => (
        <CollectionItem
          key={i}
          name={item.name}
          description={item.short_description}
          icon={item.icon} />));

      [...data.dapps].forEach((item, i) =>
        content.push(
          <CollectionItem
            style={{ cursor: 'pointer' }}
            onClick={this.goTo(item.slug)}
            key={item.slug + i}
            name={item.name}
            description={item.short_description}
            icon={item.icon} />,
        ),
      );

    } else {
      content = <p>Empty</p>;
    }

    return (
      <div className="collection-page">
        <Title type="big">{this.title}</Title>
        <section className="list">
          {content}
        </section>
      </div>
    );
  }
}
