import * as classNames from 'classnames';
import * as React from 'react';
import InlineSVG from 'svg-inline-react';

import './LabelCriteria.less';


interface ILabelCriteriaProps extends React.HTMLProps<any> {
  className?: string;
  text: string;
  onClose: () => void;
}

export default class LabelCriteria extends React.Component<ILabelCriteriaProps, any> {
  public render() {
    const { className = null, text, onClose, ...rest } = this.props;

    return (
      <div className={classNames('component-label-criteria', className)} {...rest}>
        <p className="c-l-c-text">{text}</p>
        <InlineSVG
          onClick={onClose}
          className="c-l-c-icon"
          src={require('../../../../../assets/img/x-filter-bold.svg')} />
      </div>
    );
  }
}
