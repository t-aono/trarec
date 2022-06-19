import { Home } from "../components/pages/Home";
import { Setting } from "../components/pages/Setting";
import { Page404 } from "../components/pages/Page404";
import { Cart } from "../components/pages/Chart";

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
    children: <Cart />,
  },
  {
    path: "*",
    exact: false,
    children: <Page404 />,
  },
];
