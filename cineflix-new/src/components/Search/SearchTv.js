import React, { useEffect, useState } from "react"
import "../movieList/movieList.css"
import Cards from "../card/Card"
import axios from "axios"
import "react-loading-skeleton/dist/skeleton.css";
import { FiSearch } from "react-icons/fi"
import { HashLoader } from "react-spinners";


const SearchMovie = () => {

    const [movieList, setMovieList] = useState([])
    const [searchText, setsearchText] = useState("")
    const [Page, setPage] = useState(1)
    const [Loading, setLoading] = useState(true)



    useEffect(() => {
        getData()
    }, [searchText, Page])

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    })


    const getData = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=62502f0d2b544611def60f0137ff80c5&language=en-US&query=${searchText}&page=${Page}&include_adult=false`)
        setMovieList(res.data.results)

    }

    const handleOnChange1 = (event) => {
        setsearchText(event.target.value)
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
    return <>

        <div className="movie__list w-full">
            <div className="search__bar__div w-full text-center">

                <h2 className="m-4">Search TV Shows</h2>
                <div className="text-center flex w-full justify-center mt-5 mb-9">

                    <div className="md:w-[70%] w-[100%] text-center px-5 py-4 flex items-center bg-[#292929] rounded-2xl justify-center drop-shadow-2xl" >
                        <FiSearch className="searchIcon text-[#ff505b] mr-4" />
                        <input type="text" className="SearchBar text-xl bg-[#292929] text-slate-300 w-[60%] flex-1 duration-500 outline-none focus:outline-none placeholder:text-[#454F51]" placeholder="Enter TV Show Name" value={searchText} onChange={handleOnChange1} />

                    </div>
                </div>
            </div>


            {
                Loading
                    ?
                    <div style={style}>
                        <HashLoader
                            color="#ff505b"
                            size={100}
                        />
                    </div>
                    :
                    <><div className="list__cards">
                        {movieList.map(movie => (
                            <Cards movie={movie} />
                        ))}
                    </div>
                        <div className="btn__div text-center m-4 p-4 text-[#ff505b] text-xl">
                            <button onClick={handlePreviousClick} disabled={!searchText ? "true" : ""} className="disabled:hidden m-4"><i class="fa fa-arrow-left mr-3"></i>Previous</button>
                            <button onClick={handleNextClick} disabled={!searchText ? "true" : ""} className="disabled:hidden m-4">Next<i class="fa fa-arrow-right ml-3"></i></button>

                        </div>
                    </>
            }

            <div className="error absolute sm:top-[50%] sm:left-[50%] text-[#454F51] -z-10">
                {!searchText && !Loading && (<h2 className=" ">Enter Something</h2>)}
            </div>





        </div>

    </>
}

export default SearchMovie