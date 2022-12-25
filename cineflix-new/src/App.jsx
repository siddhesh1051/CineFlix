import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavBar from './components/NavBar/NavBar';
// import MovieList from './components/MovieList/MovieList';
import MovieDetail from './components/MovieDetail/MovieDetail';
import Home from './components/home/home';
import MovieList from './components/movieList/MovieList';


function App() {
  return (
    <div className='flex '>
    <Router> 
    <NavBar/>
            <Routes>
                <Route path="/movie/:id" element = {< MovieDetail/>}></Route>
                {/* <Route path="/tv/:id" element = {< MovieDetail/>}></Route> */}
                <Route path="/" element = {<Home />}></Route>
                <Route path=":platform/:type" element={<MovieList />}></Route>
                {/* <Route path="tv/:type" element={<MovieList />}></Route> */}
                
             
            </Routes>
        </Router>
    
    
    </div>
  );
}

export default App;
