import { Home } from "../components/pages/Home";
import { Setting } from "../components/pages/Setting";
import { Page404 } from "../components/pages/Page404";
import { HistoryCart } from "../components/pages/HistoryChart";

export const HomeRoutes = [
  {
    path: "/",
    exact: true,
    children: <Home />,
  },
  {
    path: "/setting",
    exact: false,
    children: <Setting />,
  },
  {
    path: "/chart",
    exact: false,
    children: <HistoryCart />,
  },
  {
    path: "*",
    exact: false,
    children: <Page404 />,
  },
];
