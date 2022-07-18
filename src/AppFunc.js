import React, { Fragment, useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import AdminFunc from './components/AdminFunc'
import Home from './components/Home'
import MoviesFunc from './components/MoviesFunc'
import GenresFunc from './components/GenresFunc';
import OneMovieFunc from './components/OneMovieFunc';
import OneMovieGraphQLFunc from './components/OneMovieGraphQLFunc';
import OneGenreFunc from './components/OneGenreFunc';
import EditMovieFunc from './components/EditMovieFunc';
import LoginFun from "./components/LoginFun";
import GraphQL from "./components/GraphQL";


export default function AppFunc(props)  {
    const [jwt, setJwt] = useState("");
    let [jwtCookie,setJwtCookie] = useState("")
    

    useEffect(() => {
        let t1 = window.localStorage.getItem("jwt");
        console.log(t1)
        if (t1) {
        if (jwt === "") {
            console.log("jwt is not empty")
            setJwt(JSON.parse(t1));
            console.log(jwt)
      }
      console.log(jwt)
    }
        setJwtCookie(getCookie("jwt"))
        if (jwtCookie) {
            // there is a cookie, but check to see if the user is not already logged in
            if (jwt === "") {
                setJwt(JSON.parse(jwtCookie));
            }
        }
        let t = window.localStorage.getItem("jwt");
        if (t) {
            if (jwt === "") {
                setJwt(JSON.parse(t));
            }
        }
        handleJWTChange(jwt)
    }, [jwt,jwtCookie])

    // get cookie returns the cookie value if it exists, or null if it's empty
function getCookie(name) {
    let dc = document.cookie;
    let end = 0;
    let prefix = name + "=";
    let begin = dc.indexOf("; " + prefix);
    if (begin === -1) {
        begin = dc.indexOf(prefix);
        if (begin !== 0) return null;
    } else {
        begin += 2;
        end = document.cookie.indexOf(";", begin);
        if (end === -1) {
            end = dc.length;
        }
    }
    return decodeURI(dc.substring(begin + prefix.length, end));
}

    function handleJWTChange(jwt)  {
        setJwt(jwt);
    };

    function logout() {
        setJwt("");
        window.localStorage.removeItem("jwt");
        
    };

    let loginLink;
    if (jwt === "") {
        loginLink = <Link to="/login">Login</Link>;
    } else {
        loginLink = (
            <Link to="/logout" onClick={logout}>
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
              {jwt !== "" && (
                <Fragment>
              <li className="list-group-item">
                <Link to="/admin/movie/0">Add Movie</Link>
              </li>
              <li className="list-group-item">
              <Link to="/admin">Manage Catalogue</Link>
              </li>
              </Fragment>
                  )}
              <li className="list-group-item">
                  <Link to="/graphql">GraphQL</Link>
                </li>
            </ul>
            <pre>{JSON.stringify(jwt, null, 3)}</pre>
          </nav>
        </div>

        <div className="col-md-10">
          <Routes>
            <Route path="/movies/:id" element={<OneMovieFunc/>} />
            <Route path="/moviesgraphql/:id" element={<OneMovieGraphQLFunc/>} />
            <Route path="/movies" element={<MoviesFunc/>} />
            <Route path="/genre/:genre_id" element={<OneGenreFunc/>} />
            <Route 
                exact 
                path="/login" 
                element={
              <LoginFun  handleJWTChange={handleJWTChange} />} 
              />
            <Route path="/genres" element={<GenresFunc/>} />
            <Route exact path="/graphql"
            element={<GraphQL />}/>
            <Route path="/admin/movie/:id" element={<EditMovieFunc jwt={jwt}/>} />

            <Route path="/admin" element={<AdminFunc jwt={jwt}/>} />
            
            <Route path="/" element={<Home/>} />
          </Routes>
        </div>
      </div>
      </div>
    </Router>
  );
}
