import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
    render() {
        return (
            <container>
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                    <Link to="/" className="navbar-brand">MovieFinder</Link>
                </nav>
                <div className="auth-wrapper">
                   <div className="auth-inner">
                       <form>
                           <h3>Sign In</h3>
                           <div className="form-group">
                               <label>Email address</label>
                               <input type="email" className="form-control" placeholder="Enter email" />
                           </div>
                           <div className="form-group">
                               <label>Password</label>
                               <input type="password" className="form-control" placeholder="Enter password" />
                           </div>
                           <div className="form-group">
                               <div className="custom-control custom-checkbox">
                                   <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                   <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                               </div>
                           </div>
                           <button type="submit" className="btn btn-primary btn-block">Submit</button>
                           <p className="sign-up text-left">
                               Don't have an account? <Link to="signup">Sign Up</Link>
                           </p>
                           {/*<p className="forgot-password text-right">
                                  Forgot <Link to="/forgot">password?</Link>
                              </p>*/}
                       </form>
                   </div>
                </div>
            </container>
        );
    }
}