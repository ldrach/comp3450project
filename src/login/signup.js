import React, { Component } from "react";
import {Link} from "react-router-dom";

export default class Signup extends Component {
    render() {
        return (
            <container>
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                    <Link to="/" className="navbar-brand">MovieFinder</Link>
                </nav>
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <form>
                            <h3>Sign Up</h3>
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" className="form-control" placeholder="Username" />
                            </div>
                            <div className="form-group">
                                <label>First name</label>
                                <input type="text" className="form-control" placeholder="First name" />
                            </div>
                            <div className="form-group">
                                <label>Last name</label>
                                <input type="text" className="form-control" placeholder="Last name" />
                            </div>
                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" className="form-control" placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                            <p className="forgot-password text-right">
                                Already registered? <a href="/">sign in</a>
                            </p>
                        </form>
                    </div>
                </div>
            </container>
        );
    }
}