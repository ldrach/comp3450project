import React, { Component } from "react";
import Navbar from "../navbar/navbar";


export default class Error404 extends Component {

    render() {
        return (
            <container>
                <Navbar />
                <div>
                    <h1 style={{color:"white"}}>404 page not found!</h1>
                </div>
            </container>
        );
    }
}