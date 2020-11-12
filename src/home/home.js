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
                poster: "",
                overview: "",
                numOfVotes: "",
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

        const movies = [...this.state.movies];
        movies[movieIndex] = movie;
        this.setState({movies});
    }

    render() {
        let movie = this.state.movies;

        return (
            <div className="container-fluid">
                <Navbar/>

                <div className="inputDiv">
                    <input type="text" id="search" aria-label="Search Bar" placeholder="Search Movies" onKeyDown={(event) => this.searchHandler(event)}/>
                </div>

                {/* Display movies from search */}
                <section>
                    {movie.length > 1 ? movie.map((item, index) =>
                        item.poster == null ? null :
                            <div className="mainDivStyle rounded" key={index}>
                                <div onMouseLeave={(event, id=item.movieID) => this.handleMouseHover(event,id)}>

                                <img src={`${BASEIMGURL}/${SIZE}/${item.poster}`} alt="Movie Poster" key={item.movieID} className="imageStyle"
                                     onMouseEnter={(event, id=item.movieID) => this.handleMouseHover(event,id)}
                                />
                                    {item.isHovering ?
                                    <div className="blanketStyle">
                                        <h4 className="hoverStyle">{item.title}</h4>
                                        <p className="imageOverViewStyle">{item.overview}</p>
                                        <div className="ratingAndReviewStyle">
                                            <h6 className="hoverStyle">{item.userReviews === 0 ? 'No Reviews Yet' : `Rating: ${item.userReviews} based on ${item.numOfVotes} votes`}</h6>
                                            <button className="btn btn-outline-danger btn-sm addToListStyle">Add To List</button>
                                        </div>
                                    </div> : null}
                                </div>
                            </div>
                    ) : null }
                </section>
            </div>
        );
    }
}


