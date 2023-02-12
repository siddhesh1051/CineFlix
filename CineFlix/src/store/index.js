import {
    configureStore,
    createAsyncThunk,
    createSlice,
  } from "@reduxjs/toolkit";
  import axios from "axios";
  
  const initialState = {
    movies: [],
    watchLater: [],
    
  };

  
  
  export const getUsersLikedMovies = createAsyncThunk(
    "netflix/getLiked",
    async (email) => {
      const {
        data: { movies },
      } = await axios.get(`http://localhost:4000/liked/${email}`);
      return movies;
    }
  );
  
  export const removeMovieFromLiked = createAsyncThunk(
    "netflix/deleteLiked",
    async ({ movieId, email }) => {
      const {
        data: { movies },
      } = await axios.put("http://localhost:4000/removeFav", {
        email,
        movieId,
      });
      return movies;
    }
  );

  //Watch Later
  export const getWatchLaterMovies = createAsyncThunk(
    "netflix/getLiked",
    async (email) => {
      const {
        data: { movies },
      } = await axios.get(`http://localhost:4000/watch/${email}`);
      return movies;
    }
  );
  
  export const removeWatchLaterMovie = createAsyncThunk(
    "netflix/deleteLiked",
    async ({ movieId, email }) => {
      const {
        data: { movies },
      } = await axios.put("http://localhost:4000/removeFav", {
        email,
        movieId,
      });
      return movies;
    }
  );
  
  const NetflixSlice = createSlice({
    name: "Netflix",
    initialState,
    extraReducers: (builder) => {
      
      builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
      builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
      builder.addCase(getWatchLaterMovies.fulfilled, (state, action) => {
        state.watchLater = action.payload;
      });
      builder.addCase(removeWatchLaterMovie.fulfilled, (state, action) => {
        state.watchLater = action.payload;
      });
    },
  });
  
  export const store = configureStore({
    reducer: {
      netflix: NetflixSlice.reducer,
    },
  });
  
  export const { setGenres, setMovies, setWatchLater } = NetflixSlice.actions;