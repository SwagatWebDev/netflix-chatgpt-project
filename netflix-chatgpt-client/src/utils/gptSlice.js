import {createSlice} from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: 'gpt',
    initialState: {
        showGptSearch: false,
        moviesResults: null,
        movieNames: null,
    },
    reducers: {
        toggleGptSearchView: (state) => {
            state.showGptSearch = !state.showGptSearch;
        },
        addGptMovieResult: (state, action) => {
            const {movieNames, movieResults} = action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults;
        },
        clearMovies: (state) => {
            state.movieResults = null;
            state.movieNames = null;
        }
    }
});

export const {toggleGptSearchView, addGptMovieResult, clearMovies} = gptSlice.actions;

export default gptSlice.reducer;
