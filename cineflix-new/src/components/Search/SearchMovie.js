import React, { useEffect, useState } from "react"
import "../movieList/movieList.css"
import { useParams } from "react-router-dom"
import Cards from "../card/Card"
import axios from "axios"
import "react-loading-skeleton/dist/skeleton.css";
import { FiSearch } from "react-icons/fi"


const SearchMovie = () => {

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
    }


    return (
        <div className="movie__list w-full">
            <div className="search__bar__div w-full text-center">

                <h2 className="m-4">Search Movies</h2>
                <div className="text-center flex w-full justify-center mt-5 mb-9">

                    <div className="w-[50%] text-center px-5 py-4 flex items-center bg-[#292929] rounded-2xl justify-center drop-shadow-2xl" >
                        <FiSearch className="searchIcon text-[#ff505b] mr-4" />
                        <input type="text" className="SearchBar text-xl bg-[#292929] text-slate-300 flex-1 duration-500 outline-none focus:outline-none placeholder:text-[#454F51]" placeholder="Enter Movie Name" value={searchText} onChange={handleOnChange1} />

                    </div>
                </div>
            </div>



            <div className="list__cards">
                {
                    movieList.map(movie => (
                        <Cards movie={movie} />
                    ))
                }
            </div>

            <div className="error absolute left-[50%] top-[50%] text-[#454F51]">
                {!searchText && (<h2 className=" ">Enter Something</h2>)}
            </div>



        </div>
    )
}

export default SearchMovie