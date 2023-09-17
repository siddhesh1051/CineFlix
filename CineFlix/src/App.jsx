import './App.css';
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect ,useState} from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import MyWatchLaterMovies from './components/watchLater/myWatchLater';
import ReactGA from 'react-ga4';

const TRACKING_ID = "G-0P7KW5611K";
ReactGA.initialize(TRACKING_ID);
ReactGA.send("pageview");



function App() {

 

  const navigate = useNavigate();
  const path = window.location.pathname;
  const [username, setusername] = useState("")
  const [user, setuser] = useState("")
  useEffect(() => {
    const verifyUser = async () => {
      if (localStorage.getItem("token")===null || localStorage.getItem("token")===undefined) {
        // navigate("/login");
        
        
      } else {
        
        const { data } = await axios.post(
          process.env.REACT_APP_API,
          {token:localStorage.getItem("token")},
          {
            withCredentials: true,
          }
        )
        console.log(data.user)
        
        
        if (!data.status) {
          localStorage.removeItem("token"); 
          //  navigate("/login");
          console.log(data.user)
        } else
        setusername(data.user)
        setuser(data.userid)

        if(path==="/"){

          toast(`Welcome👋, ${data.userid}`, {
            theme: "dark",
          });
        }
      }
      
    };
    verifyUser();
  }, []);
  


  return (
    <div className="flex lg:gap-[1.5rem]">
    {/* <Router>  */}

  
 
    {/* {localStorage.getItem("token")?<NavBar username={username} user={user}/>:null}
    {localStorage.getItem("token")?<Menu username={username} user={user}/>:null}  */}
    {path !=='/login' &&  path !== '/signup' && <NavBar username={username} user={user}/>}
    {path !=='/login' &&  path !== '/signup' && <Menu username={username} user={user}/>}
    
        <ToastContainer />
            <Routes>           

              {/* For Movies */}
                <Route exact path="/" element = {<Home/>}></Route>
                <Route path="/movies/search" element={<SearchMovie/>}></Route>
                <Route path="/movies/:type" element={<MovieList />}></Route>
                <Route path="/movie/:id" element = {< MovieDetail currEmail={username}/>}></Route>
                <Route path="/movie/:id/similar" element = {< ShowSimilarMovie/>}></Route>
                <Route path="/movie/:id/credits" element = {< ShowCastMovie/>}></Route>
                <Route path="/favorites" element = {< MyFavorites currEmail={username}/>}></Route>
                <Route path="/watch_later" element = {< MyWatchLaterMovies currEmail={username}/>}></Route>
                

              {/* For Tv */}
              <Route path="/tvs/:type" element={<TvList/>}></Route>
              <Route path="/tvs/search" element={<SearchTv/>}></Route>
              <Route path="/tv/:id" element = {<TvDetail currEmail={username}/>}></Route>
              <Route path="/tv/:id/similar" element = {< ShowSimilarTv/>}></Route>
              <Route path="/tv/:id/credits" element = {< ShowCastTv/>}></Route>
             
            {/* Other Routes */}
            <Route path="/login" element = {<Login/>}></Route>
            <Route path="/signup" element = {< Signup/>}></Route>


            </Routes>
        {/* </Router> */}
    
    
    </div>
  );
}

export default App;
