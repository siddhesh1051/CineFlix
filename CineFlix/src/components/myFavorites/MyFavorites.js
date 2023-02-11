import axios from "axios";
import React, { useEffect, useState } from "react";
import './myFavorites.css';
import { useNavigate } from "react-router-dom";
import { getUsersLikedMovies } from "../../store";
import Cards from "../card/Card";
import { useDispatch, useSelector } from "react-redux";

function MyFavorites(props) {

    const movies = useSelector((state) => state.netflix.movies);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const email = props.currEmail;


    useEffect(() => {
        if (email) {
            dispatch(getUsersLikedMovies(email));
        }
    }, [email]);



    return (
        <div className="movie__list">
            <h2 className="list__title">{('My Favorites').toUpperCase()}</h2>

            <div className="list__cards">

                {movies.map(movie => (

                    <Cards key={movie.id} movie={movie} />
                ))}
            </div>
        </div>

    )
}

export default MyFavorites