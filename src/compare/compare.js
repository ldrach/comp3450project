import React, { Component } from "react";
import Navbar from "../navbar/navbar";
import "./compare.css";
import 'semantic-ui-css/semantic.min.css'
import {Dropdown} from "semantic-ui-react";

// AXIOS FOR HTTP REQUEST, BASEURL AND API KEY FOR TMBD
const axios = require('axios').default;
const BASEURL = 'https://api.themoviedb.org/3/';
const APIKEY = '5cc7ef858dfde24d7396645c83fbacb6';
const SIZE = "w185";
const BASEIMGURL = "https://image.tmdb.org/t/p"

export default class Compare extends Component {

    state = {
        searchResults: [],
        chosenMovies: []
    }

    // On enter, send query to API thru axios, set state
    changeSearch = (event) => {
        if(event.keyCode === 13 && event.target.value !== '') {
            axios.get(`${BASEURL}search/movie?api_key=${APIKEY}&query=${event.target.value}`)
                .then(response => {
                    this.setState({
                        searchResults: response.data.results.map(movie =>({
                            text: movie.title,
                            key: movie.id,
                            value: movie.title
                        }))
                    })
                })
        event.target.value = '';
        }
    }

    chosenMovie = (event, key) => {
        event.persist();

        let movieID = '';
        key.options.forEach((item) => {
            if (key.value === item.text) {
                movieID = item.key;
            }
        })
        axios.get(`${BASEURL}movie/${movieID}?api_key=${APIKEY}&language=en-US`)
            .then(response => {
                this.setState({
                    chosenMovies: [...this.state.chosenMovies, {
                        id: response.data.id,
                        poster: response.data.poster_path
                    }]
                })
            })
    }

    renderMovie = () => {
        let {chosenMovies} = this.state;

        return (
            <div>
                {chosenMovies ? chosenMovies.map((item,index) => item.poster == null ? <div key={index}><p>This Movie Has No Poster</p></div> :
                    <div className="mainDivStyle rounded" key={index}>
                        <img src={`${BASEIMGURL}/${SIZE}/${item.poster}`} key={item.id} alt=""/>
                    </div> ) : null}
            </div>
        )
    }

    render() {
        let {searchResults, chosenMovies} = this.state;


        return (
            <React.Fragment>
                <div>
                    <Navbar />
                </div>
                <div className={"outter-wrapper"}>
                    <h1>Movie Finder</h1>
                    <table>
                        <tr>
                            <td>Movie 1</td>
                            <td>Movie 2</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="inputDiv" id="searchbar1">
                                    <input type="text" aria-label="Search Bar" required placeholder="Pick a Movie" onKeyDown={(event) => this.changeSearch(event)}/>
                                </div>
                            </td>
                            <td>
                                <div className="inputDiv" id="searchbar2">
                                    <input type="text"  aria-label="Search Bar" placeholder="Pick a Movie" onKeyDown={(event) => this.changeSearch(event)}/>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div className={"buttonDiv"}>
                    <button className="btn btn-primary btn-md">Compare</button>
                    </div>
                </div>
                <div className={"lowerContainer"}>
                    User 1 Options
                    <Dropdown fluid selection
                        placeholder={searchResults.length > 1 ? 'Choose from List' : 'Enter a movie in the search bar'}
                        defaultValue='Batman'
                        options={searchResults}
                        onChange={(event, key) => this.chosenMovie(event, key)}
                    />
                    {chosenMovies.length > 0 ? this.renderMovie() : null}
                </div>
            </React.Fragment>
        );
    }
}