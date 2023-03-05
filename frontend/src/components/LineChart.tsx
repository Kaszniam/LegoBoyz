import { FC } from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from "chart.js";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler
);

interface LineChartProps {
  data: {
    x: string[];
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
  const options = {
    animation: false,
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: graphTitle,
      },
    },
    scales: {
      x: {
        type: "time",
        title: {
          display: true,
          text: "Date",
        },
        time: {
          unit: "second",
        },
      },
    },
  };

  return (
    <Line
      options={options as any}
      data={{
        labels: data.x,
        datasets: [
          {
            label: dataTitle,
            data: data.x.map((i, index) => ({
              x: i,
              y: data.y[index],
            })),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            fill: "origin",
          },
        ],
      }}
    />
  );
};

// const ops = {
//     chart: {
//         zoomType: 'x'
//     },
//     title: {
//         text: 'USD to EUR exchange rate over time',
//         align: 'left'
//     },
//     subtitle: {
//         text: document.ontouchstart === undefined ?
//             'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in',
//         align: 'left'
//     },
//     xAxis: {
//         type: 'datetime'
//     },
//     yAxis: {
//         title: {
//             text: 'Exchange rate'
//         }
//     },
//     legend: {
//         enabled: false
//     },
//     plotOptions: {
//         area: {
//             fillColor: {
//                 linearGradient: {
//                     x1: 0,
//                     y1: 0,
//                     x2: 0,
//                     y2: 1
//                 },
//                 stops: [
//                     [0, Highcharts.getOptions().colors[0]],
//                     [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
//                 ]
//             },
//             marker: {
//                 radius: 2
//             },
//             lineWidth: 1,
//             states: {
//                 hover: {
//                     lineWidth: 1
//                 }
//             },
//             threshold: null
//         }
//     },
//
//     series: [{
//         type: 'area',
//         name: 'USD to EUR',
//         data: []
//     }]
// }
