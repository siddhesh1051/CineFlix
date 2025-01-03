import React from 'react'
import Logo from './logo.png'
import { FiBookmark, FiClock, FiDownload, FiHeart, FiLogIn, FiLogOut, FiSearch, FiStar, FiTrendingUp } from "react-icons/fi";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveAs } from 'file-saver';
import CineflixApk from '../../ApkFile/cineflix.apk';

function NavBar(props) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleApkDownload = () => {
    try {
      saveAs(CineflixApk, 'Cineflix.apk');
      toast.success('Downloading APK', {
        position: "bottom-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      toast.error('Error in Downloading APK', {
        position: "bottom-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
    // window.location.reload();
    toast.success('Logged Out Succesfully', {
      position: "bottom-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });



  };
  return (

    <div
      className="lg:min-w-[14%] left-[1px] text-sm">


      <div className="sidebar flex flex-col rounded-lg fixed lg:visible invisible z-20 max-h-screen overflow-y-auto" >
        <Link to="/"><img src={Logo} alt="" className="logo cursor-pointer my-6 mx-6 inline object-fill h-10 w-48" /></Link>

        <div className="movie__section mb-2 ">
          <h1 className="movies__title mx-7 my-2 text-[#9696A3]">
            Movies
          </h1>
          <NavLink to="/movies/search"><p className="Popular px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiSearch /><span className='ml-3'>Search Movies</span></p></NavLink>
          <NavLink to="/movies/popular"><p className="Popular px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiTrendingUp /><span className='ml-3'>Popular</span></p></NavLink>
          <NavLink to="/movies/top_rated" ><p className="Top Rated px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b] active:text-[blue]"><FiStar /><span className='ml-3'>Top Rated</span></p></NavLink>
          <NavLink to="/movies/upcoming"><p className="Upcoming px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiClock /><span className='ml-3'>Upcoming</span></p></NavLink>

        </div>
        <div className="tv__section mb-2 ">
          <h1 className="tvShows__title mx-7 my-2 text-[#9696A3]">
            TV Shows
          </h1>
          <NavLink to="/tvs/search"><p className="Popular px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiSearch /><span className='ml-3'>Search TV Shows</span></p></NavLink>
          <NavLink to="/tvs/popular"><p className="Popular px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiTrendingUp /><span className='ml-3'>Popular</span></p></NavLink>
          <NavLink to="/tvs/top_rated" ><p className="Top Rated px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiStar /><span className='ml-3'>Top Rated</span></p></NavLink>

        </div>
        <div className="library__section mb-2 ">
          <h1 className="library__title mx-7 my-2 text-[#9696A3]">
            Library
          </h1>
          <NavLink to="/watch_later"><p className="Popular px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiBookmark /><span className='ml-3'>Watch Later</span></p></NavLink>
          <NavLink to="/favorites"><p className="Top Rated px-2 mx-5 py-2 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiHeart /><span className='ml-3'>My Favourites</span></p></NavLink>
          <NavLink onClick={handleApkDownload}><p className="Top Rated px-2 mx-5 py-3 my-1 flex items-center cursor-pointer rounded-lg duration-300 ease-in-out hover:bg-[#262627] hover:text-[#ff505b]"><FiDownload /><span className='ml-3'>Download App</span></p></NavLink>
        </div>
        <div className="mt-1">
          {
            token ?
              <p className="mx-6 my-1 flex items-center text-[#ff6c76] ">Hello {props.user}</p>
              :
              <p className="mx-6 my-1 flex items-center text-[#ff6c76] ">Hello Guest</p>
          }
          {token ?
            <Link to="/login" onClick={logOut}><div className="logout">
              <p className="Top Rated px-2 mx-5 py-2 my-1 flex items-center mt-1 bg-[#4e4e4f] rounded-lg cursor-pointer"><FiLogOut /><span className='ml-3'>Log Out</span></p>
            </div>
            </Link>

            :
            <Link to="/login"><div className="logout">
              <p className="Top Rated px-2 mx-5 py-2 my-1 flex items-center mt-1 bg-[#4e4e4f] rounded-lg cursor-pointer"><FiLogIn /><span className='ml-3'>Log In</span></p>
            </div>
            </Link>

          }
        </div>
      </div>
      {/* <ToastContainer
        position="bottom-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      /> */}
    </div>
  )
}

export default NavBar