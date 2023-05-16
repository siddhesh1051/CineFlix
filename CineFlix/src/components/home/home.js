import React, { useEffect, useState } from "react"
import "./home.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import MovieList from "../movieList/MovieList";
import axios from "axios";
import "react-loading-skeleton/dist/skeleton.css";

const Home = () => {

    const [popular, setpopular] = useState([])

    const getApiData = async () =>{
        const res = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=1");
        setpopular(res.data.results)
    }

    useEffect(() => {
       
        getApiData();
    }, [])

    return (
        <>
            <div className="poster">
            {popular.length > 0 &&
                <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    interval={3500}
                    infiniteLoop={true}
                    swipeable={true}
                    stopOnHover={true}
                    dynamicHeight={false}
                    
                    


                >
                    {
                        popular.map(movie => (
                            <Link key={movie.id} style={{ textDecoration: "none", color: "white" }} to={`/movie/${movie.id}`} >
                                <div className="posterImage">
                                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt=""/>
                                </div>
                                <div className="posterImage__overlay">
                                    <div className="posterImage__title">{movie ? movie.original_title : ""}</div>
                                    <div className="posterImage__runtime">
                                        {movie ? movie.release_date : ""}
                                        <span className="posterImage__rating">
                                            {movie ? movie.vote_average : ""}
                                            <i className="fas fa-star" />{" "}
                                        </span>
                                    </div>
                                    <div className="posterImage__description">{movie ? movie.overview.slice(0,140) + "....." : ""}</div>
                                </div>
                            </Link>
                        ))
                    }
                </Carousel>
}
                <MovieList />
            </div>
        </>
    )
}

export default Home