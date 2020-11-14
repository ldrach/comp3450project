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
        chosenMovies: [],
        list1: [],
        list2: [],
        list1Results: [],
        list2Results: []
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
                if(this.state.chosenMovies.length < 2) {
                    this.setState({
                        chosenMovies: [...this.state.chosenMovies, {
                            id: response.data.id,
                            poster: response.data.poster_path
                        }]
                    })
                }
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

    generateList = () => {
        let {chosenMovies, list1, list2} = this.state;
        let movie1 = chosenMovies[0];
        let movie2 =chosenMovies[1];

        axios.get(`${BASEURL}movie/${movie1.id}/recommendations?api_key=${APIKEY}&language=en-US&page=1`)
            .then(response => {
                    this.setState( {
                        list1: response.data.results.map((item) => ({
                            title: item.title,
                            poster: item.poster_path,
                            overview: item.overview,
                            id: item.id
                        }))
                    })
            })

        axios.get(`${BASEURL}movie/${movie2.id}/recommendations?api_key=${APIKEY}&language=en-US&page=1`)
            .then(response => {
                    this.setState({
                        list2: response.data.results.map((item) => ({
                            title: item.title,
                            poster: item.poster_path,
                            overview: item.overview,
                            id: item.id
                        }))
                    })
            })

        this.setState({
            list1Results: list1.map((item) => ({
                title: item.title,
                poster: item.poster,
                overview: item.overview,
                id: item.id
            }))
        })

        this.setState({
            list2Results: list2.map((item) => ({
                title: item.title,
                poster: item.poster,
                overview: item.overview,
                id: item.id
            }))
        })
    }


    render() {
        let {searchResults, chosenMovies, list1Results, list2Results} = this.state;

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
                                    <input type="text" aria-label="Search Bar" placeholder="Pick a Movie" onKeyDown={(event) => this.changeSearch(event)}/>
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
                    <button className="btn btn-primary btn-md" onClick={this.generateList}>Get Recommendations</button>
                    </div>

                    <h3 style={{textAlign: 'center', color: 'white'}}>Options</h3>
                    <Dropdown fluid selection
                              placeholder={searchResults.length > 1 ? 'Choose from List' : 'Enter a movie in the search bar'}
                              options={searchResults}
                              onChange={(event, key) => this.chosenMovie(event, key)}
                    />
                    {chosenMovies.length > 0 ? <div style={{textAlign: 'center'}}>{this.renderMovie()}</div> : null}

                </div>
                <div className={"lowerContainer"}>
                    <h3>Results</h3>
                    <section>
                        {list1Results.length > 1 ? list1Results.map((item, index) =>
                            item.poster == null ? null :
                                <div className="mainDivStyle rounded" key={index}>
                                    <img src={`${BASEIMGURL}/${SIZE}/${item.poster}`} alt="Movie Poster" key={item.movieID} className="imageStyle"/>
                                </div>
                        ) : null }

                        {list2Results.length > 1 ? list2Results.map((item, index) =>
                            item.poster == null ? null :
                                <div className="mainDivStyle rounded" key={index}>
                                        <img src={`${BASEIMGURL}/${SIZE}/${item.poster}`} alt="Movie Poster" key={item.movieID} className="imageStyle"/>
                                </div>
                        ) : null }
                    </section>
                </div>
            </React.Fragment>
        );
    }
}