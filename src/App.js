import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./login/login";
import Signup from "./login/signup";
import Forgot from "./login/forgot";
import Home from "./home/home.js";

function App() {
  return (
      <Router>
          <div className="container">
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/forgot" component={Forgot} />
            <Route path="/home" component={Home} />
          </div>
      </Router>
  );
}

export default App;
