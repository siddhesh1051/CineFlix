import React, { useEffect, useState } from "react";

import './myFavorites.css';
import { getUsersLikedMovies } from "../../store";
import FavCards from "../card/FavCard";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ChangeTitleFunction } from './../../utils/ChangeTitleFunction';

function MyFavorites(props) {

    const movies = useSelector((state) => state.netflix.movies);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const email = props.currEmail;
    ChangeTitleFunction("My Favorites | Cineflix");


    useEffect(() => {
        if(email){
            dispatch(getUsersLikedMovies(email));
        }
        else{
            toast.warning("Login to proceed", {
                    position: "top-center",
                    autoClose: 2500, 
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            navigate("/login")
        }
    
        
    }, [email]);



    return (
        <div className="movie__list">
            <h2 className="list__title">{('My Favorites').toUpperCase()}</h2>

            <div className="list__cards">

                {movies.map(movie => (

                    <>
                    {
                        movie.hasOwnProperty('original_title') 
                        ? <FavCards key={movie.id} movie={movie} currEmail={email} isMovie={true} /> 
                        : <FavCards key={movie.id} movie={movie} currEmail={email} isMovie={false} />
                    }
                    

                    
                    </>
                ))}
                
            </div>
        </div>

    )
}

export default MyFavorites