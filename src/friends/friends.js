import React from "react";


const Friends = () => {
    return (
        <div>
            <ul>
                {["Alex", "James", "Andy", "Beth", "Matt"].map((user, idx)=> {
                    return <li key={idx}>{user}</li>
                })}
            </ul>
        </div>
    );
};

export default Friends;