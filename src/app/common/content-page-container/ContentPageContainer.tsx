import * as classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { RootStore } from '../../../store/root-store';
import Overlay from './overlay/Overlay';

import './ContentPageContainer.less';


interface IContentPageContainerProps extends React.HTMLProps<any> {
  className?: string;
  rootStore?: RootStore;
  children: any;
}

@inject('rootStore')
@observer
export default class ContentPageContainer extends React.Component<IContentPageContainerProps, any> {
  public render() {
    const {
      rootStore: {
        appStore: {
          isBlurPage,
        },
      },
      className = null,
      children,
      ...rest } = this.props;

    return (
      <div className="content-page-container" {...rest}>
        <div className={classNames('content-page-container-wrapper', { 'c-p-c-blur': isBlurPage })}>
          {isBlurPage && <Overlay />}
          {children}
        </div>
      </div>
    );
  }
}
