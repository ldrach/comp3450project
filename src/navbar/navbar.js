import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">MovieFinder</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/trending" className="nav-link">Trending</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/friends" className="nav-link">Friends</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/compare" className="nav-link">Compare</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav justify-content-end">
                        <select className="btn btn-secondary">
                            <option selected={"true"} disabled={"true"}>Select Profile</option>
                            <option value="profile1">Profile 1</option>
                            <option value="profile2">Profile 2</option>
                            <option value="profile3">Profile 3</option>
                        </select>
                        <li className="navbar-item">
                            <Link to="/signup" className="nav-link">Sign Up</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/myprofile" className="nav-link">Profile</Link>
                        </li>
                        {/*<li className="navbar-item">
                            <Link to="/" className="nav-link">Logout</Link>
                        </li> disabled for prototype*/}
                    </ul>
                </div>

            </nav>
        );
    }
}