import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IFeed, IOrder } from "../interfaces/feed";
import { getOrder } from "../utils/burger-api";

export const getOrderThunk = createAsyncThunk<IFeed, string>(
    "feed/getOrder",
    async (request) => {
        return await getOrder(request);
    }
  );

export interface IFeedState {
    isConnected: boolean; 
    error?: Event;
    feed: IFeed | null;
    selectedOrder: IOrder | null;
    selectedOrderFailed: boolean;
}

const initialState: IFeedState = {
    isConnected: false,
    feed: null,
    selectedOrder: null,
    selectedOrderFailed: false,
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
        setOrder: (state, action: { type: string, payload: IOrder | null }) => {
            state.selectedOrder = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(getOrderThunk.pending, (state) => {
            state.selectedOrder = null;
            state.selectedOrderFailed = false;
          })
          .addCase(getOrderThunk.fulfilled, (state, action) => {
            state.selectedOrder = action.payload.orders.length > 0 ? action.payload.orders[0] : null;
            state.selectedOrderFailed = !state.selectedOrder;
          })
          .addCase(getOrderThunk.rejected, (state) => {
            state.selectedOrder = null;
            state.selectedOrderFailed = true;
          })
    },
});

export const feedActions = feedSlice.actions;
export default feedSlice.reducer;