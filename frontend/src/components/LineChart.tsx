import { useEffect, useRef, useState, FC } from "react";
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official'
interface LineChartProps {
  data: {
    x: number[];
    y: number[];
  };
  dataTitle: string;
  graphTitle: string;
  xAxisTitle: string;
  yAxisTitle: string;
  unit: string;
}

export const LineChart: FC<LineChartProps> = ({
  graphTitle,
  xAxisTitle,
  yAxisTitle,
  data,
  dataTitle,
}) => {
  const containerId = useRef((Math.random() * 100).toString(36));
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const getData = () => {
    const result = [];
    for (let i = 0; i < data.x.length; i++) {
      result.push([data.x[i], data.y[i]]);
    }
    return result;
  };

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
        type: "line",
        name: dataTitle,
        data: getData(),
        lineColor: "rgba(255, 99, 132, 0.5)",
        marker: {
          fillColor: "rgba(255, 99, 132, 0.8)",
        },
      },
    ],
    chart: {
      borderColor: "rgb(255, 99, 132)",
      zoomType: 'x',
      animation: false,

    },
  };

  return <HighchartsReact
      highcharts={Highcharts}
      options={options}
  />;
};
