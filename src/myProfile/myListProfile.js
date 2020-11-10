import React, {Component} from 'react';
import './myListProfile.css';

export default class MyListProfile extends Component {

    render() {
        const myList = ['Catch Me If You Can', 'Black Swan', 'A Nightmare Before Christmas', 'Friday the 13th']
        return (
            <div className="myListContainer">
                <p>{myList[0]}</p>
                <p>{myList[1]}</p>
                <p>{myList[2]}</p>
                <p>{myList[3]}</p>
            </div>
        )
    }
}