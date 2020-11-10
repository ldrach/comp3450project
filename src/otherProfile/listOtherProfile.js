import React, {Component} from 'react';
import './listOtherProfile.css';

export default class MyListProfile extends Component {

    render() {
        const List = ['Catch Me If You Can', 'Black Swan', 'A Nightmare Before Christmas', 'Friday the 13th']
        return (
            <div className="ListContainer">
                <p>{List[0]}</p>
                <p>{List[1]}</p>
                <p>{List[2]}</p>
                <p>{List[3]}</p>
            </div>
        )
    }
}