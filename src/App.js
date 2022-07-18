import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Admin from './components/Admin'
import Home from './components/Home'
import Movies from './components/Movies'
import Genres from './components/Genres';
import OneMovieFunc from './components/OneMovieFunc';
import OneGenreFunc from './components/OneGenreFunc';
import EditMovieFunc from './components/EditMovieFunc';
import Login from "./components/Login";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jwt: "",
    };
    this.handleJWTChange(this.handleJWTChange.bind(this));
  }

  handleJWTChange = (jwt) => {
    this.setState({ jwt: jwt });
  };

  logout = () => {
    this.setState({ jwt: "" });
  };
  render() {
    let loginLink;
    if (this.state.jwt === "") {
      loginLink = <Link to="/login">Login</Link>;
    } else {
      loginLink = (
        <Link to="/logout" onClick={this.logout}>
          Logout
        </Link>
      );
    }

  return (
    <Router>
    <div className="container">
      <div className="row">
        <div className="col mt-3">
          <h1 className="mt-3">Go Watch a Movie!</h1>
        </div>
        <div className="col mt-3 text-end">{loginLink}</div>
        <hr className="mb-3"></hr>
      </div>

      <div className="row">
        <div className="col-md-2">
          <nav>
            <ul className="list-group">
              <li className="list-group-item">
                <Link to="/">Home</Link>
              </li>
              <li className="list-group-item">
                <Link to="/movies">Movies</Link>
              </li>
              <li className="list-group-item">
                <Link to="/genres">Genres</Link>
              </li>
              {this.state.jwt !== "" && (
                <Fragment>
              <li className="list-group-item">
                <Link to="/admin/movie/0">Add Movie</Link>
              </li>
              <li className="list-group-item">
              <Link to="/admin">Manage Catalogue</Link>
              </li>
              </Fragment>
                  )}
            </ul>
          </nav>
        </div>

        <div className="col-md-10">
          <Routes>
            <Route path="/movies/:id" element={<OneMovieFunc/>} />
            <Route path="/movies" element={<Movies/>} />
            <Route path="/genre/:genre_id" element={<OneGenreFunc/>} />
            <Route exact path="/login" 
              render={(props) => 
              <Login {...props} handleJWTChange={this.handleJWTChange} />} />
            <Route path="/genres" element={<Genres/>} />
            <Route path="/admin/movie/:id" element={<EditMovieFunc/>} />
            <Route path="/admin" element={<Admin/>} />
            
            <Route path="/" element={<Home/>} />
          </Routes>
        </div>
      </div>
      </div>
    </Router>
  );
}
}