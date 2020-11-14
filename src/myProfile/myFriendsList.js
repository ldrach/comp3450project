import React, {Component} from 'react';
import './myFriendsList.css';

export default class FriendsList extends Component {

    render() {
        const friends = ['James', 'Martha', 'Helen', 'Chris']
        return (
            <table className="table table-striped" style={{ marginTop: 20, color: "white"}} >
                <tbody>
                { friends }
                </tbody>
            </table>
        )
    }
}