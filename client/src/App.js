import React, { useState, useEffect } from "react";
import MyNavBar from "./components/MyNavBar";
// import MyProfile from "./pages/MyProfile";
import { Route, Switch, useHistory } from "react-router-dom";

import axios from "axios";
import Dashboard from "./pages/Dashboard";
import LiveSession from "./pages/LiveSession";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import "./css/app.css"

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
          headers: { "Authorization": `Bearer ${jwt}` }
        })
        .then(result => {
          setUser(result.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [loggedIn, checkLoggedinApi]);
  // const toggleLogin = () => {
  //   if (loggedIn) {
  //     setloggedIn(false);
  //     history.push("/");
  //   } else {
  //     setloggedIn(true);
  //     history.push("/");
  //   }
  // };

  const signUpUser = data => {
    axios({
      method:'post',
      url:signUpApi,
      data:JSON.stringify(data),
      headers:{'Content-Type':'application/json'}
    })
      .then(result => {
        localStorage.setItem("userToken", result.data.auth_token);
        localStorage.setItem("userData", JSON.stringify(result.data.user));
        setloggedIn(true);
        history.push("/dashboard");
      })
      .catch(error => {
        alert(error.response.data.message)
      });
  };

  const loginUser = (data, callback) => {
    axios({
      method:'post',
      url:loginApi,
      data:JSON.stringify(data),
      headers:{"Content-Type" : "application/json"}
    })
      .then(response => {
        localStorage.setItem("userToken", response.data.auth_token);
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        setloggedIn(true);
        history.push("/dashboard");
        callback(true);
      })
      .catch(error => {
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
      {/* <MyNavBar
        logoutUser={logoutUser}
        setloggedIn={setloggedIn}
        loggedIn={loggedIn}
        signUpUser={signUpUser}
        loginUser={loginUser}
        toggleLogin={toggleLogin}
      /> */}
      <Switch>
        <Route
          exact
          path="/"
          render={()=> <SignIn loginUser={loginUser}/>} />;
          }}
        />
        <Route path="/signup" render={()=> <SignUp signUpUser={signUpUser}/>} />
        <Route path="/signin" render={()=> <SignIn loginUser={loginUser}/>} />
        <Route path="/dashboard" render={()=> <Dashboard signUpUser={signUpUser} loggedIn={loggedIn} setloggedIn={setloggedIn} logoutUser={logoutUser} loginUser={loginUser}/>} />
        <Route path="/livesession" component={LiveSession} />
      </Switch>
      
      <div className='footer'>
        <p>Next Academy</p>
      </div>
    </>
  );
};

export default App;
