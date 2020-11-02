import React, { Component } from "react";

// AXIOS FOR HTTP REQUEST, BASEURL AND API KEY FOR TMBD
const axios = require('axios').default;
const BASEURL = 'https://api.themoviedb.org/3/';
const APIKEY = '5cc7ef858dfde24d7396645c83fbacb6';


export default class MovieSearch extends Component {

    submitForm(e) {
        console.log('clicked');
        e.preventDefault();
    }

    render() {
        return (
            <div className='container-fluid'>
                <form action="" id="myForm">
                    <div className="form-group .container-md">
                        <label htmlFor="searchBar">Search for A Movie:</label>
                        <input type="text" name="searchBar" id="searchBar"/>
                    </div>
                    <input
                        onSubmit={this.submitForm}
                        type="submit"
                        name="searchButton"
                        id="searchButton"
                        value="search"
                        className="btn btn-primary"/>
                </form>
            </div>
        );
    }
}

