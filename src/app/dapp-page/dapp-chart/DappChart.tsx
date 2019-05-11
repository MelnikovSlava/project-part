import ReactEcharts from 'echarts-for-react';
import * as React from 'react';

import './DappChart.less';


interface IDappChartProps {
  chartData: {
    x: number[];
    y: string[];
  };
}

interface IDappChartState { }

export default class DappChart extends React.PureComponent
  <IDappChartProps, IDappChartState> {
  public render() {
    const { chartData } = this.props;

    const option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      xAxis: [
        {
          type: 'category',
          data: chartData.y,
          axisTick: {
            alignWithLabel: false,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          type: 'bar',
          barWidth: '80%',
          data: chartData.x,
        },
      ],
    };

    return (
      <div className="cn-dapp-chart" >
        <ReactEcharts option={option} />
      </div>
    );
  }
}
