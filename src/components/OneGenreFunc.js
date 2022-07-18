import React,  {useEffect, useState,  Fragment} from 'react'
import { useParams} from 'react-router-dom';
import { Link } from 'react-router-dom'

function OneMovieFunc(props){
    let [movies, setMovies] = useState([]);
    const { genre_id } = useParams();
    const [error,setError]=useState(null);
    let [genreName, setGenreName] = useState("");
    
    
    
    
useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/v1/movies/` + genre_id)
    .then((response) => {
    if (response.status !== 200) {
        setError("Invalid response: ", response.status);
    } else {
        setError(null);
    }
        return response.json();
    })
    .then((json) => {
        setGenreName(props.genre_name);
        setMovies(json.movies);
        });
    }, [genre_id, props.genre_name]);

    /*console.log(location);*/

    if (!movies) {
      movies = [];
    }

    if (error !== null) {
      return <div>Error: {error.message}</div>;
    } else {
    return (
        <Fragment>
        <h2>Genre: {genreName}</h2>
        <div className="list-group">
                {movies.map( (m) => (
                   
                    <Link 
                        key={m.id} 
                        to={`/movies/${m.id}`} 
                        className="list-group-item list-group-item-action">
                        {m.title}</Link>
                   
                ))}
        </div>
        </Fragment>
    );
    }
}



export default OneMovieFunc;