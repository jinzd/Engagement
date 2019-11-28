import React, { useState } from "react";
import MyNavBar from "./components/MyNavBar";
import MyBarChart from "./components/MyBarChart";
import { Route, Switch, useHistory } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
const App = () => {
  const [loggedIn, setloggedIn] = useState(false);
  const history = useHistory();
  console.log(`Log In State ${loggedIn}`);
  const toggleLogin = () => {
    if (loggedIn) {
      setloggedIn(false);
      history.push("/");
    } else {
      setloggedIn(true);
      history.push("/chart");
    }
  };
  return (
    <>
      <MyNavBar toggleLogin={toggleLogin} />
      <Switch>
        <Route
          exact
          path="/"
          component={() => {
            return <HomePage />;
          }}
        />
        <Route path="/chart" component={MyBarChart} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </>
  );
};

export default App;
