import * as classNames from 'classnames';
import * as React from 'react';

import './ListDynamicLoad.less';


interface IListDynamicLoadProps extends React.HTMLProps<any> {
  className?: string;
  children: any;
  idScrollParent: string;
  bottomOffsetAction?: number;
  onAction: () => void;
}

export default class ListDynamicLoad extends React.Component<IListDynamicLoadProps, any> {
  private ref;
  private parentScrollElem: HTMLElement;
  private isActionWork: boolean;

  constructor(props) {
    super(props);

    this.ref = null;
    this.parentScrollElem = null;
    this.isActionWork = false;

    this.calculateOffset = this.calculateOffset.bind(this);
  }

  private calculateOffset(e) {
    const { bottomOffsetAction = 200, onAction } = this.props;


    const offsetBottom = this.parentScrollElem.scrollHeight -
      this.parentScrollElem.scrollTop -
      this.parentScrollElem.clientHeight;

    if (offsetBottom < bottomOffsetAction && !this.isActionWork) {
      this.isActionWork = true;
      onAction();
    }

    if (offsetBottom > bottomOffsetAction && this.isActionWork) {
      this.isActionWork = false;
    }
  }

  public componentDidMount() {
    this.parentScrollElem = document.getElementById(this.props.idScrollParent);
    this.parentScrollElem.addEventListener('scroll', this.calculateOffset);
  }

  public componentWillUnmount() {
    this.parentScrollElem.removeEventListener('scroll', this.calculateOffset);
  }


  public render() {
    const { className = null, children } = this.props;

    return (
      <div
        className={classNames('component-list-dynamic-load', className)}
        ref={(ref) => this.ref = ref}>
        {children}
      </div>
    );
  }
}
