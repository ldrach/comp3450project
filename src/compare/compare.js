import React, { Component } from "react";
import Navbar from "../navbar/navbar";
import "./compare.css";
import { Combobox } from 'react-widgets'


// AXIOS FOR HTTP REQUEST, BASEURL AND API KEY FOR TMBD
const axios = require('axios').default;
const BASEURL = 'https://api.themoviedb.org/3/';
const APIKEY = '5cc7ef858dfde24d7396645c83fbacb6';
const SIZE = "w300";
const BASEIMGURL = "https://image.tmdb.org/t/p"

export default class Compare extends Component {

    // On enter, send query to API thru axios, set state
    searchHandler = (event) => {
        if (event.keyCode === 13 && event.target.value !== '') {
            axios.get(`${BASEURL}search/movie?api_key=${APIKEY}&query=${event.target.value}`)
                .then(response => {
                    console.log(response.data.results);
                    this.setState({
                        movies: response.data.results.map(movie => ({
                            title: movie.title,
                            poster: movie.poster_path == null ? null : movie.poster_path,
                            overview: movie.overview == null ? 'No Overview' : movie.overview,
                            movieID: movie.id,
                            userReviews: movie.vote_average,
                            numOfVotes: movie.vote_count,
                            isHovering: false
                        }))
                    })
                })
            event.target.value = ''; // Empty search input
        }
    }

    // On hover change state of hover to allow modal window
    handleMouseHover = (event, id) => {
        const movieIndex = this.state.movies.findIndex(hoveredMovie => {
            return hoveredMovie.movieID === id;
        })
        const movie = {
            ...this.state.movies[movieIndex]
        };
        movie.isHovering = !movie.isHovering;


        const movies = [...this.state.movies];
        movies[movieIndex] = movie;
        this.setState({movies});
    }


    render() {
        let colors = ['orange', 'red', 'blue', 'purple']
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
                                    <input type="text" id="search" aria-label="Search Bar" placeholder="Pick a Movie" onKeyDown={(event) => this.searchHandler(event)}/>
                                </div>
                            </td>
                            <td>
                                <div className="inputDiv" id="searchbar2">
                                    <input type="text" id="search" aria-label="Search Bar" placeholder="Pick a Movie" onKeyDown={(event) => this.searchHandler(event)}/>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div className={"buttonDiv"}>
                    <button className="btn btn-primary btn-md">Compare</button>
                    </div>
                </div>
                <div className={"lowerContainer"}>
                   Movie List
                </div>
            </React.Fragment>
        );
    }
}