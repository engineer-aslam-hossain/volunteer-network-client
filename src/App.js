import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Events from "./components/Events/Events";
import Admin from "./components/Admin/Admin";

export const UserContext = React.createContext();
function App() {
  const [LoggedInUser, SetLoggedInUser] = useState({});
  const [RegisterEvents, SetRegisterEvents] = useState({});
  return (
    <UserContext.Provider
      value={{
        LoggedInUser,
        SetLoggedInUser,
        RegisterEvents,
        SetRegisterEvents,
      }}>
      <Router>
        <Switch>
          <Route exact path={process.env.PUBLIC_URL + "/"}>
            <Home />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <PrivateRoute path='/events'>
            <Events />
          </PrivateRoute>
          <Route path='/admin'>
            <Admin />
          </Route>
          <PrivateRoute exact path='/register'>
            <Register />
          </PrivateRoute>
          <PrivateRoute path='/register/:eventName'>
            <Register />
          </PrivateRoute>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}
export default App;
