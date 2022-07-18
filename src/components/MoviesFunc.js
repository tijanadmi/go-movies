import React, {  Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

export default function MoviesFunc() {
   let [movies,setMovies]=useState([])
   const [error, setError]= useState(null)
   
      
   useEffect(() => {
    console.log("url is", `${process.env.REACT_APP_API_URL}/v1/movies`);
            fetch(`${process.env.REACT_APP_API_URL}/v1/movies`)
                .then((response) => {
                    console.log("Status code is", response.status);
                    if (response.status !== 200) {
                      setError("Invalid response code: ", response.status);
                    } else{
                        setError(null);
                    }
                    return response.json();
                  })
                .then((json) => {
                    setMovies(json.movies);
                });
        }, []);
    
        
        if (error) {
            return <div>Error: {error.message}</div>
          } else {
            return (
                <Fragment>
                <h2>Choose a movie</h2>
                <div className="list-group">
                    {movies.map( (m) => (
                            <Link
                            key={m.id}
                            className="list-group-item list-group-item-action"
                            to={`/movies/${m.id}`}>{m.title}
                            </Link>
                    ))}
                  </div>
                </Fragment>
             )
        }

    }
