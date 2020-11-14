import React, {Component} from "react";
import Navbar from "../navbar/navbar";

// AXIOS, API INFO
const axios = require('axios').default;
const BASEURL = 'https://api.themoviedb.org/3/';
const APIKEY = '5cc7ef858dfde24d7396645c83fbacb6';
const SIZE = "w300";
const BASEIMGURL = "https://image.tmdb.org/t/p"

export default class Compare extends Component {
    state = {
        searchResults: [{
            title: '',
            id: ''
        }],
        chosenMovieResult: []
    }

    changeSearch = (event) => {
        let search = event.target.value;
        if(search.length > 1) {
            axios.get(`${BASEURL}search/movie?api_key=${APIKEY}&query=${event.target.value}`)
                .then(response => {
                    console.log(response.data.results);
                    this.setState({
                        searchResults: response.data.results.map(movie =>({
                           title: movie.title,
                           id: movie.id
                        }))
                    })
                })
        }
    }

    renderMovieList = () => {
        let {searchResults} = this.state;
        if(searchResults.length > 1){
            return (
                <div>
                    <ul>
                        {searchResults.map((item) => <li style={{color: 'white'}} key={item.id}
                                                         onClick={() => this.chosenMovie(item.id)}>{item.title}</li>)}
                    </ul>
                </div>
            );
        }
    }

    chosenMovie = (movieID) =>{
        axios.get(`${BASEURL}movie/${movieID}?api_key=${APIKEY}&language=en-US`)
            .then(response => {
                console.log(response.data);
                this.setState({
                    chosenMovieResult: [{
                        title: response.data.title,
                        poster: response.data.poster_path,
                        id: response.data.id
                    }]
                })
            })
    }

    renderMovie = () => {
        let {chosenMovieResult} = this.state;
        console.log(chosenMovieResult.length);
            return (
                <div>
                    {chosenMovieResult.map((item) => item.poster == null ? null :
                    <div className="mainDivStyle rounded">
                        <img src={`${BASEIMGURL}/${SIZE}/${item.poster}`} key={item.id} alt=""/>
                    </div> )}
                </div>
            )
        }



    render() {
        return (
            <div className="container-fluid">
                <Navbar/>
                <div>
                    <input type="text" aria-label="Search Movie" onChange={(e) => this.changeSearch(e)}/>
                    {this.renderMovieList()}
                    {this.renderMovie()}
                </div>
            </div>
        );
    }
}