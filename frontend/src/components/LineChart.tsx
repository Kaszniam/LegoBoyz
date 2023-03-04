import { useEffect, useRef, FC } from 'react';
import Highcharts from 'highcharts';

interface LineChartProps {
  data: {
    x: number[];
    y: number[];
  }
  dataTitle: string;
  graphTitle: string;
  xAxisTitle: string;
  yAxisTitle: string;
  unit: string;
}


export const LineChart:FC<LineChartProps> = ({graphTitle, xAxisTitle, yAxisTitle, data, dataTitle}) => {
  
    const container = useRef<HTMLInputElement>(null);

    const getData = () => {
        const result = [];
        for (let i = 0; i < data.x.length; i++) {
          result.push([data.x[i], data.y[i]]);
        }
        return result;
    }

    useEffect(() => {
      container.current!.id = (Math.random()*100).toString(36)
    }, [])

    const options = {
        title: {
          text: graphTitle,
        },
        xAxis: {
          title: {
            text: xAxisTitle,
          },
        },
        yAxis: {
          title: {
            text: yAxisTitle,
          },
        },
        series: [
          {
            type: 'line',
            name: dataTitle,
            data: getData(),
            lineColor:"rgba(255, 99, 132, 0.5)",
            marker: {
              fillColor:"rgba(255, 99, 132, 0.8)"
            },
          },

        ],
        chart: {
          borderColor: "rgb(255, 99, 132)",
        }
      };

    useEffect(() => {
        Highcharts.chart(`${container.current!.id}`, options)
      }, []);


  return  <div ref={container}></div>;
  
}
