import React, {Component} from "react";
import Navbar from "../navbar/navbar";
const axios = require('axios').default;

// AXIOS FOR HTTP REQUEST, BASEURL AND API KEY FOR TMBD
const BASEURL = 'https://api.themoviedb.org/3/';
const APIKEY = '5cc7ef858dfde24d7396645c83fbacb6';
const SIZE = "w185";
const BASEIMGURL = "https://image.tmdb.org/t/p"

export default class MovieSearch extends Component {

    state = {
        movies: [{
            title: "",
            popularity: "",
            poster: "",
            overview: "",
            movieID: ""
        }]
    }

    // On enter, send query to API thru axios, set state
    clickHandler = (event) => {
        if (event.keyCode === 13) {
            axios.get(`${BASEURL}search/movie?api_key=${APIKEY}&query=${event.target.value}`)
                .then(response => {
                    console.log(response.data.results);
                    this.setState({
                        movies: response.data.results.map(movie => ({
                            title: movie.title,
                            poster: movie.poster_path == null ? null : movie.poster_path,
                            overview: movie.overview == null ? null : movie.overview,
                            key: movie.id
                        }))
                    })
                })
        event.target.value = ''; // Empty search input
        }
    }



    render() {
        let movie = this.state.movies;
        console.log(movie);

        const style = {
            border: '3px solid white',
            margin: '2vh 1.5vh',
            display: 'inline-block'
        }

        const inputStyle = {
            textAlign: 'center',
            margin: '2vh 1.5vh',
            color: 'black',
            borderRadius: '5px'
        }

        return (
            <div className="container-fluid">
                <Navbar/>
                <div style={inputStyle}>
                    <label htmlFor="search">Search Movie: </label>
                    <input type="text" id="search" style={inputStyle} onKeyDown={event => this.clickHandler(event)}/>
                </div>
                <section className="container-fluid section">
                    {/* MAP MOVIES FROM STATE TO A DIV, POSSIBLY CAN BE MOVED TO A "MOVIE CONTAINER" COMPONENT INSTEAD OF
                    HAVING ALL THIS GARBAGE HERE */}
                    {movie.length > 1 ? movie.map(item =>
                        item.poster == null ? null :
                            <div style={style}>
                                <img src={`${BASEIMGURL}/${SIZE}/${item.poster}`}/>
                            </div>
                        ) : null}
                </section>
            </div>
        );
    }
}