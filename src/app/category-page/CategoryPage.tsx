import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { RootStore } from '../../store/root-store';
import ButtonLoadMore from '../common/button-load-more/ButtonLoadMore';
import ListDynamicLoad from '../common/list-dynamic-load/ListDynamicLoad';
import DappListItem from '../dapps/dapp-list/dapp-list-item/DappListItem';
import DappSortBar from '../dapps/dapp-list/dapp-sort-bar/DappSortBar';
import ProjectListItem from '../projects/project-list/project-list-item/ProjectListItem';
import ProjectSortBar from '../projects/project-list/project-sort-bar/ProjectSortBar';
import ErrorMessage from '../ui-kit/error-message/ErrorMessage';
import Loader from '../ui-kit/loader/Loader';
import Title from '../ui-kit/title/Title';

import './CategoryPage.less';


interface ICategoryPageProps {
  rootStore?: RootStore;

}

@inject('rootStore')
@observer
export default class CategoryPage extends React.Component<ICategoryPageProps, any> {
  private title: string;
  private categoryId: number;

  constructor(props) {
    super(props);

    this.title = 'Top wallets';
    this.categoryId = 2;

    this.loadNextDapps = this.loadNextDapps.bind(this);
  }

  private loadNextDapps() {
    const { rootStore: { categoryStore: { fetchCategoryList, isLoading, nextPage } } } = this.props;

    if (!isLoading && nextPage !== null) {
      fetchCategoryList(this.categoryId);
    }
  }

  public componentWillMount() {
    const { rootStore: { categoryStore: { fetchCategoryList } } } = this.props;

    fetchCategoryList(this.categoryId);
  }

  public render() {
    const { categoryList, error, isLoading, nextPage } = this.props.rootStore.categoryStore;

    let content;
    if (isLoading && categoryList.size === 0) {
      content = <Loader style={{ marginTop: 20 }} />;
    } else if (error != null) {

      content = <ErrorMessage text={error} style={{ margin: '20px' }} />;
    } else if (categoryList.size > 0) {

      content = [...categoryList].map((project, i) =>
        <ProjectListItem key={project[1].id.toString() + i.toString()} project={project[1]} num={i} />);

      if (nextPage !== null) {
        content.push(<ButtonLoadMore key="uniq-btn" onClick={this.loadNextDapps} />);
      }

      if (isLoading) {
        content.push(<Loader key="uniq-loader" style={{ marginTop: 20 }} />);
      }
    } else {

      content = <p style={{ margin: '50px', fontSize: '20px' }} className="flex">Empty</p>;
    }
    return (
      <div className="category-page">
        <Title type="big" style={{ marginBottom: 20 }}>{this.title}</Title>

        <ListDynamicLoad
          idScrollParent="js-main-cont"
          onAction={this.loadNextDapps}>
          <ProjectSortBar />
          {content}
        </ListDynamicLoad>
      </div>
    );
  }
}
