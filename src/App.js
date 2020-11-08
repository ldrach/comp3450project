import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Login from "./login/login";
import Signup from "./login/signup";
import Forgot from "./login/forgot";
import Home from "./home/home";
import Compare from "./compare/compare";
import Friends from "./friends/friends";
import MyProfile from "./myProfile/myProfile";
import OtherProfile from "./otherProfile/otherProfile";
import Trending from "./trending/trending";
import YourList from "./yourList/yourList";



function App() {
  return (
      <Router>
          <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/forgot" component={Forgot} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/compare" component={Compare} />
              <Route exact path="/friends" component={Friends} />
              <Route exact path="/myprofile" component={MyProfile} />
              <Route exact path="/otherProfile" component={OtherProfile} />
              <Route exact path="/trending" component={Trending} />
              <Route exact path="/yourlist" component={YourList} />
              {/*<Redirect to="/404" /> Can be added for not found redirect*/}
          </Switch>
      </Router>


  );
}

export default App;
