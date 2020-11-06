import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class Forgot extends Component {
    render() {
        return (
            <container>
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                    <Link to="/" className="navbar-brand">MovieFinder</Link>
                </nav>
                    <div className="auth-wrapper">
                        <div className="auth-inner">
                            <form>
                                <h3>Forgot Password</h3>
                                <div className="form-group">
                                    <label>Email address</label>
                                    <input type="email" className="form-control" placeholder="Enter email" />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                            </form>
                        </div>
                    </div>
            </container>
        );
    }
}