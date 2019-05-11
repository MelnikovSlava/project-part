import * as React from 'react';

import { DappModel } from '../../../../../store/entities/dapp-entity';
import { ProjectModel } from '../../../../../store/entities/project-entity';
import Text from '../../../../ui-kit/text/Text';

import './SearchItem.less';


interface ISearchItemProps {
  item: DappModel.IDapp | ProjectModel.IProject;
  onClick?: any;
  query?: string;
}

export default class SearchItem extends React.Component<ISearchItemProps, any> {
  public render() {
    const { item, onClick } = this.props;

    return (
      <div className="search-item" onClick={onClick}>
        <Text className="search-item-name">{item.name}</Text>
        <Text className="search-item-description">{item.short_description}</Text>
      </div>
    );
  }
}
