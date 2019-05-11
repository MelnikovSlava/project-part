import * as classNames from 'classnames';
import * as React from 'react';

import { requestsConfig } from '../../../../../config/config';
import { IIcon } from '../../../../store/entities/common-entities';
import Text from '../../../ui-kit/text/Text';

import './ListNameWidget.less';


interface IListNameWidgetProps extends React.HTMLProps<any> {
  name: string;
  description?: string;
  icon?: IIcon;
  className?: string;
}

export default class ListNameWidget extends React.Component<IListNameWidgetProps, any> {
  public render() {
    const { className = '', name, description = '-', icon = null, ...rest } = this.props;

    return (
      <div className={classNames('component-list-name-widget', className)} {...rest}>
        <div className={classNames('component-list-name-img', {
          'component-list-name-no-img': icon === null,
        })} >
          {icon !== null && <img src={`${requestsConfig.BASE_URL}${icon['full']}`} alt={`icon-${name}`} />}
        </div>

        <div className="component-list-name-desc">
          <Text type="bold">{name}</Text>
          <Text type="caption" className="component-list-name-desc-bottom">{description === '' ? '-' : description}</Text>
        </div>
      </div>
    );
  }
}
