import React, { useEffect, FC } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface LineChartProps {
    graphTitle: string;
    xAxisTitle: string;
    yAxisTitle: string;
    
}


export const LineChart:FC<LineChartProps> = ({graphTitle, xAxisTitle, yAxisTitle}) => {
  
    const options = {
        title: {
          text: {graphTitle},
        },
        xAxis: {
          title: {
            text: {xAxisTitle},
          },
        },
        yAxis: {
          title: {
            text: {yAxisTitle},
          },
        },
        series: [
          {
            type: 'line',
            name: 'Linear Graph',
            data: [
              [0, 0],
              [1, 1],
              [2, 2],
              [3, 3],
              [4, 4],
              [5, 5],
            ],
          },
          {
            type: 'line',
            name: 'OtherGraph',
            data: [
              [0, 1],
              [1, 0],
              [2, 3],
              [3, 2],
              [4, 6],
              [5, 8],
            ],
          },
        ],
      };

    useEffect(() => {
        Highcharts.chart('linear-graph', options)
      }, []);


  return  <div id="linear-graph"></div>;
  
}
