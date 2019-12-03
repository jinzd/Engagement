import React, { useState, useEffect } from "react";
import MyNavBar from "./components/MyNavBar";
import MyProfile from "./pages/MyProfile";
import { Route, Switch, useHistory } from "react-router-dom";
import axios from "axios";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import LiveSession from "./pages/LiveSession";
const App = () => {
  const [user, setUser] = useState([]);
  const [loggedIn, setloggedIn] = useState(false);
  const history = useHistory();
  const checkLoggedinApi = process.env.REACT_APP_CHECK_LOGGEDIN_API;
  const signUpApi = process.env.REACT_APP_SIGN_UP;
  const loginApi = process.env.REACT_APP_LOGIN_API;

  useEffect(() => {
    const jwt = localStorage.getItem("userToken");
    if (loggedIn) {
      axios
        .get(checkLoggedinApi, {
          headers: { Authorization: `Bearer ${jwt}` }
        })
        .then(result => {
          setUser(result.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [loggedIn, checkLoggedinApi]);
  const toggleLogin = () => {
    if (loggedIn) {
      setloggedIn(false);
      history.push("/");
    } else {
      setloggedIn(true);
      history.push("/");
    }
  };

  const signUpUser = data => {
    axios
      .post(signUpApi, data)
      .then(result => {
        localStorage.setItem("userToken", result.data.auth_token);
        localStorage.setItem("userData", JSON.stringify(result.data.user));
        setloggedIn(true);
        history.push("/users");
      })
      .catch(error => {
        console.log(error);
      });
  };

  const loginUser = (data, callback) => {
    axios
      .post(loginApi, data)
      .then(response => {
        localStorage.setItem("userToken", response.data.auth_token);
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        setloggedIn(true);
        callback(true);
      })
      .catch(error => {
        console.log(error);
        callback(false);
      });
  };
  const logoutUser = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    setloggedIn(false);
    history.push("/");
  };
  return (
    <>
      <MyNavBar
        logoutUser={logoutUser}
        setloggedIn={setloggedIn}
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
        <Route
          path="/users"
          component={() => {
            return <MyProfile user={user} />;
          }}
        />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/livesession" component={LiveSession} />
      </Switch>
    </>
  );
};

export default App;
