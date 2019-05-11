import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { RootStore } from '../../../store/root-store';
import ButtonLoadMore from '../../common/button-load-more/ButtonLoadMore';
import ListDynamicLoad from '../../common/list-dynamic-load/ListDynamicLoad';
import ErrorMessage from '../../ui-kit/error-message/ErrorMessage';
import Loader from '../../ui-kit/loader/Loader';
import ProjectItemContainer from './project-item-container/ProjectItemContainer';
import ProjectSortBar from './project-sort-bar/ProjectSortBar';
import RankSortBar from './rank-sort-bar/RankSortBar';

import './ProjectList.less';


interface IProjectListProps {
  rootStore?: RootStore;
}

@inject('rootStore')
@observer
export default class ProjectList extends React.Component<IProjectListProps, any> {
  constructor(props) {
    super(props);

    this.loadNextProjects = this.loadNextProjects.bind(this);
  }

  private loadNextProjects() {
    const { rootStore: { projectStore: { fetchProjectList, isLoadingNew, params } } } = this.props;

    if (!isLoadingNew && params['page'] !== null) {
      fetchProjectList();
    }
  }

  public componentWillMount() {
    const { rootStore: { projectStore: { fetchProjectList } } } = this.props;

    fetchProjectList();
  }

  public render() {
    const {
      projectList,
      isLoadingNew,
      isLoadingMore,
      error,
      params,
    } = this.props.rootStore.projectStore;
    const { isCurator } = this.props.rootStore.appStore;

    let content;
    if (isLoadingMore && projectList.size === 0) {
      content = <Loader style={{ margin: 20 }} />;

    } else if (error != null) {
      content = <ErrorMessage text={error} style={{ margin: '20px' }} />;

    } else if (projectList.size > 0) {

      content = [...projectList].map((project, key) => (
        <ProjectItemContainer
          key={project[1].project.slug + key}
          project={project[1].project}
          num={key + 1} />));

      if (params['page'] !== null) {
        content.push(<ButtonLoadMore key="uniq-btn" onClick={this.loadNextProjects} />);
      }

      if (isLoadingMore) {
        content.push(<Loader key="uniq-loader" style={{ marginTop: 20 }} />);
      }
    } else {
      content = <p style={{ margin: '50px', fontSize: '20px' }} className="flex">Empty</p>;
    }

    return (
      <div className="list-project">
        {isLoadingNew && <div className="opacity-overlay" />}

        <ListDynamicLoad
          idScrollParent="js-main-cont"
          onAction={this.loadNextProjects}>
          {isCurator ? <RankSortBar /> : <ProjectSortBar />}
          {content}
        </ListDynamicLoad>
      </div>
    );
  }
}
