import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/home" className="navbar-brand">MovieFinder</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/home" className="nav-link">Home</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/trending" className="nav-link">Trending</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/friends" className="nav-link">Friends</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav justify-content-end">
                        <li className="navbar-item">
                            <Link to="/myprofile" className="nav-link">Profile</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Logout</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}