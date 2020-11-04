import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./login/login";
import Signup from "./login/signup";
import Forgot from "./login/forgot";
import Home from "./home/home.js";
import NavbarComponent from "./navbar/navbar";

function displayNavBar() {
    return (<NavbarComponent />);
}

function App() {
  return (
      <Router>

          <br />
          <div className="container">
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/forgot" component={Forgot} />
            <Route path="/home" component={Home} render={ () => displayNavBar()} />
          </div>
      </Router>
  );
}

export default App;
