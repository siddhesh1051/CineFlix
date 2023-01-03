import React from 'react'
import Logo from './logo.png'
import { FiBookmark, FiClock, FiHeart,FiLogOut,FiSearch,FiStar, FiTrendingUp} from "react-icons/fi";
import { Link,NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <div className="lg:min-w-[14%] left-[1px]">
     
      
      <div className="sidebar flex flex-col rounded-lg fixed lg:visible invisible z-20" >
      <Link to="/"><img src={Logo} alt="" className="logo cursor-pointer my-10 mx-6 inline object-fill h-10 w-48" /></Link>

        <div className="movie__section mb-6 ">
          <h1 className="movies__title mx-7 my-2 text-[#9696A3]">
            Movies
          </h1>
          <NavLink to="/movies/search"><p className="Popular px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiSearch/><span className='ml-3'>Search Movies</span></p></NavLink>
          <NavLink to="/movies/popular"><p className="Popular px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiTrendingUp/><span className='ml-3'>Popular</span></p></NavLink>
          <NavLink to="/movies/top_rated" ><p className="Top Rated px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b] active:text-[blue]"><FiStar/><span className='ml-3'>Top Rated</span></p></NavLink>
          <NavLink to="/movies/upcoming"><p className="Upcoming px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiClock/><span className='ml-3'>Upcoming</span></p></NavLink>

        </div>
        <div className="tv__section mb-6 ">
          <h1 className="tvShows__title mx-7 my-2 text-[#9696A3]">
            TV Shows
          </h1>
          <NavLink to="/tvs/search"><p className="Popular px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiSearch/><span className='ml-3'>Search TV Shows</span></p></NavLink>
          <NavLink to="/tvs/popular"><p className="Popular px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiTrendingUp/><span className='ml-3'>Popular</span></p></NavLink>
          <NavLink to="/tvs/top_rated" ><p className="Top Rated px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiStar/><span className='ml-3'>Top Rated</span></p></NavLink>
          
        </div>
        <div className="library__section mb-6 ">
        <h1 className="library__title mx-7 my-2 text-[#9696A3]">
            Library
          </h1>
          <NavLink to="/watch_later"><p className="Popular px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiBookmark/><span className='ml-3'>Watch Later</span></p></NavLink>
          <NavLink to="/favourites"><p className="Top Rated px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiHeart/><span className='ml-3'>My Favourites</span></p></NavLink>
        </div>
        <Link to="/"><div className="logout">
        <p className="Top Rated  px-2 mx-5 py-2 my-1 flex items-center bg-[#4e4e4f] rounded-lg mt-8 cursor-pointer"><FiLogOut/><span className='ml-3'>Log Out</span></p>
        </div></Link>
      </div>
    </div>
  )
}

export default NavBar