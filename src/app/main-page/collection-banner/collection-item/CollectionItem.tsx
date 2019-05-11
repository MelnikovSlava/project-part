import * as classNames from 'classnames';
import * as React from 'react';

import { IIcon } from '../../../../store/entities/common-entities';
import DefaultImage from '../../../common/default-image/DefaultImage';
import Text from '../../../ui-kit/text/Text';

import './CollectionItem.less';


interface ICollectionItemProps extends React.HTMLProps<any> {
  className?: string;
  name: string;
  description: string;
  icon: IIcon;
}

export default class CollectionItem extends React.Component<ICollectionItemProps, any> {
  public render() {
    const { className = null, name, description, icon, ...rest } = this.props;

    return (
      <div className={classNames('collection-item', className)} {...rest}>
        <DefaultImage icon={icon !== null ? icon['full'] : null} className="collection-img" />

        <div className="collection-desc">
          <Text type="bold">{name}</Text>
          <Text type="caption">{description === '' ? '-' : description}</Text>
        </div>
      </div>
    );
  }
}
