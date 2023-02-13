import React, {useEffect, useState} from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import "./card.css"
import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { IoTrash } from "react-icons/io5";
import { removeMovieFromWatchLater } from "../../store";

const Cards = (props) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true)
    const email = props.currEmail;
    const movie = props.movie;
    const isMovie = props.isMovie;



    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
        // console.log(isMovie)
    }, []) 

    return <>
    {
        isLoading
        ?
        <div className="cards">
            <SkeletonTheme baseColor="#313131" highlightColor="#525252">
                <Skeleton height={300} duration={2} />
            </SkeletonTheme>
        </div>
        :
                    
            <div className="cards">
                <img className="cards__img" src={`https://image.tmdb.org/t/p/original${movie?movie.poster_path:""}`} alt="" />
                <div className="cards__overlay">
                <button className='removeBtn' onClick={() =>
                      dispatch(
                        removeMovieFromWatchLater({ movieId: movie.id, email })
                      )
                    }><IoTrash className="trash-icon"/>
                        {/* <i className="fa fa-trash"></i> */}
                </button>

            <Link to={`/${isMovie ? "movie" : "tv"}/${movie.id}`} style={{textDecoration:"none", color:"white"}}>
                <div className="clickable mt-12"  >
                 <div className="card__title">{
                        isMovie?movie.original_title:movie.name
                 }</div>
                 <div className="card__runtime">
                        {isMovie?movie.release_date:movie.first_air_date}
                        <span className="card__rating">{movie?movie.vote_average:""}<i className="fas fa-star" /></span>
                    </div>
                    <div className="card__description">{movie ? movie.overview.slice(5,118) + "...": ""}</div>
                </div>
                    </Link>
                </div>
            </div>
    }
    </>
}

export default Cards