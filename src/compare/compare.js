import React, { Component } from "react";
import Navbar from "../navbar/navbar";
import "./compare.css";
import 'semantic-ui-css/semantic.min.css'
import {Dropdown} from "semantic-ui-react";

// AXIOS FOR HTTP REQUEST, BASEURL AND API KEY FOR TMBD
const axios = require('axios').default;
const BASEURL = 'https://api.themoviedb.org/3/';
const APIKEY = '5cc7ef858dfde24d7396645c83fbacb6';
const SIZE = "w300";
const BASEIMGURL = "https://image.tmdb.org/t/p"

export default class Compare extends Component {

    state = {
        searchResults: [],
        chosenMovies: [],
        list1: [],
        list2: [],
        mergedList: []
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
                        <img src={`${BASEIMGURL}/w185/${item.poster}`} key={item.id} alt=""/>
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
                        movieID: item.id,
                        isHovering: false
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
                        movieID: item.id,
                        isHovering: false
                    }))
                })
            })


        // Durstenfeld shuffle from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        let list1Results = list1.splice(0,5);
        let list2Results = list2.splice(0,5);
        let mergeLists = [...list1Results, ...list2Results];
        shuffleArray(mergeLists);

        this.setState({mergedList: [...mergeLists]});
    }

    clearRecommendations = () => {
        this.setState({
            searchResults: [],
            chosenMovies: [],
            list1: [],
            list2: [],
            mergedList: []
        })
    }

    handleMouseHover = (event, id) => {
        const movieIndex = this.state.mergedList.findIndex(hoveredMovie => {
            return hoveredMovie.movieID === id;
        })
        const movie = {
            ...this.state.mergedList[movieIndex]
        };

        movie.isHovering = !movie.isHovering;

        const mergedList = [...this.state.mergedList];
        mergedList[movieIndex] = movie;
        this.setState({mergedList});
    }

    render() {
        let {searchResults, chosenMovies, mergedList} = this.state;

        return (
            <React.Fragment>
                <div>
                    <Navbar />
                </div>
                <div className={"outter-wrapper"}>
                    <h1>Movie Finder</h1>
                    <table>
                        <tr>
                            <td>{chosenMovies.length < 1 ? 'Pick 1st Movie' : 'Pick 2nd Movie'}</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="inputDiv" id="searchbar1">
                                    <input type="text" aria-label="Search Bar" id="input1" placeholder="Pick a Movie" onKeyDown={(event) => this.changeSearch(event)}/>
                                </div>
                            </td>
                        </tr>
                    </table>

                    <div className={"buttonDiv"}>
                        <button className="btn btn-primary btn-md" style={{margin: '0.4vh'}} onClick={chosenMovies.length > 1 ? this.generateList : null}>Get Recommendations</button>
                        <button className="btn btn-danger btn-md" style={{margin: '0.4vh'}} onClick={this.clearRecommendations}>Clear Recommendations</button>
                    </div>

                    <h3 style={{textAlign: 'center', color: 'white'}}>Recommended List Options</h3>
                    <Dropdown fluid selection
                              placeholder={searchResults.length > 1 ? 'Choose from List' : 'Enter a movie in the search bar'}
                              options={searchResults}
                              onChange={(event, key) => this.chosenMovie(event, key)}
                    />
                    {chosenMovies.length > 0 ? <div style={{textAlign: 'center'}}>{this.renderMovie()}</div> : null}

                </div>
                <div className={"lowerContainer"}>
                    <h3 style={{paddingTop: '0.8vh'}}>Results</h3>
                    <section>
                        {mergedList.length > 1 ? mergedList.map((item, index) =>
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
                                            </div> : null}
                                    </div>
                                </div>
                        ) : null }
                    </section>
                </div>
            </React.Fragment>
        );
    }
}