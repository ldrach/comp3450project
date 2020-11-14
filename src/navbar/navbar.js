import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Navbar extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);

        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            user: []
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        user: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

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
                        <select
                            required
                            className="btn btn-secondary"
                            value = {this.state.username}
                            onChange = {this.onChangeUsername}>
                            {
                                this.state.user.map(function(user) {
                                    return <option>
                                        {user}
                                    </option>
                                })
                            }
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