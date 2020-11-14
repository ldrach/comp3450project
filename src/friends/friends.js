import React, {Component} from "react";
import Navbar from "../navbar/navbar";
import "./friends.css"
import axios from "axios";



export default class Friends extends Component {

    render() {
        return (
            <React.Fragment>
                <Navbar/>
                <h2 className="friendsTitle">My Friends</h2>
                <div className="upperContainer">
                    <ul>
                        {["Alex", "James", "Andy", "Beth", "Matt"].map((user, idx) => {
                            return <li key={idx}>{user}</li>
                        })}
                    </ul>
                </div>
                <div className="inputDiv">
                    <input type="text" id="friendSearch" aria-label="Search Bar" placeholder="Find Friends"/>
                </div>
                <div className={"friendSearchDisplay"}>
                    <ul>
                        {["Alex", "James", "Andy", "Beth", "Matt"].map((user, idx) => {
                            return <li key={idx}>{user}</li>
                        })}
                    </ul>
                </div>
            </React.Fragment>
        );
    }
};

