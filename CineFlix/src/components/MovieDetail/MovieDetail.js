import React, { useEffect, useState } from "react";
import "./movie.css";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { HashLoader } from "react-spinners";
import { removeMovieFromLiked } from "../../store";
import { removeMovieFromWatchLater } from "../../store";
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';



const MovieDetail = (props) => {
    const [currentMovieDetail, setMovie] = useState();
    const [Cast, setCast] = useState();
    const [Similar, setSimilar] = useState();
    const [Videos, setVideos] = useState();
    const [isActive, setIsActive] = useState(false);
    const [isWatchActive, setisWatchActive] = useState(false);
    const [Loading, setLoading] = useState(true)
    const { id } = useParams();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    const email = props.currEmail;

    const navigate = useNavigate();



    useEffect(() => {
        getData();

    }, []);

    useEffect(() => {
        getData();

        checkLiked();
        checkWatchLater();

    }, [email, isActive, isWatchActive]);




    const addToList = async () => {
        try {
            await axios.post(process.env.REACT_APP_API + "/addFav", {
                email,
                data: currentMovieDetail,
                token: token
            }).then(function (res) {
                checkLiked();
                toast.success('Added to My Favorites', {
                    position: "bottom-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            });


            //   setIsActive(!isActive);

        } catch (error) {
            // console.log(error);


            if (error.response.status === 401) {
                localStorage.removeItem("token");
                navigate('/login')
                toast.warning(error.response.data.msg, {
                    position: "bottom-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
            else {
                toast.error(error, {
                    position: "bottom-center",
                    autoClose: 2500
                })
            }




        }
    };


    const checkLiked = async () => {
        try {
            await axios.post(process.env.REACT_APP_API + "/checkLiked", {
                email,
                data: currentMovieDetail,
                // token: token
            })
                .then(res => {
                    setIsActive(res.data.movieAlreadyLiked)
                    console.log("checkliked " + isActive);
                });


        } catch (error) {
            console.log(error);
        }
    };
    const checkWatchLater = async () => {
        try {
            await axios.post(process.env.REACT_APP_API + "/checkWatchLater", {
                email,
                data: currentMovieDetail,
                // token: token
            })
                .then(res => {
                    setisWatchActive(res.data.movieAlreadyLiked)
                    console.log("checkwatchlater " + isWatchActive);
                });


        } catch (error) {
            console.log(error);
        }
    };

    const addToWatchLater = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_API + "/addWatchLater", {
                email,
                data: currentMovieDetail,
                token: token,
            });
            console.log(response.data); // Handle the response data here
            await checkWatchLater();

            toast.success("Added to Watch Later", {
                position: "bottom-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
                toast.warning(error.response.data.msg, {
                    position: "bottom-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else {
                console.error(error);
                toast.error("An error occurred", {
                    position: "bottom-center",
                    autoClose: 2500,
                });
            }
        }
    };





    const getData = async () => {
        const res = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
        )
        setMovie(res.data)
        console.log(currentMovieDetail)

    };

    useEffect(() => {
        getCast();

    }, []);

    const getCast = async () => {
        const res = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
        )
        setCast(res.data)
    };
    useEffect(() => {
        getSimilar();

    }, []);

    const getSimilar = async () => {
        const res = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}/similar?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
        )
        setSimilar(res.data)
    };

    useEffect(() => {
        getVideos();

    }, []);

    const getVideos = async () => {
        const res = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
        )
        setVideos(res.data)
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])
    const style = { position: "absolute", top: "53%", left: "57%", transform: "translate(-50%, -50%)" };

    return (
        <>
            {Loading
                ?
                <div style={style}>
                    <HashLoader
                        color="#ff505b"
                        size={100}
                    />
                </div>
                :


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
                                    <div className="date">{currentMovieDetail ? currentMovieDetail.release_date : ""}</div>
                                </div>

                                <div className="showcast">
                                    <Link to={`/movie/${id}/credits`} className="show_more lg:invisible visible ">Show Cast<i className="fa fa-arrow-right"></i></Link>

                                </div>
                            </div>


                        </div>
                        <div className="movie__detailRight">
                            <div className="movie__detailRightTop">
                                <div className="movie__name">
                                    {currentMovieDetail ? currentMovieDetail.original_title : ""}
                                </div>
                                <div className="movie__tagline">
                                    {currentMovieDetail ? currentMovieDetail.tagline : ""}
                                </div>

                                <div className="tailer_button_link">



                                    {(
                                        <div className="trailer&btn">

                                            <a href={`https://multiembed.mov/?video_id=${id}&tmdb=1`} style={{ textDecoration: "none", color: "white" }} className="trailerbtn" target='_blank'>
                                                Watch Now<i className="fa fa-play"></i>
                                            </a>
                                            {!isWatchActive
                                                ? <button className='bookmarkbtn' onClick={addToWatchLater}>
                                                    <i className="fa fa-bookmark"></i>
                                                </button>
                                                : <button className='bookmarkbtn_clicked' onClick={() =>
                                                    dispatch(
                                                        removeMovieFromWatchLater({ movieId: currentMovieDetail.id, email })

                                                    )
                                                    && setisWatchActive(!isWatchActive)

                                                }>
                                                    <i className="fa fa-bookmark"></i>
                                                </button>}

                                            {!isActive
                                                ? <button className='sharebtn' onClick={addToList}>
                                                    <i className="fa fa-heart"></i>
                                                </button>
                                                : <button className='sharebtn_clicked' onClick={() =>
                                                    dispatch(
                                                        removeMovieFromLiked({ movieId: currentMovieDetail.id, email })

                                                    )
                                                    && setIsActive(!isActive)

                                                }>
                                                    <i className="fa fa-heart"></i>
                                                </button>}
                                        </div>
                                    )}






                                </div>

                                {/* kmf
dmsfds/ */}


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
                                                    <span key={genre.id} className="movie__genre" id={genre.id}>
                                                        {genre.name}
                                                    </span>
                                                </>
                                            ))
                                            : ""}
                                    </div>
                                </div>

                                <hr color="#2F3335" />

                                <div className="duration">
                                    <p className="durationtitle">Duration</p>
                                    <div className="movie__duration">
                                        {currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}
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
                                                <div key={hero.id} className="cast_image_div">

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

                                <Link to={`/movie/${id}/credits`} className="show_more">Show More<i className="fa fa-arrow-right"></i></Link>
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
                                Similar.results.slice(0, 5).map((hero) => (
                                    <>
                                        {hero.poster_path && (
                                            <div key={hero.id} className="cards">

                                                <img
                                                    className="cards__img"
                                                    src={
                                                        "https://image.tmdb.org/t/p/original" +
                                                        hero.poster_path
                                                    }
                                                    alt=""
                                                />


                                                <Link to={`/movie/${hero.id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`} target='_blank' style={{ textDecoration: "none", color: "white" }}>
                                                    <div className="cards__overlay">
                                                        <div className="cast_details">
                                                            <span className="card__title">{hero.original_title}</span>
                                                            <div className="card__runtime">
                                                                {hero ? hero.release_date : ""}
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

                            <Link to={`/movie/${id}/similar`} className="show_more">Show More<i className="fa fa-arrow-right"></i></Link>

                        </div>
                    </div>

                </div>
            }
            {/* <Favorite userFrom={userFrom} movieId={id} currentMovieDetail={currentMovieDetail} /> */}
        </>
    );
};

export default MovieDetail;
