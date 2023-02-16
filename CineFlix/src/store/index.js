import {
    configureStore,
    createAsyncThunk,
    createSlice,
  } from "@reduxjs/toolkit";
  import axios from "axios";
  
  const initialState = {
    movies: [],
    
    watchLater: []

    
  };

  
  
  export const getUsersLikedMovies = createAsyncThunk(
    "netflix/getLiked",
    async (email) => {
      const {
        data: { movies },
      } = await axios.get(process.env.REACT_APP_API +`/liked/${email}`);
      return movies;
    }
  );
  
  export const removeMovieFromLiked = createAsyncThunk(
    "netflix/deleteLiked",
    async ({ movieId, email }) => {
      const {
        data: { movies },
      } = await axios.put(process.env.REACT_APP_API +"/removeFav", {
        email,
        movieId,
      });
      return movies;
    }
  );

  //Watch Later
  
  export const getUsersWatchLaterMovies = createAsyncThunk(
    "netflix/getWatchLater",
    async (email) => {
      const {
        data: { movies },
      } = await axios.get(process.env.REACT_APP_API +`/watchLater/${email}`);
      return movies;
    }
  );

  export const removeMovieFromWatchLater = createAsyncThunk(
    "netflix/deleteWatchLater",
    async ({ movieId, email }) => {
      const {
        data: { movies },
      } = await axios.put(process.env.REACT_APP_API +"/removeWatchLater", {
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
      builder.addCase(getUsersWatchLaterMovies.fulfilled, (state, action) => {
        state.watchLater = action.payload;
      });
      builder.addCase(removeMovieFromWatchLater.fulfilled, (state, action) => {
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