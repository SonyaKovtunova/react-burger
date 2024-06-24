import { Middleware } from "@reduxjs/toolkit";
import { feedActions } from "./feed";
import { IFeed } from "../interfaces/feed";

const feedMiddleware: Middleware = store => {
    let socket: WebSocket;
    const { dispatch } = store;

    return next => action => {
        if (feedActions.startConnecting.match(action)) {
            socket = new WebSocket('wss://norma.nomoreparties.space/orders/all');
    
            socket.onopen = () => {
                dispatch(feedActions.connectionEstablished());
            };
    
            socket.onerror = event => {
                dispatch(feedActions.setError(event));
            };
    
            socket.onmessage = (event) => {
                const { data } = event;
                const feed: IFeed = JSON.parse(data);
                dispatch(feedActions.setFeed(feed));
            };
    
            socket.onclose = () => {
                dispatch(feedActions.close());
            };
        }

        next(action);
    }
}   
   
export default feedMiddleware;