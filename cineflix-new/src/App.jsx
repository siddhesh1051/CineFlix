import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavBar from './components/NavBar/NavBar';
import MovieDetail from './components/MovieDetail/MovieDetail';
import Home from './components/home/home';
import MovieList from './components/movieList/MovieList';
import TvList from './components/TV/TvList/TvList'
import TvDetail from './components/TV/TvDetail/TvDetail'


function App() {
  return (
    <div className='flex '>
    <Router> 
    <NavBar/>
            <Routes>
              {/* For Movies */}
                <Route path="/" element = {<Home />}></Route>
                <Route path="/movies/:type" element={<MovieList />}></Route>
                <Route path="/movie/:id" element = {< MovieDetail/>}></Route>

              {/* For Tv */}
              <Route path="/tvs/:type" element={<TvList/>}></Route>
              <Route path="/tv/:id" element = {<TvDetail/>}></Route>
             
            </Routes>
        </Router>
    
    
    </div>
  );
}

export default App;
