import React, { useEffect, useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminFunc(props) {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      if (props.jwt === "") {
      
        navigate ('/login');
        /*return;*/
    }
      fetch(`${process.env.REACT_APP_API_URL}/v1/movies`)
        .then((response) => {
            console.log("Status code is", response.status);
            if (response.status !== 200) {
                setError("Invalid response code: ", response.status);
            }
        return response.json();
      })
      .then((json) => {
        setMovies(json.movies);
      });
  }, [props.jwt,navigate]);
 
    
    if (error !== null) {
      return <div>Error is: {error}</div>;
    } else {
      return (
        <Fragment>
          <h2>Choose a movie</h2>
          <div className="list-group">
            {movies.map((m) => (
              <Link
                key={m.id}
                className="list-group-item list-group-item-action"
                to={`/admin/movie/${m.id}`}
              >
                {m.title}
              </Link>
            ))}
          </div>
        </Fragment>
      );
    }
  }


export default AdminFunc;