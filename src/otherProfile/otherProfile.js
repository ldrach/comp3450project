import React, {Component} from "react";
import './otherProfile.css';
import Navbar from "../navbar/navbar";
import FriendList from "./friendList";
import ListOtherProfile from "./listOtherProfile";


export default class OtherProfile extends Component {
    render() {
        return (
            <container className="otherProfileContainer">
                <Navbar/>
                <div>
                    <h3>Profile</h3>
                    <div className="upperContainer">
                        <div>
                            <img className="profilePicture"
                                 src="https://images.unsplash.com/photo-1546109113-a07e6a96ef76?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=749&q=80"
                            />
                        </div>
                        <div className="profileInfo">
                            <h4>Jane Doe</h4>
                            <div className="innerProfileInfo">
                                <h5>JaneDoe123</h5>
                            </div>
                            <div>
                                <h5>jdoe123@gmail.com</h5>
                            </div>
                        </div>
                    </div>
                    <div className="midContainer">
                        <h3>Friends</h3>
                        <FriendList/>
                    </div>
                    <div className="lowerContainer">
                        <h3>List</h3>
                        <ListOtherProfile/>
                    </div>
                </div>
            </container>
        )
    }
}