import React, { useEffect, useState } from "react"
import "./movieList.css"
import { useParams } from "react-router-dom"
import Cards from "../card/Card"
import axios from "axios"
import "react-loading-skeleton/dist/skeleton.css";
import { HashLoader } from "react-spinners";


const MovieList = () => {


    const [movieList, setMovieList] = useState([])
    const [Page, setPage] = useState(1)
    const [Loading, setLoading] = useState(true)
    const { type } = useParams()


    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getData()
        setLoading(!Loading)
    }, [type,Page])


    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    })

    const getData = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${type ? type : "now_playing"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${Page}`)
        setMovieList(res.data.results)
    }
    const handleNextClick = () => {
        setPage(Page + 1)
        setLoading(!Loading)

    }
    const handlePreviousClick = () => {
        setPage(Page - 1)
        setLoading(!Loading)
    }
    const style = { position: "absolute", top: "53%", left: "57%", transform: "translate(-50%, -50%)" };

    return (
    <>

        <div className="movie__list">
            <h2 className="list__title">{(type ? type.replace("_"," ")+ " MOVIES" : "NOW PLAYING").toUpperCase()}</h2>
            {Loading && type
                ?
                <div style={style}>
                    <HashLoader
                        color="#ff505b"
                        size={100}
                    />
                </div>
                :
                <>
                    <div className="list__cards">
                        {movieList.map(movie => (
                            <Cards movie={movie} />
                        ))}
                    </div>
                    <div className="btn__div text-center m-4 p-4 text-[#ff505b] text-xl">
                        <button onClick={handlePreviousClick} disabled={Page === 1 ? "true" : ""} className="disabled:hidden m-4"><i class="fa fa-arrow-left mr-3"></i>Previous</button>
                        <button onClick={handleNextClick} className="disabled:hidden m-4">Next<i class="fa fa-arrow-right ml-3"></i></button>

                    </div>
                    
                </>
            }

        </div>

    </>
    )
}

export default MovieList