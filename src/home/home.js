import React, {Component} from "react";
import Navbar from "../navbar/navbar";
import './home.css';


// AXIOS FOR HTTP REQUEST, BASEURL AND API KEY FOR TMBD
const axios = require('axios').default;
const BASEURL = 'https://api.themoviedb.org/3/';
const APIKEY = '5cc7ef858dfde24d7396645c83fbacb6';
const SIZE = "w300";
const BASEIMGURL = "https://image.tmdb.org/t/p"

export default class MovieSearch extends Component {
        state = {
            movies: [{
                title: "",
                popularity: "",
                poster: "",
                overview: "",
                movieID: "",
                userReviews: "",
                isHovering: false
            }]
        }

    // On enter, send query to API thru axios, set state
    searchHandler = (event) => {
        if (event.keyCode === 13 && event.target.value !== '') {
            axios.get(`${BASEURL}search/movie?api_key=${APIKEY}&query=${event.target.value}`)
                .then(response => {
                    console.log(response.data.results);
                    this.setState({
                        movies: response.data.results.map(movie => ({
                            title: movie.title == null ? 'No Title' : movie.title,
                            poster: movie.poster_path == null ? null : movie.poster_path,
                            overview: movie.overview == null ? 'No Overview' : movie.overview,
                            movieID: movie.id,
                            userReviews: movie.vote_average,
                            isHovering: false
                        }))
                    })
                })
        event.target.value = ''; // Empty search input
        }
    }

    // On hover change state of hover to allow modal window
    handleMouseHover(event, id) {
        const movieIndex = this.state.movies.findIndex(hoveredMovie => {
            return hoveredMovie.movieID === id;
        })
        console.log('id: ' + id);
        const movie = {
            ...this.state.movies[movieIndex]
        };
        movie.isHovering = !movie.isHovering;

        console.log('Current hover: ' + movie.isHovering);

        const movies = [...this.state.movies];
        movies[movieIndex] = movie;
        this.setState({movies});
    }

    render() {
        let movie = this.state.movies;
        console.log(this.state.movies);

        return (
            <div className="container-fluid">
                <Navbar/>

                <div>
                    <label htmlFor="search">Search Movie: </label>
                    <input type="text" id="search" className="form-control" placeholder="Search Movies" onKeyDown={(event) => this.searchHandler(event)}/>
                </div>

                {/* Display movies from search */}
                <section>
                    {movie.length > 1 ? movie.map((item, index) =>
                        item.poster == null ? null :
                            <div className="mainDivStyle" key={index}>
                                <div onMouseLeave={(event, id=item.movieID) => this.handleMouseHover(event,id)}>
                                <img src={`${BASEIMGURL}/${SIZE}/${item.poster}`} alt="Movie Poster" key={item.movieID} className="imageStyle"
                                     onMouseEnter={(event, id=item.movieID) => this.handleMouseHover(event,id)}
                                />
                                {item.isHovering ?
                                <div className="blanketStyle">
                                    <p className="imageOverViewStyle">{item.overview}</p>
                                    <h5 className="hoverStyle">Title: {item.title}</h5>
                                    <p className="hoverStyle">Rating: {item.userReviews}</p>
                                </div> : null}
                                </div>
                            </div>
                    ) : null }
                </section>
            </div>
        );
    }
}

