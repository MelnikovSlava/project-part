import { inject, observer } from 'mobx-react';
import { Range } from 'rc-slider';
import * as React from 'react';

import { RangeType } from '../../../../../store/filter-store';
import { RootStore } from '../../../../../store/root-store';
import Text from '../../../../ui-kit/text/Text';
import FilterDropdown from '../../common/filter-dropdown/FilterDropdown';

import './CriteriaRange.less';


interface ICriteriaRangeProps {
  title: string;
  range: [number, number];
  type: RangeType;
  rootStore?: RootStore;
}

interface ICriteriaRangeState {
  currentRange: [number, number];
}

@inject('rootStore')
@observer
export default class CriteriaRange extends React.Component<ICriteriaRangeProps, ICriteriaRangeState> {

  public private;
  constructor(props) {
    super(props);

    this.state = {
      currentRange: props.range,
    };

    this.changeRange = this.changeRange.bind(this);
    this.afterChangeRange = this.afterChangeRange.bind(this);
  }

  private changeRange(range: [number, number]) {
    this.setState({ currentRange: range });
  }

  private afterChangeRange(range: [number, number]) {
    const { rootStore: { filterStore: { toggleRange } }, type } = this.props;

    toggleRange(range, type);
  }

  public render() {
    const { currentRange } = this.state;
    const {
      range,
      title,
      type,
      rootStore: {
        filterStore: {
          selectedRank,
          selectedUsers,
          selectedVolume,
        },
      },
    } = this.props;

    return (
      <div className="criteria-range">
        <FilterDropdown title={title}>
          <section className="criteria-range-container">
            <Text style={{ color: 'white', marginBottom: '12px' }}>{`From ${currentRange[0]} to ${currentRange[1]}`}</Text>
            <div className="criteria-range-slider">
              <Range
                min={range[0]}
                max={range[1]}
                defaultValue={currentRange}
                allowCross={false}
                trackStyle={[{ backgroundColor: '#A2D8E3' }]}
                handleStyle={[{ border: '2px solid #00828C' }, { border: '2px solid #00828C' }]}
                onChange={this.changeRange}
                onAfterChange={this.afterChangeRange} />
            </div>
          </section>
        </FilterDropdown>
      </div>
    );
  }
}
