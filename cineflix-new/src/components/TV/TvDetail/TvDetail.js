import React, { useEffect, useState} from "react";
import "./TvDetail.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";


const TvDetail = () => {
    const [currentMovieDetail, setMovie] = useState();
    const [Cast, setCast] = useState();
    const [Similar, setSimilar] = useState();
    const [Videos, setVideos] = useState();
    const { id } = useParams();
  

    // Initial Useeffect
    useEffect(() => {
        getData();
        
    }, []);

    const getData = async () => {
        const res = await axios.get(
            `https://api.themoviedb.org/3/tv/${id}?api_key=62502f0d2b544611def60f0137ff80c5&language=en-US`
        )
            setMovie(res.data)
    };

    useEffect(() => {
        getCast();
        
    }, []);

    const getCast = async () => {
        const res = await axios.get(
            `https://api.themoviedb.org/3/tv/${id}/credits?api_key=62502f0d2b544611def60f0137ff80c5&language=en-US`
        )
            setCast(res.data)
    };
    useEffect(() => {
        getSimilar();
        
    }, []);

    const getSimilar = async () => {
        const res = await axios.get(
            `https://api.themoviedb.org/3/tv/${id}/similar?api_key=62502f0d2b544611def60f0137ff80c5&language=en-US`
        )
            setSimilar(res.data)
    };

    useEffect(() => {
        getVideos();
        
    }, []);

    const getVideos = async () => {
        const res = await axios.get(
            `https://api.themoviedb.org/3/tv/${id}/videos?api_key=62502f0d2b544611def60f0137ff80c5&language=en-US`
        )
            setVideos(res.data)
    };

    return (
        <div className="movie">
            <div className="movie__intro">
                <img
                    className="movie__backdrop"
                    src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""
                        }`}
                    alt=""
                />
                <div className="img_overlay"></div>
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img
                            className="movie__poster"
                            src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""
                                }`}
                            alt=""
                        />
                    </div>
                    <div className="movie_rating">
                        <div className="rating">
                            <span className="rate">{currentMovieDetail ? Math.round(currentMovieDetail.vote_average * 10) / 10 : ""} </span>
                        </div>

                        <p className="movie_voteCount">{currentMovieDetail ? currentMovieDetail.vote_count + " votes" : ""}</p>
                        <br />
                        <div className="movie_date">
                            <p>Release date :</p>
                            <div className="date">{currentMovieDetail ? currentMovieDetail.first_air_date : ""}</div>
                        </div>

                    </div>

                   
                </div>

                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">
                            {currentMovieDetail ? currentMovieDetail.name : ""}
                        </div>
                        <div className="movie__tagline">
                            {currentMovieDetail ? currentMovieDetail.tagline : ""}
                        </div>

                        <div className="tailer_button_link">

                            {Videos &&
                                Videos.results &&
                                Videos.results.slice(0, 1).map((hero) => (
                                    <>
                                        {hero.key && (
                                            <div className="trailer&btn">

                                                <a href={hero.key?`https://www.youtube.com/watch?v=${hero.key}`:""} target='_blank' style={{ textDecoration: "none", color: "white" }} className="trailerbtn">
                                                    Watch Trailer<i class="fa fa-play"></i>
                                                </a>
                                                <button className="bookmarkbtn">
                                                    <i class="fa fa-bookmark"></i>
                                                </button>

                                                <button className="sharebtn">
                                                    <i class="fa fa-heart"></i>
                                                </button>
                                            </div>
                                        )}
                                    </>
                                ))}


                        </div>



                        <div className="overviewDiv">
                            <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                        </div>


                    </div>

                    <div className="details">
                        <h2>Details</h2>
                        <div className="genres">
                            <p className="genres_title">Genres</p>
                            <div className="movie__genres">
                                {currentMovieDetail && currentMovieDetail.genres
                                    ? currentMovieDetail.genres.slice(0, 2).map((genre) => (
                                        <>
                                            <span className="movie__genre" id={genre.id}>
                                                {genre.name}
                                            </span>
                                        </>
                                    ))
                                    : ""}
                            </div>
                        </div>

                        <hr color="#2F3335" />

                        <div className="duration">
                            <p className="durationtitle">Total Seasons</p>
                            <div className="movie__duration">
                                {currentMovieDetail ? currentMovieDetail.number_of_seasons + "  Seasons":  ""} 
                            </div>
                        </div>

                        <hr color="#2F3335" />

                        <div className="duration">
                            <p className="durationtitle">Total Episodes</p>
                            <div className="movie__duration">
                                {currentMovieDetail ? currentMovieDetail.number_of_episodes + "  Episodes": ""}
                            </div>
                        </div>
                        
                        <hr color="#2F3335" />

                        <div className="duration">
                            <p className="durationtitle">Status</p>
                            <div className="movie_status">
                                {currentMovieDetail ? currentMovieDetail.status : ""}
                            </div>
                        </div>
                        <hr color="#2F3335" />                
                        
                    </div>

                </div>


                <div className="cast_div">

                    <div className="movie_cast">
                    <h2 className="casttitle" >Cast & Crew</h2>
                        {Cast &&
                            Cast.cast &&
                            Cast.cast.slice(0, 4).map((hero) => (
                                <>
                                
                                    {hero.profile_path && (
                                        
                                        <div className="cast_image_div">
                                            
                                            
                                                <img
                                                    className="cast_image"
                                                    src={
                                                        "https://image.tmdb.org/t/p/original" +
                                                        hero.profile_path
                                                    }
                                                    alt=""
                                                />
                                            
                                            <div className="cast_details">
                                                <span className="cast_name">{hero.name}</span>
                                                <span className="cast_role">
                                                    {"  as  " + hero.character}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ))}

                        <p className="show_more">Show More<i class="fa fa-arrow-right"></i></p>
                    </div>
                </div>
            </div>

            <div className="similar">

                <div className="similar_row">
                    <div className="similar_title">

                        <h3 className="sim">Similar</h3>
                    </div>
                    {Similar &&
                        Similar.results &&
                        Similar.results.slice(0, 6).map((hero) => (
                            <>
                                {hero.poster_path && (
                                    <div className="cards">

                                        <img
                                            className="cards__img"
                                            src={
                                                "https://image.tmdb.org/t/p/original" +
                                                hero.poster_path
                                            }
                                            alt=""
                                        />
                                        <Link to={`/movie/${hero.id}?api_key=62502f0d2b544611def60f0137ff80c5&language=en-US`} target='_blank' style={{ textDecoration: "none", color: "white" }}>
                                            <div className="cards__overlay">
                                                <div className="cast_details">
                                                    <span className="card__title">{hero.name}</span>
                                                    <div className="card__runtime">
                                                        {hero ? hero.first_air_date : ""}
                                                        <span className="card__rating">{hero ? hero.vote_average : ""}<i className="fas fa-star" /></span>
                                                    </div>
                                                    <div className="card__description">{hero ? hero.overview.slice(0, 118) + "..." : ""}</div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )}
                            </>
                        ))}

<Link to={`/tv/${id}/similar`} className="show_more">Show More<i class="fa fa-arrow-right"></i></Link>                </div>
            </div>


        </div>
    );
};

export default TvDetail;
