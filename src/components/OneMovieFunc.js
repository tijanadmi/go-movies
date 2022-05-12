import React,  {useEffect, useState,  Fragment} from 'react'
import { useParams} from 'react-router-dom';

function OneMovieFunc(props){

    const { id } = useParams();
    const [movie,setMovie]=useState({});
    const [error,setError]=useState(null);
    
    
useEffect(()=>{
    setMovie({
        id: id ,
        title: "Some movie",
        runtime: 150,
    })
},[id]);

    return (
        <Fragment>
            <h2>Movie: {movie.title} {movie.id}</h2>

            <table className="table table-compact table-striped">
                <thead></thead>
                <tbody>
                    <tr>
                        <td><strong>Title:</strong></td>
                        <td>{movie.title}</td>
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

export default OneMovieFunc;