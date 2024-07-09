import { createSlice } from "@reduxjs/toolkit";
import { IOrders } from "../interfaces/orders";

export interface ISocketState {
    isConnected: boolean; 
    error?: Event;
    orders: IOrders | null;
}

export const initialState: ISocketState = {
    isConnected: false,
    orders: null,
}
  
export const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: { 
        open: (state, action: { type: string, payload: { url: string } }) => { },
        onOpen: state => {
            state.isConnected = true;
            state.error = undefined;
        },
        setError: (state, action: { type: string, payload: Event }) => {
            state.isConnected = false;
            state.error = action.payload;
        },
        close: state => { },
        onClose: state => {
            state.isConnected = false;
            state.error = undefined;
            state.orders = null;
        },
        setOrders: (state, action: { type: string, payload: IOrders }) => {
            state.orders = action.payload;
        },
    },
});

export const socketActions = socketSlice.actions;

export type TSocketActions = {
    open: typeof socketActions.open,
    onOpen: typeof socketActions.onOpen,
    setError: typeof socketActions.setError,
    close: typeof socketActions.close,
    onClose: typeof socketActions.onClose,
    setOrders: typeof socketActions.setOrders,
};

export default socketSlice.reducer;