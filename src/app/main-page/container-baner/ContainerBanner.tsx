import * as classNames from 'classnames';
import * as React from 'react';

import GoToDirection from '../../ui-kit/go-to-direction/GoToDirection';
import Title from '../../ui-kit/title/Title';

import './ContainerBanner.less';


interface IContainerBannerProps extends React.HTMLProps<any> {
  className?: string;
  title: string;
  onClickAll: () => void;
  children: any;
}

export default class ContainerBanner extends React.Component<IContainerBannerProps, any> {
  public render() {
    const { className = null, onClickAll, title, children, ...rest } = this.props;

    return (
      <div className={classNames('component-container-banner', className)} {...rest}>
        <section className="header">
          <Title type="medium" className="collection-banner-title">{title}</Title>
          <GoToDirection text="All" onClick={onClickAll} />
        </section>

        <section className="list">
          {children}
        </section>
      </div>
    );
  }
}
