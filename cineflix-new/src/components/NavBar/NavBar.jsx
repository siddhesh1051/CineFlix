import React from 'react'
import Logo from './logo.png'
import { FiBookmark, FiClock, FiHeart, FiHome,FiLogOut,FiSearch,FiStar} from "react-icons/fi";
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className="min-w-[14%] ] ">
      <div className="sidebar flex flex-col max-h-fit fixed rounded-lg  " >
      <Link to="/"><img src={Logo} alt="" className="logo cursor-pointer my-10 mx-6 inline object-fill h-10 w-48" /></Link>

        <div className="movie__section mb-6 ">
          <h1 className="movies__title mx-7 my-2 text-[#9696A3]">
            Movies
          </h1>
          <Link to="/movies/search"><p className="Popular px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b] visited:bg-[#262627]"><FiSearch/><span className='ml-3'>Search Movies</span></p></Link>
          <Link to="/movies/popular"><p className="Popular px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiHome/><span className='ml-3'>Popular</span></p></Link>
          <Link to="/movies/top_rated" ><p className="Top Rated px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiStar/><span className='ml-3'>Top Rated</span></p></Link>
          <Link to="/movies/upcoming"><p className="Upcoming px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiClock/><span className='ml-3'>Upcoming</span></p></Link>

        </div>
        <div className="tv__section mb-6 ">
          <h1 className="tvShows__title mx-7 my-2 text-[#9696A3]">
            TV Shows
          </h1>
          <Link to="/tvs/search"><p className="Popular px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiSearch/><span className='ml-3'>Search TV Shows</span></p></Link>
          <Link to="/tvs/popular"><p className="Popular px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiHome/><span className='ml-3'>Popular</span></p></Link>
          <Link to="/tvs/top_rated" ><p className="Top Rated px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiStar/><span className='ml-3'>Top Rated</span></p></Link>
          
        </div>
        <div className="library__section mb-6 ">
        <h1 className="library__title mx-7 my-2 text-[#9696A3]">
            Library
          </h1>
          <Link to="/"><p className="Popular px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiBookmark/><span className='ml-3'>Watch Later</span></p></Link>
          <Link to="/"><p className="Top Rated px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiHeart/><span className='ml-3'>My Favourites</span></p></Link>
        </div>
        <Link to="/"><div className="logout">
        <p className="Top Rated  px-2 mx-5 py-2 my-1 flex items-center bg-slate-700 rounded-lg mt-8 cursor-pointer"><FiLogOut/><span className='ml-3'>Log Out</span></p>
        </div></Link>
      </div>
    </div>
  )
}

export default NavBar