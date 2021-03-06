import React,  {useEffect, useState,  Fragment} from 'react'
import { useParams} from 'react-router-dom';

function OneMovieGraphQLFun(props){
   
    const { id } = useParams();

    const [movie,setMovie]=useState({});
    
    
    
/*useEffect(()=>{
    setMovie({
        id: id ,
        title: "Some movie",
        runtime: 150,
    })
},[id]);*/
useEffect(() => {
    setMovie({
        id: id ,
        title: "Some movie",
        runtime: 150,
        year:"",
        description:"",
        release_date:"",
        rating:"",
        mpaa_rating:"",
        poster:"",
    })
    const payload = `
        {
            movie(id: ${ id }) {
                id
                title
                runtime
                year
                description
                release_date
                rating
                mpaa_rating
                poster
            }
        }
        `

    const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "POST",
            body: payload,
            headers: myHeaders,
        }

        fetch("http://localhost:4000/v1/graphql", requestOptions)
        .then((response) => response.json())
        .then((data) => {
            setMovie(data.data.movie);
            console.log("After search")
        });
}, [id]);

if (movie.genres) {
    movie.genres = Object.values(movie.genres);
} else {
    movie.genres = [];
}

    return (
        
        <Fragment>
            <h2>Movie: {movie.title} ({movie.year})</h2>
            <div>
                <img src={`http://image.tmdb.org/t/p/w200${movie.poster}`} alt="poster"/>
            </div>

            <div className="float-start">
                <small>Rating: {movie.mpaa_rating}</small>
            </div>
            <div className="float-end">
                {movie.genres.map((m, index) =>(
                    <span className="badge bg-secondary me-1" key={index}>
                        {m}
                    </span>
                ))}
            </div>
            <div className="clearfix"></div>

            <hr />

            <table className="table table-compact table-striped">
                <thead></thead>
                <tbody>
                    <tr>
                        <td><strong>Title:</strong></td>
                        <td>{movie.title}</td>
                    </tr>
                    <tr>
                        <td><strong>Description:</strong></td>
                        <td>{movie.description}</td>
                    </tr>
                    <tr>
                        <td><strong>Run time:</strong></td>
                        <td>{movie.runtime} minutes</td>
                    </tr>
                </tbody>
            </table>
        </Fragment>
    );
    }




export default OneMovieGraphQLFun;