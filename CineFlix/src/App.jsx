import './App.css';
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect ,useState} from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavBar from './components/NavBar/NavBar';
import MovieDetail from './components/MovieDetail/MovieDetail';
import Home from './components/home/home';
import MovieList from './components/movieList/MovieList';
import TvList from './components/TV/TvList/TvList'
import TvDetail from './components/TV/TvDetail/TvDetail'
import ShowSimilarMovie from './components/ShowMore/ShowSimilarMovie'
import ShowSimilarTv from './components/ShowMore/ShowSimilarTv'
import ShowCastMovie from './components/ShowMore/ShowCastMovie';
import ShowCastTv from './components/ShowMore/ShowCastTv';
import SearchMovie from './components/Search/SearchMovie';
import SearchTv from './components/Search/SearchTv';
import Menu from './components/Menu';
import Signup from './components/Authentication/Register';
import Login from './components/Authentication/Login';
import MyFavorites from './components/myFavorites/MyFavorites';
// import Signup from './components/Authentication/Signup/Signup';
// import Login from './components/Authentication/Login/Login';




function App() {

  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [username, setusername] = useState("")
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
        
      } else {
        
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          {
            withCredentials: true,
          }
        );
        
        
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else
        // toast(`Hi ${data.user} 🦄`, {
        //   theme: "dark",
        // });
        setusername(data.user)
      }
      
    };
    verifyUser();
  }, [cookies, removeCookie]);

  

  // const logOut = () => {
  //   removeCookie("jwt");
  //   navigate("/login");
  // };


  return (
    <div className="flex lg:gap-[1.5rem] ">
    {/* <Router>  */}

  
 
    {/* {cookies.jwt &&<NavBar />} */}
    {cookies.jwt?<NavBar cookies={cookies} removeCookie={removeCookie} username={username}/>:null}
    {cookies.jwt?<Menu cookies={cookies} removeCookie={removeCookie}/>:null} 
            <Routes>

              

              {/* For Movies */}
                <Route exact path="/" element = {<Home/>}></Route>
                <Route path="/movies/search" element={<SearchMovie/>}></Route>
                <Route path="/movies/:type" element={<MovieList />}></Route>
                <Route path="/movie/:id" element = {< MovieDetail userFrom={cookies.jwt} currEmail={username}/>}></Route>
                <Route path="/movie/:id/similar" element = {< ShowSimilarMovie/>}></Route>
                <Route path="/movie/:id/credits" element = {< ShowCastMovie/>}></Route>
                <Route path="/favorites" element = {< MyFavorites currEmail={username}/>}></Route>
                

              {/* For Tv */}
              <Route path="/tvs/:type" element={<TvList/>}></Route>
              <Route path="/tvs/search" element={<SearchTv/>}></Route>
              <Route path="/tv/:id" element = {<TvDetail/>}></Route>
              <Route path="/tv/:id/similar" element = {< ShowSimilarTv/>}></Route>
              <Route path="/tv/:id/credits" element = {< ShowCastTv/>}></Route>
              {/* <Route path="/tv/:id/credits" element = {< ShowCastTv/>}></Route> */}
             
            {/* Other Routes */}
            <Route path="/login" element = {<Login/>}></Route>
            <Route path="/signup" element = {< Signup/>}></Route>


            </Routes>
        {/* </Router> */}
    
    
    </div>
  );
}

export default App;
