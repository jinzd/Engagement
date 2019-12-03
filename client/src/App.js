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
  const [currentUser, setCurrentUser] = useState([]);
  const [loggedIn, setloggedIn] = useState(false);
  // const [id, setId] = useState(0);
  const history = useHistory();
  // console.log(`Log In State ${loggedIn}`);

  const jwt = localStorage.getItem("userToken");
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/api/v1/users/me`, {
        headers: { Authorization: `Bearer ${jwt}` }
      })
      .then(result => {
        console.log(result.data);
        setUser(result.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
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
      .post("http://localhost:5000/api/v1/users/new", data)
      .then(result => {
        console.log(result.data);
        localStorage.setItem("userToken", result.data.auth_token);
        localStorage.setItem("userData", JSON.stringify(result.data.user));
        setloggedIn(true);
        history.push(`/users/${result.data.user.id}`);
      })
      .catch(error => {
        console.log(error.response.message);
      });
  };

  const loginUser = (data, callback) => {
    console.log(currentUser);
    console.log(data);

    axios
      .post("http://localhost:5000/api/v1/login/", data)
      .then(response => {
        console.log(response);
        localStorage.setItem("userToken", response.data.auth_token);
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        setCurrentUser(response.data.user);
        setloggedIn(true);
        console.log(currentUser);
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
