import React, { useState } from "react";
import MyNavBar from "./components/MyNavBar";
import MyBarChart from "./components/MyBarChart";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage";
const App = () => {
  const [loggedIn, setloggedIn] = useState(false);
  return (
    <>
      <MyNavBar setloggedIn={setloggedIn} />
      <Switch>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/chart" /> : <HomePage />}
        </Route>
        <Route path="/chart" component={MyBarChart} />
      </Switch>
    </>
  );
};

export default App;
