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
  menuName: string;
  labels: number[];
  weightData: number[];
  countData: number[];
  setData: number[];
};

export const LineChart = (props: Props) => {
  const { labels, menuName, weightData, countData, setData } = props;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: menuName,
      },
      tooltip: {
        enabled: false,
      },
    },
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
      y2: {
        type: "linear" as const,
        display: false,
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
        label: "回数",
        data: countData,
        borderColor: "#76C6DE",
        backgroundColor: "#fff",
        yAxisID: "y1",
      },
      {
        label: "セット数",
        data: setData,
        borderColor: "lightgrey",
        backgroundColor: "#fff",
        yAxisID: "y2",
      },
    ],
  };

  return <Line options={options} data={data} />;
};
