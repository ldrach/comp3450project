import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./login/login";
import SignUp from "./login/signup";
import Forgot from "./login/forgot";
import Home from "./home/home.js";

function App() {
  return (<Router>
          <div className="App">
              <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                  <div className="container">
                      <Link className="navbar-brand" to={"/sign-in"}>Movie Finder</Link>
                      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                          <ul className="navbar-nav ml-auto">
                              <li className="nav-item">
                                  <Link className="nav-link" to={"/sign-in"}>Login</Link>
                              </li>
                              <li className="nav-item">
                                  <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                              </li>
                          </ul>
                      </div>
                  </div>
              </nav>

              <div className="auth-wrapper">
                  <div className="auth-inner">
                      <Switch>
                          //Login
                          <Route exact path='/' component={Login} />
                          <Route path="/sign-in" component={Login} />
                          <Route path="/sign-up" component={SignUp} />
                          <Route path="/forgot" component={Forgot} />

                          //Home
                          <Route exact path='/' component={Home}/>
                          <Route path={"/home"} component={Home}/>

                      </Switch>
                  </div>
              </div>
    </div></Router>
  );
}

export default App;
