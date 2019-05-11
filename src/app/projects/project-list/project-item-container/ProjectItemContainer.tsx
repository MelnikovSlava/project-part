import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { ProjectModel } from '../../../../store/entities/project-entity';
import { RootStore } from '../../../../store/root-store';
import ProjectListItem from '../project-list-item/ProjectListItem';
import RankItem from '../rank-item/RankItem';

import './ProjectItemContainer.less';


interface IProjectItemContainerProps {
  rootStore?: RootStore;
  className?: string;
  project: ProjectModel.IProjectLite;
  num: number;
}

@inject('rootStore')
@observer
export default class ProjectItemContainer extends React.Component<IProjectItemContainerProps, any> {
  public render() {
    const { rootStore: { appStore: { isCurator } }, project, num } = this.props;

    let item = isCurator
      ? (
        <RankItem
          key={project.id.toString() + num.toString()}
          id={project.id}
          num={num} />)
      : (
        <ProjectListItem
          key={project.slug + num.toString()}
          project={project}
          num={num} />);

    return (
      <div className="project-item-containter">
        {item}
      </div>
    );
  }
}
