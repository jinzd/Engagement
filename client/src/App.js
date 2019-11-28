import React, { useState } from "react";
import MyNavBar from "./components/MyNavBar";
import MyBarChart from "./components/MyBarChart";
import { Route, Switch, useHistory } from "react-router-dom";
import HomePage from "./pages/HomePage";
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
      </Switch>
    </>
  );
};

export default App;
