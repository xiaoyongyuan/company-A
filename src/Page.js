import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import Login from "./components/pages/Login";
import loginnew from "./components/pages/Loginnew";
import App from "./App";
const user = JSON.parse(localStorage.getItem("user"));
export default () => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Redirect
              to={
                user && user.ctype === "5"
                  ? "/app/userhome/index"
                  : "/app/companyhome/index"
              }
              push
            />
          )}
        />
        <Route path="/app" component={App} />
        <Route path="/404" component={NotFound} />
        <Route path="/login" component={Login} />
        <Route path="/loginnew" component={loginnew} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};
