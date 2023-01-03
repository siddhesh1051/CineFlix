import React, { useEffect, useState } from "react";
import "../MovieDetail/movie.css"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BsArrowLeftCircle } from "react-icons/bs";
import { PropagateLoader } from "react-spinners";



const ShowSimilarMovie = () => {

    const [Similar, setSimilar] = useState();
    const [Loading, setLoading] = useState(true)
    const { id } = useParams();




    useEffect(() => {
        getSimilar();

    }, []);

    const getSimilar = async () => {
        const res = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}/similar?api_key=62502f0d2b544611def60f0137ff80c5&language=en-US`
        )
        setSimilar(res.data)
    };
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1200)
    }, [])
    const style = { position: "absolute", top: "53%", left: "57%", transform: "translate(-50%, -50%)" }



    return (
        <>
            {Loading
                ?
                <div style={style}>
                    <PropagateLoader
                        color="#ec616a"
                        size={20}
                    />
                </div>
                :
                <div className="similar lg:mx-2  mx-[4.75rem]">
                    <Link to={`/movie/${id}`} className="back__similar "><BsArrowLeftCircle className=" scale-[3] duration-300 ease-in-out hover:text-[#ff505b]" /></Link>

                    <div className="similar_rowX">
                        <div className="similar_title">

                            <h3 className="sim">Similar</h3>
                        </div>
                        {Similar &&
                            Similar.results &&
                            Similar.results.map((hero) => (
                                <>
                                    {hero.poster_path && (
                                        <div className="cards mx-10">

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


                    </div>
                </div>
            }

        </>
    );
};

export default ShowSimilarMovie;


