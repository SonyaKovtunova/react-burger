import { Middleware } from "@reduxjs/toolkit";
import { ordersActions } from "./orders";
import { IFeed } from "../interfaces/feed";
import { IStoreState } from ".";

const ordersMiddleware: Middleware = store => {
    let socket: WebSocket;

    return next => action => {
        const { dispatch, getState } = store;
        const { token } = (getState() as IStoreState).user;

        if (ordersActions.startConnecting.match(action) && token && !socket) {
            socket = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${token}`);
    
            socket.onopen = () => {
                dispatch(ordersActions.connectionEstablished());
            };
    
            socket.onerror = event => {
                dispatch(ordersActions.setError(event));
            };
    
            socket.onmessage = (event) => {
                const { data } = event;
                const feed: IFeed = JSON.parse(data);
                dispatch(ordersActions.setOrders(feed));
            };
    
            socket.onclose = () => {
                dispatch(ordersActions.close());
            };
        }
        else if (socket && ordersActions.close.match(action)) {
            debugger
            socket.close();
        }

        next(action);
    }
}   
   
export default ordersMiddleware;