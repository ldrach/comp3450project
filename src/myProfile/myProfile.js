import React, {Component} from "react";
import './myProfile.css';
import Navbar from "../navbar/navbar";
import FriendsList from "./myFriendsList";
import MyListProfile from "./myListProfile";


export default class myProfile extends Component {
    render() {
        return (
            <container className="myProfileContainer">
                <Navbar/>
                <div>
                    <h3>My Profile</h3>
                    <div className="upperContainer">
                        <div>
                            <img className="profilePicture"
                                 src="https://images.unsplash.com/photo-1546109113-a07e6a96ef76?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=749&q=80"
                            />
                        </div>
                        <div className="profileInfo">
                            <h4>John Doe</h4>
                            <div className="innerProfileInfo">
                                <h5>JonDoe237</h5>
                            </div>
                            <div>
                                <h5>jdoe237@gmail.com</h5>
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


