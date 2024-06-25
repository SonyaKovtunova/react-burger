import { createSlice } from "@reduxjs/toolkit";
import { IFeed } from "../interfaces/feed";

export interface IFeedState {
    isConnected: boolean; 
    error?: Event;
    feed: IFeed | null;
}

const initialState: IFeedState = {
    isConnected: false,
    feed: null,
}
  
export const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: { 
        startConnecting: state => {
            state.isConnected = true;
            state.error = undefined;
        },
        connectionEstablished: state => {
            state.isConnected = true;
            state.error = undefined;
        },
        setError: (state, action: { type: string, payload: Event }) => {
            state.isConnected = false;
            state.error = action.payload;
        },
        close: state => {
            state.isConnected = false;
            state.error = undefined;
        },
        setFeed: (state, action: { type: string, payload: IFeed }) => {
            state.feed = action.payload;
        },
    },
});

export const feedActions = feedSlice.actions;
export default feedSlice.reducer;