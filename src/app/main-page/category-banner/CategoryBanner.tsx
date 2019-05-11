import * as classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { ICategory } from '../../../store/entities/common-entities';
import { RootStore } from '../../../store/root-store';
import DappListItem from '../../dapps/dapp-list/dapp-list-item/DappListItem';
import DappSortBar from '../../dapps/dapp-list/dapp-sort-bar/DappSortBar';
import ProjectListItem from '../../projects/project-list/project-list-item/ProjectListItem';
import ProjectSortBar from '../../projects/project-list/project-sort-bar/ProjectSortBar';
import ErrorMessage from '../../ui-kit/error-message/ErrorMessage';
import Loader from '../../ui-kit/loader/Loader';
import ContainerBanner from '../container-baner/ContainerBanner';

import './CategoryBanner.less';


interface ICategoryBannerProps extends React.HTMLProps<any> {
  className?: string;
  title: string;
  categoryId: ICategory['id'];
  categorySlug: ICategory['slug'];
  rootStore?: RootStore;
}

@inject('rootStore')
@observer
export default class CategoryBanner extends React.Component<ICategoryBannerProps, any> {
  constructor(props) {
    super(props);

    this.goTo = this.goTo.bind(this);
  }

  private goTo() {
    const { rootStore: { router }, categorySlug } = this.props;

    router.push(`/alpha/store/category/${categorySlug}`);
  }

  public componentWillMount() {
    const { rootStore: { categoryStore: { fetchCategoryList } }, categoryId } = this.props;

    fetchCategoryList(categoryId);
  }

  public render() {
    const {
      className = null,
      title,
      rootStore: {
        categoryStore: {
          categoryList,
          error,
          isLoading,
        },
      },
      ...rest } = this.props;

    let content;
    if (isLoading && categoryList.size === 0) {
      content = <Loader />;

    } else if (error !== null) {
      content = <ErrorMessage text={error} />;

    } else if (categoryList.size > 0) {
      let items = [...categoryList];

      if (items.length > 5) {
        items = items.slice(0, 5);
      }

      content = (
        <section className="list">
          <ProjectSortBar />
          {items.map((project, i) =>
            <ProjectListItem
              key={project[1].id.toString() + i.toString()}
              project={project[1]} num={i} />)}
        </section>
      );
    } else {
      content = <p>Empty</p>;
    }

    return (
      <div className={classNames('category-banner', className)}>
        <ContainerBanner title={title} onClickAll={this.goTo}>
          {content}
        </ContainerBanner>
      </div>
    );
  }
}
