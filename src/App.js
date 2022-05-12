import React, { Component, Fragment, useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Link, useParams} from 'react-router-dom';
import Admin from './components/Admin'
import Home from './components/Home'
import Movies from './components/Movies'
import Categories from './components/Categories';
import OneMovie from './components/OneMovie';
import OneMovieFunc from './components/OneMovieFunc';

export default function App() {
  return (
    <Router>
    <div className="container">

      <div className="row">
        <h1 className="mt-3">
          Go Watch a Movie!
        </h1>
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
                <Link to="/by-category">Categories</Link>
              </li>
              <li className="list-group-item">
              <Link to="/admin">Manage Catalogue</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="col-md-10">
          <Routes>
            <Route path="/movies/:id" element={<OneMovieFunc/>} />
            <Route path="/movies" element={<Movies/>} />
            <Route path="/by-category" element={<CategoryPage/>} >
              
           
            </Route>
            <Route path="/by-category/drama"  element={<Categories  title="Drama"/>} />
            <Route path="/by-category/comedy" element={<Categories title="Comedy"/>} />
            <Route path="/admin" element={<Admin/>} />
            <Route path="/" element={<Home/>} />
          </Routes>
        </div>
      </div>
      </div>
    </Router>
  );
}

function Movie() {
  let { id } = useParams();
 
  return <h2>Movie id {id}</h2>
}

function CategoryPage() {

  //let match = useMatch();

  return (
    <div>
      <h2>Categories</h2>

      <ul>
        <li><Link to='comedy'>Comedy</Link> </li>
       
        <li><Link to='drama'>Drama</Link> </li>
       
        
      </ul>
      
    </div>
  );
}

function CategoryComedy() {

  //let match = useMatch();

  return (
    <div>
      <h2>Comedy</h2>

    </div>
  );
}

function CategoryDrama() {

  //let match = useMatch();

  return (
    <div>
      <h2>Drama</h2>

    </div>
  );
}
