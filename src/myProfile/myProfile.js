import React, {Component} from "react";
import './myProfile.css';
import Navbar from "../navbar/navbar";
import FriendsList from "./myFriendsList";
import MyListProfile from "./myListProfile";
import axios from "axios";

export default class myProfile extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);

        this.state = {
            index: '',
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

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        user: response.data.map(user => user.username),
                        username: response.data[0].username,
                        firstname: response.data[0].firstname,
                        lastname: response.data[0].lastname,
                        email: response.data[0].email,
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <container className="myProfileContainer">
                <Navbar/>
                <div>
                    <select
                        required
                        className="btn btn-secondary"
                        onChange = {this.onChangeUsername}
                        >
                        {
                            this.state.user.map(function(user) {
                                return <option>
                                    {user}
                                </option>
                            })
                        }
                    </select>
                    <h3>My Profile</h3>
                    <div className="upperContainer">
                        <div>
                            <img className="profilePicture"
                                 src="https://images.unsplash.com/photo-1546109113-a07e6a96ef76?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=749&q=80"
                            />
                        </div>
                        <div className="profileInfo">
                            <h4>{this.state.firstname + " " + this.state.lastname}</h4>
                            <div className="innerProfileInfo">
                                <h5>{this.state.username}</h5>
                            </div>
                            <div>
                                <h5>{this.state.email}</h5>
                            </div>
                            <div>
                                <h5>{this.state.user}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="midContainer">
                        <h3>My Friends</h3>
                        <FriendsList/>
                    </div>
                    <div className="lowerContainer">
                        <h3>My List</h3>
                        <MyListProfile/>
                    </div>
                </div>
            </container>
        )
    }
}