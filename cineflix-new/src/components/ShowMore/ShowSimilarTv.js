import React, { useEffect, useState} from "react";
import "../MovieDetail/movie.css"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BsArrowLeftCircle} from "react-icons/bs";



const ShowSimilarTv = () => {

    const [Similar, setSimilar] = useState();
    const { id } = useParams();
  

    

    useEffect(() => {
        getSimilar();
        
    }, []);

    const getSimilar = async () => {
        const res = await axios.get(
            `https://api.themoviedb.org/3/tv/${id}/similar?api_key=62502f0d2b544611def60f0137ff80c5&language=en-US`
        )
            setSimilar(res.data)
    };

    

   

    return (
       

            <div className="similar">
                  <Link to={`/tv/${id}`} className="back__similar "><BsArrowLeftCircle className=" scale-[3] duration-300 ease-in-out hover:text-[#ff505b]"/></Link>

                <div className="similar_row">
                    <div className="similar_title">

                        <h3 className="sim">Similar</h3>
                    </div>
                    {Similar &&
                        Similar.results &&
                        Similar.results.map((hero) => (
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
                                        <Link to={`/tv/${hero.id}?api_key=62502f0d2b544611def60f0137ff80c5&language=en-US`} target='_blank' style={{ textDecoration: "none", color: "white" }}>
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

                    
                </div>
            </div>


        
    );
};

export default ShowSimilarTv;


