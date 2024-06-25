import { createSlice } from "@reduxjs/toolkit";
import { IFeed } from "../interfaces/feed";

export interface IOrdersState {
    isConnected: boolean; 
    error?: Event;
    orders: IFeed | null;
}

const initialState: IOrdersState = {
    isConnected: false,
    orders: null,
}
  
export const ordersSlice = createSlice({
    name: 'orders',
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
        setOrders: (state, action: { type: string, payload: IFeed }) => {
            state.orders = action.payload;
        },
    },
});

export const ordersActions = ordersSlice.actions;
export default ordersSlice.reducer;