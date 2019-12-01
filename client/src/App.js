import React, { useState } from "react";
import MyNavBar from "./components/MyNavBar";
import MyBarChart from "./components/MyBarChart";
import { Route, Switch, useHistory } from "react-router-dom";
import axios from "axios";
import HomePage from "./pages/HomePage";
const App = () => {
  const [currentUser, serCurrentUser] = useState({ user: [] });
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

  const signUpUser = data => {
    axios
      .post("http://localhost:5000/api/v1/users/new", data)
      .then(result => {
        console.log(result.data);
        localStorage.setItem("userToken", result.data.auth_token);
        localStorage.setItem("userData", JSON.stringify(result.data.user));
        setloggedIn(true);
      })
      .catch(error => {
        console.log(error.response.message);
      });
  };

  const loginUser = data => {
    console.log(currentUser);
    console.log(data);
    axios
      .post("http://localhost:5000/api/v1/login/", data)
      .then(response => {
        console.log(response);
        localStorage.setItem("userToken", response.data.auth_token);
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        serCurrentUser(response.data.user);
        setloggedIn(true);
        console.log(currentUser);
        history.push("/chart");
      })
      .catch(error => {
        console.log(error);
      });
  };
  const logoutUser = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    setloggedIn(false);
  };
  return (
    <>
      <MyNavBar
        logoutUser={logoutUser}
        loggedIn={loggedIn}
        signUpUser={signUpUser}
        loginUser={loginUser}
        toggleLogin={toggleLogin}
      />
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
