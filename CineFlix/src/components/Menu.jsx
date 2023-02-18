import React, { useState } from 'react'
import { BiMenuAltLeft } from 'react-icons/bi'
import { IoIosArrowDropleft } from 'react-icons/io'
import Logo from "../components/NavBar/logo.png"
import { FiBookmark, FiClock, FiHeart, FiLogOut, FiSearch, FiStar, FiTrendingUp } from "react-icons/fi";
import { Link, NavLink, useNavigate } from 'react-router-dom';




function Menu(props) {
    const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");  
    navigate("/login");
    window.location.reload();
  };

    const [Toggle, setToggle] = useState(false)

    return (
        <div>

            {
                Toggle
                    ? <IoIosArrowDropleft onClick={() => {
                        setToggle(!Toggle)
                        
                    }} className="fixed mt-0 ml-[13rem] z-30 text-[#c72f3c] text-5xl lg:invisible visible duration-300 ease-in-out" />
                    :
                    <BiMenuAltLeft onClick={() => {
                        setToggle(!Toggle)
                    }} className="fixed mt-4 ml-4 z-30 text-[#ca3d46] text-5xl lg:invisible visible duration-300 ease-in-out" />
            }


            {

                
                <div className={`sidebar flex flex-col rounded-lg fixed lg:invisible visible z-20 ${Toggle ? "left-[0]" : "left-[-100%]"} bg-[#1d1d1d] duration-300 ease-in-out text-sm`} >
                    <Link to="/"><img src={Logo} alt="" className="logo cursor-pointer my-6 mx-6 inline object-fill h-10 w-48" /></Link>

                    <div className="movie__section mb-6 ">
                        <h1 className="movies__title mx-7 my-2 text-[#ff505b]">
                            Movies
                        </h1>
                        <NavLink to="/movies/search"><p className="Popular px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiSearch /><span className='ml-3'>Search Movies</span></p></NavLink>
                        <NavLink to="/movies/popular"><p className="Popular px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiTrendingUp /><span className='ml-3'>Popular</span></p></NavLink>
                        <NavLink to="/movies/top_rated" ><p className="Top Rated px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b] active:text-[blue]"><FiStar /><span className='ml-3'>Top Rated</span></p></NavLink>
                        <NavLink to="/movies/upcoming"><p className="Upcoming px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiClock /><span className='ml-3'>Upcoming</span></p></NavLink>

                    </div>
                    <div className="tv__section mb-6 ">
                        <h1 className="tvShows__title mx-7 my-2 text-[#ff505b]">
                            TV Shows
                        </h1>
                        <NavLink to="/tvs/search"><p className="Popular px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiSearch /><span className='ml-3'>Search TV Shows</span></p></NavLink>
                        <NavLink to="/tvs/popular"><p className="Popular px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiTrendingUp /><span className='ml-3'>Popular</span></p></NavLink>
                        <NavLink to="/tvs/top_rated" ><p className="Top Rated px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiStar /><span className='ml-3'>Top Rated</span></p></NavLink>

                    </div>
                    <div className="library__section mb-6 ">
                        <h1 className="library__title mx-7 my-2 text-[#ff505b]">
                            Library
                        </h1>
                        <NavLink to="/watch_later"><p className="Popular px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiBookmark /><span className='ml-3'>Watch Later</span></p></NavLink>
                        <NavLink to="/favorites"><p className="Top Rated px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiHeart /><span className='ml-3'>My Favourites</span></p></NavLink>
                    </div>
                    <div className="mt-1">
          
        <p className="mx-6 my-1 flex items-center text-[#ff6c76] ">Welcome, {props.username}</p>
        <Link to="/login" onClick={logOut}><div className="logout">
        <p className="Top Rated px-2 mx-5 py-2 my-1 flex items-center mt-1 bg-[#4e4e4f] rounded-lg cursor-pointer"><FiLogOut/><span className='ml-3'>Log Out</span></p>
        </div>
        </Link>
        </div>
                </div>
            }
        </div>
    )
}

export default Menu