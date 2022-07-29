import { memo } from "react";
import { Switch, Route } from "react-router-dom";

import { Login } from "../components/pages/Login";
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { LoginUserProvider } from "../providers/LoginUserProvider";
import { HomeRoutes } from "./HomeRouter";
import { AuthenticatedGuard } from "./AuthenticatedGuard";
import { SignUp } from "../components/pages/Signup";
import { MonthProvider } from "../providers/MonthProvider";
import { MenusProvider } from "../providers/MenusProvider";
import { HistoriesProvider } from "../providers/HistoriesProvider";
import { NetworkConnectedGuard } from "./NetworkConnectedGuard";

export const Router = memo(() => {
  return (
    <Switch>
      <LoginUserProvider>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route
          path="/home"
          render={({ match: { url } }) => (
            <AuthenticatedGuard>
              <MonthProvider>
                <HistoriesProvider>
                  <MenusProvider>
                    <Switch>
                      {HomeRoutes.map((route) => (
                        <Route key={route.path} exact={route.exact} path={`${url}${route.path}`}>
                          <HeaderLayout>
                            <NetworkConnectedGuard>{route.children}</NetworkConnectedGuard>
                          </HeaderLayout>
                        </Route>
                      ))}
                    </Switch>
                  </MenusProvider>
                </HistoriesProvider>
              </MonthProvider>
            </AuthenticatedGuard>
          )}
        />
      </LoginUserProvider>
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  );
});
