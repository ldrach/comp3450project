import React, {Component} from 'react';
import './myFriendsList.css';

export default class FriendsList extends Component {

    render() {
        const friends = ['James', 'Martha', 'Helen', 'Chris']
        return (
                <div className="friendContainer">
                   <p>{friends[0]}</p>
                   <p>{friends[1]}</p>
                   <p>{friends[2]}</p>
                   <p>{friends[3]}</p>
                </div>
        )
    }
}