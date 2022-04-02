import React, { Component } from "react";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import AllMovies from "../AllMovies/AllMovies";
import SingleMovie from "../SingleMovie/SingleMovie";
import ErrorModal from "../ErrorModal/ErrorModal"
import { getData, singleMovieData } from "../../apiCalls";
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovieId: null,
      // selectedMovie: {},
      // video: {},
      error: "",
      hasError: false
    };
  }

  componentDidMount = () => {
    return getData("")
      .then((data) => this.setState({ movies: data.movies }))
      .catch((error) => this.throwError("Oops! something went wrong. Please try again. If problem persists, send complaints to Robbie and Scott"));
  };

  throwError = (error) => {
    this.setState({ error: error})
    this.setState({ hasError: true });

  }

  clickedMovie = (id) => {
    this.setState({selectedMovieId: id});

};

  closeModalButton = () => {
    this.setState({ hasError: false });
  };

  render() {
    return (
      <main>
        <Header />
          <Switch>
          {/* HomePage */}
            <Route exact path="/" render={() =>
            <AllMovies movies={this.state.movies} clickedMovie={this.clickedMovie}/> }
            />
          {/* SingleMoviePage */}
            <Route path="/:id" render={() =>
              <SingleMovie id={this.state.selectedMovieId} /> }
            />

          </Switch>
        {this.state.hasError && (
        <ErrorModal
          error={this.state.error}
          closeModalButton={this.closeModalButton}
        />)}

        <Footer />
      </main>
    );
  }
}

export default App;
