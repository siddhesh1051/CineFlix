import React, {useEffect, useState} from "react"
import "./movieList.css"
import { useParams } from "react-router-dom"
import Cards from "../card/Card"
import axios from "axios"
import "react-loading-skeleton/dist/skeleton.css";


const MovieList = () => {
    
    const [movieList, setMovieList] = useState([])
    const {type} = useParams()
    

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getData()
    }, [type])

    const getData = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${type ? type : "now_playing"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        setMovieList(res.data.results)
    }
    

    return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "NOW PLAYING").toUpperCase()}</h2>
            <div className="list__cards">
                {
                    movieList.map(movie => (
                        <Cards movie={movie} />
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList