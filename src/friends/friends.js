import React from "react";
import Navbar from "../navbar/navbar";
import "./friends.css"

const Friends = () => {
    return (
        <container>
            <Navbar/>
            <div className="upperContainer">
                <ul>
                    {["Alex", "James", "Andy", "Beth", "Matt"].map((user, idx)=> {
                        return <li key={idx}>{user}</li>
                    })}
                </ul>
        </div>
        </container>
    );
};

export default Friends;