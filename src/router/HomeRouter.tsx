import { Home } from "../components/pages/Home";
import { Setting } from "../components/pages/Setting";
import { Page404 } from "../components/pages/Page404";

export const HomeRoutes = [
  {
    path: "/",
    exact: true,
    children: <Home/>
  },
  {
    path: "/setting",
    exact: false,
    children: <Setting/>
  },
  {
    path: "*",
    exact: false,
    children: <Page404/>
  },
]