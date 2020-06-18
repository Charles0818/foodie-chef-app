import * as React from 'react';
import { VictoryBar, VictoryChart } from 'victory-native';
import { colors } from '../../styles';

const TransactionChart = () => {
  const data = [
    { quarter: '1-5', earnings: '1.3K' },
    { quarter: '6-10', earnings: '16.50K' },
    { quarter: '11-15', earnings: '14.25K' },
    { quarter: '16-20', earnings: '19.00K' },
    { quarter: '21-25', earnings: '19.00K' },
    { quarter: '26-31', earnings: '19.00K' }
  ];
  return (
    <VictoryChart style={{flex: 1}}>
      {/* <VictoryAxis
        style={{
          axis: {stroke: "transparent"},
          grid: {stroke: colors.gray_color, fill: 'blue',  backgroundColor: colors.gray_color, flex: 1},
          ticks: {stroke: "grey", size: 0},
        }}
      /> */}
      <VictoryBar
        data={data} x="quarter" y="earnings"
        barRatio={.5}
        cornerRadius={{ top: 10 }}
        animate={{ easing: 'exp' }}
        style={{
          data: { fill: colors.color1, width: 25 },
          axis: {stroke: "transparent"},
        }}
      />
    </VictoryChart>
  )
}

export default TransactionChart;
