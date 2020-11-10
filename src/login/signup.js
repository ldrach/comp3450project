import React, { Component } from "react";
import axios from 'axios';

export default class Signup extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: ''
        }
    }

    componentDidMount() {
        this.setState({
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: ''
        })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
   }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onChangeFirstName(e) {
        this.setState({
            firstname: e.target.value
        })
    }

    onChangeLastName(e) {
        this.setState({
            lastname: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email
        }

        console.log(user)

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));
        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Sign Up</h3>
                <form onSubmit = {this.onSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text"
                               className="form-control"
                               placeholder="Username"
                               value = {this.state.username}
                               onChange = {this.onChangeUsername}
                        />
                    </div>

                    <div className="form-group">
                        <label>First name</label>
                        <input type="text"
                               className="form-control"
                               placeholder="First name"
                               value = {this.state.firstname}
                               onChange = {this.onChangeFirstName}
                        />
                    </div>

                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text"
                               className="form-control"
                               placeholder="Last name"
                               value = {this.state.lastname}
                               onChange = {this.onChangeLastName}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email"
                               className="form-control"
                               placeholder="Enter email"
                               value = {this.state.email}
                               onChange = {this.onChangeEmail}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password"
                               className="form-control"
                               placeholder="Enter password"
                               value = {this.state.password}
                               onChange = {this.onChangePassword}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                    <p className="forgot-password text-right">
                        Already registered? <a href="/">sign in</a>
                    </p>
                </form>
            </div>
        );
    }
}