import './App.css';
import "react-loading-skeleton/dist/skeleton.css";
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



function App() {
  return (
    <div className='flex '>
    <Router> 
    <NavBar/>
            <Routes>
              {/* For Movies */}
              
                <Route path="/" element = {<Home />}></Route>
                <Route path="/movies/search" element={<SearchMovie/>}></Route>
                <Route path="/movies/:type" element={<MovieList />}></Route>
                <Route path="/movie/:id" element = {< MovieDetail/>}></Route>
                <Route path="/movie/:id/similar" element = {< ShowSimilarMovie/>}></Route>
                <Route path="/movie/:id/credits" element = {< ShowCastMovie/>}></Route>

              {/* For Tv */}
              <Route path="/tvs/:type" element={<TvList/>}></Route>
              <Route path="/tvs/search" element={<SearchTv/>}></Route>
              <Route path="/tv/:id" element = {<TvDetail/>}></Route>
              <Route path="/tv/:id/similar" element = {< ShowSimilarTv/>}></Route>
              <Route path="/tv/:id/credits" element = {< ShowCastTv/>}></Route>
             
            </Routes>
        </Router>
    
    
    </div>
  );
}

export default App;
