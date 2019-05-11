import * as classNames from 'classnames';
import * as React from 'react';

import { VotingStage } from '../../../../store/entities/types';

import './ListStageWidget.less';


interface IListStageWidgetProps extends React.HTMLProps<any> {
  className?: string;
  stage: VotingStage | null;
  timeleft: string | null;
}

export default class ListStageWidget extends React.Component<IListStageWidgetProps, any> {
  public render() {
    const { className = null, stage, timeleft, ...rest } = this.props;

    let element;
    if (stage === null) {
      element = <p className="component-list-stage-widget-nl">-</p>;
    } else {
      element = (
        <div>
          <p className="component-list-stage-widget-st">Stage: {stage}</p>
          <p className="component-list-stage-widget-tl">Timeleft: {timeleft}</p>
        </div>
      );
    }

    return (
      <div className={classNames('component-list-stage-widget', className)} {...rest}>
        {element}
      </div>
    );
  }
}
