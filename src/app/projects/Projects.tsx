import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { withRouter } from 'react-router';

import { RootStore } from '../../store/root-store';
import CountFound from '../common/count-found/CountFound';
import Filter from '../common/filter/Filter';
import ProjectList from './project-list/ProjectList';

import './Projects.less';


interface IProjectsProps {
  rootStore?: RootStore;
}

@inject('rootStore')
@withRouter
@observer
export default class Projects extends React.Component<IProjectsProps, any> {
  public render() {
    const { rootStore: { appStore: { isCurator }, projectStore: { count, isLoadingNew } } } = this.props;

    return (
      <div className="projects">
        <Filter page="project" />

        <CountFound
          count={count}
          text="Projects found"
          style={{ marginBottom: '10px' }}
          isLoading={isLoadingNew} />

        <ProjectList />
      </div>
    );
  }
}
