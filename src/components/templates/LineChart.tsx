import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type Props = {
  labels: string[];
  weightData: number[];
  countData: number[];
};

export const LineChart = (props: Props) => {
  const { labels, weightData, countData } = props;

  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "重さ",
        data: weightData,
        borderColor: "#f75c3d",
        backgroundColor: "#fff",
        yAxisID: "y",
      },
      {
        label: "カウント",
        data: countData,
        borderColor: "#76C6DE",
        backgroundColor: "#fff",
        yAxisID: "y1",
      },
    ],
  };

  return <Line options={options} data={data} />;
};
