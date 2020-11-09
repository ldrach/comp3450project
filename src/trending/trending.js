import React, {Component} from "react";
import Navbar from "../navbar/navbar";
import './trending.css';


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
            numOfVotes: "",
            movieID: "",
            userReviews: "",
            isHovering: false,
        }],
        isLoaded: false
    }

    // On enter, send query to API thru axios, set state
    componentDidMount() {
        axios.get(`${BASEURL}trending/movie/week?api_key=${APIKEY}`)
            .then(response => {
                console.log(response.data.results);
                this.setState({
                    isLoaded: true,
                    movies: response.data.results.map(movie => ({
                        title: movie.title,
                        poster: movie.poster_path == null ? null : movie.poster_path,
                        overview: movie.overview == null ? 'No Overview' : movie.overview,
                        movieID: movie.id,
                        userReviews: movie.vote_average,
                        numOfVotes: movie.vote_count,
                    }))
                })
            })
    }

    // On hover change state of hover to allow modal window
    handleMouseHover(event, id) {
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
        let {isLoaded, movies} = this.state;
        if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <div className="container-fluid">
                    <Navbar/>
                    <h2 className="trendingMovieStyle">Trending Movies</h2>
                    {/* Display movies from search */}
                    <section>
                        {this.state.isLoaded ? movies.map((item, index) =>
                            item.poster == null ? null :
                                <div className="mainDivStyle rounded" key={index}>
                                    <div onMouseLeave={(event, id = item.movieID) => this.handleMouseHover(event, id)}>

                                        <img src={`${BASEIMGURL}/${SIZE}/${item.poster}`} alt="Movie Poster"
                                             key={item.movieID} className="imageStyle"
                                             onMouseEnter={(event, id = item.movieID) => this.handleMouseHover(event, id)}
                                        />
                                        {item.isHovering ?
                                            <div className="blanketStyle">
                                                <h4 className="hoverStyle">{item.title}</h4>
                                                <p className="imageOverViewStyle">{item.overview}</p>
                                                <h6 className="hoverStyle">{item.userReviews === 0 ? 'No Reviews Yet' : `Rating: ${item.userReviews} based on ${item.numOfVotes} votes`}</h6>
                                                <button className="btn btn-outline-danger btn-sm addToListStyle">Add To
                                                    List
                                                </button>
                                            </div> : null}
                                    </div>
                                </div>
                        ) : null}
                    </section>
                </div>
            );
        }
    }
}

