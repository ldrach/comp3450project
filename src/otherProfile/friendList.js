import React, {Component} from 'react';
import './friendList.css';

export default class FriendList extends Component {

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