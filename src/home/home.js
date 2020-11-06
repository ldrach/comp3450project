import React, {Component} from "react";
import Navbar from "../navbar/navbar";

// AXIOS FOR HTTP REQUEST, BASEURL AND API KEY FOR TMBD
const axios = require('axios').default;
const BASEURL = 'https://api.themoviedb.org/3/';
const APIKEY = '5cc7ef858dfde24d7396645c83fbacb6';
const size = "w92";
const baseImgUrl = "https://image.tmdb.org/t/p"

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


    clickHandler = (event) => {
        if (event.keyCode === 13) {
            const query = event.target.value;
            axios.get(`${BASEURL}search/movie?api_key=${APIKEY}&query=${query}`)
                .then(response => {
                    console.log(response);
                    this.setState({
                        movies: response.data.results.map(movie => ({
                            title: movie.title,
                            popularity: movie.popularity,
                            poster: movie.poster_path,
                            overview: movie.overview,
                            moveID: movie.id
                        }))
                    })
                })
        }
    }


    render() {
        let movie = this.state.movies;
        const style = {
            backgroundColor: 'white',
            border: '1px solid black',
            margin: '2vh auto'
        }

        const inputStyle = {
            textAlign: 'center',
            margin: '2vh 1.5vh',
            color: 'black',
            borderRadius: '5px'
        }
        return (
            <div>
                <Navbar/>

                <div style={inputStyle}>
                    <label htmlFor="search">Search Movie: </label>
                    <input type="text" id="search" style={inputStyle} onKeyDown={event => this.clickHandler(event)}/>
                </div>
                <secion className="container-fluid section">
                    {movie.map(item =>
                        <div style={style}>
                            <h1 key={item.movieID}>{item.title}</h1>
                            <h1 key={item.movieID}>{item.popularity}</h1>
                            <img src={`${baseImgUrl}/${size}/${item.poster}`} alt=""/>
                            <p key={item.movieID}>{item.overview}</p>
                        </div>)}
                </secion>
            </div>
        );
    }
}