import React, { useEffect, useState } from "react";
import "../MovieDetail/movie.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PropagateLoader } from "react-spinners";




const ShowCastTv = () => {

    const [Cast, setCast] = useState();
    const { id } = useParams();
    const [Loading, setLoading] = useState(true)





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
        <div className="movie">

            <div className="movie__detail">

                <div className="cast_div">

                    <div className="movie_cast">
                        <h2 className="casttitle" >Cast & Crew</h2>
                        {Cast &&
                            Cast.cast &&
                            Cast.cast.map((hero) => (
                                <>
                                    {hero.profile_path && (
                                        <div className="cast_image_div">

                                            <img
                                                className="new_image rounded-lg w-28 my-6 "
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


                    </div>
                </div>
            </div>



        </div>
        }
        </>
    );
};

export default ShowCastTv;


