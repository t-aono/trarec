import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useMonthHistories } from "../../hooks/useMonthHistories";
import { useMonth } from "../../hooks/useMonth";
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

export const HistoryCart = () => {
  const { getHistories, histories } = useMonthHistories();
  const { month } = useMonth();

  useEffect(() => {
    getHistories(month);
  }, [getHistories, month]);
  console.log(histories);

  const labels = histories.map((history) => history.date);
  const lines = histories.map((history) => history.menus.map((menu) => menu.name));
  console.log(lines);

  const data = {
    labels,
    datasets: [
      {
        label: "Data1",
        data: histories.map((history) => history.menus.length),
      },
      {
        label: "Data2",
        data: histories.map((history) => history.menus.length),
      },
    ],
  };

  return <Line data={data} />;
};
