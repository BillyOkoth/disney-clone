import { nullLiteral } from "@babel/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    new:null,
    trending:null,
    original:null,
    recommend:null
}

const movieSlice = createSlice({
    name:"movie",
    initialState,
    reducers:{
        setMovie:(state, action)=>{
          state.newDisney = action.payload.newDisney;
          state.trending = action.payload.trending;
          state.original = action.payload.original;
          state.recommend = action.payload.recommend;
        }
    }
})

export default movieSlice.reducer;

//actions
export const {setMovie}  = movieSlice.actions;
///state
export const selectTrending = (state) => state.movie.trending;
export const selectOriginal = (state) => state.movie.original;
export const selectRecommend = (state) => state.movie.recommend;
export const selectNewDisney = (state) => state.movie.newDisney;