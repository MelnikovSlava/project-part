import * as classNames from 'classnames';
import * as React from 'react';

import { ProjectModel } from '../../../../store/entities/project-entity';
import ListItem from '../../../common/list-item/ListItem';
import ListBlockchainWidget from '../../../common/list-widgets/list-blockchain-widget/ListBlockchainWidget';
import ListCategoryWidget from '../../../common/list-widgets/list-category-widget/ListCategoryWidget';
import ListNameWidget from '../../../common/list-widgets/list-name-widget/ListNameWidget';
import ListPlatformWidget from '../../../common/list-widgets/list-platform-widget/ListPlatformWidget';
import ListRankWidget from '../../../common/list-widgets/list-rank-widget/ListRankWidget';
import ListSubtypesWidget from '../../../common/list-widgets/list-subtypes-widget/ListSubtypesWidget';

import './ProjectListItem.less';


interface IProjectListItemProps extends React.HTMLProps<any> {
  className?: string;
  project: ProjectModel.IProjectLite;
  num: number;
}

export default class ProjectListItem extends React.Component<IProjectListItemProps, any> {
  public render() {
    const { className = '', project, num, ...rest } = this.props;

    return (
      <ListItem className={classNames('project-list-item', className)}>

        <ListRankWidget
          num={num.toString()}
          rank={null}
          className="project-list-item-rank" />

        <ListNameWidget
          icon={project.icon}
          name={project.name}
          description={project.short_description}
          className="project-list-item-name" />

        <ListBlockchainWidget
          classNameIcon="project-list-item-blockchain-icon"
          className="project-list-item-blockchain"
          blockchains={project.blockchains} />

        <ListPlatformWidget
          classNameIcon="project-list-item-platform-icon"
          platforms={project.platforms}
          className="project-list-item-platform" />

        <ListCategoryWidget
          categories={Object.keys(project.subprojects_types)
            .map((sub) => project.subprojects_types[sub] ? sub : null)}
          className="project-list-item-subtype" />

        <ListCategoryWidget
          categories={project.categories.map((cat) => cat.name)}
          className="project-list-item-subtype" />

      </ListItem>
    );
  }
}
