import React, { useEffect, useState } from "react"
import "../movieList/movieList.css"
import { useParams } from "react-router-dom"
import Cards from "../card/Card"
import axios from "axios"
import "react-loading-skeleton/dist/skeleton.css";
import { FiSearch } from "react-icons/fi"


const MovieList = () => {

    const [movieList, setMovieList] = useState([])
    const [searchText, setsearchText] = useState("")



    useEffect(() => {
        getData()
    }, [searchText])


    const getData = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=62502f0d2b544611def60f0137ff80c5&language=en-US&query=${searchText}&page=1&include_adult=false`)
        setMovieList(res.data.results)
    }

    const handleOnChange1 = (event) => {
        setsearchText(event.target.value)
        console.log(searchText);
    }


    return (
        <div className="movie__list w-full text-center ">




            <input type="text" className="SearchBar w-[80%] p-4 m-5 relative rounded-md text-black" placeholder="Enter Movie Name" value={searchText} onChange={handleOnChange1} />

            <div className="list__cards">
                {
                    movieList.map(movie => (
                        <Cards movie={movie} />
                    ))
                }
            </div>

            <div className="erroe absolute left-[50%] top-[50%] text-[#454F51]">
                {!searchText && (<h2 className=" ">Enter Something</h2>)}

                {searchText &&
                    !movieList &&
                    (<h2>No Movies Found</h2>)}
            </div>



        </div>
    )
}

export default MovieList