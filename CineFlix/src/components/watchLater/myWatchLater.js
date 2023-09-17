import React, { useEffect, useState } from "react";

import './myWatchLater.css';
import WatchLater from "../card/WatchLaterCard";
import { useDispatch, useSelector } from "react-redux";
import { getUsersWatchLaterMovies } from "../../store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function MyWatchLaterMovies(props) {

    const watchLater = useSelector((state) => state.netflix.watchLater);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const email = props.currEmail;


    useEffect(() => {
        if(email){
            dispatch(getUsersWatchLaterMovies(email));
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
            <h2 className="list__title">{('Watch Later').toUpperCase()}</h2>

            <div className="list__cards">

                {watchLater.map(movie => (

                    <>
                    {
                        movie.hasOwnProperty('original_title') 
                        ? <WatchLater key={movie.id} movie={movie} currEmail={email} isMovie={true} /> 
                        : <WatchLater key={movie.id} movie={movie} currEmail={email} isMovie={false} />
                    }
                    

                    
                    </>
                ))}
                
            </div>
        </div>

    )
}

export default MyWatchLaterMovies