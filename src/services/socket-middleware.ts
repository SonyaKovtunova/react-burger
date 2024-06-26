import { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { TSocketActions } from "./socket";
import { IOrders } from "../interfaces/orders";
import { AppDispatch, IStoreState, RootState } from ".";

const socketMiddleware = (socketActions: TSocketActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null;
        let prevToken: string | null;
        const { dispatch, getState } = store;

        return next => (action: TSocketActions) => {
            const state = getState() as IStoreState;
            if (socketActions.open.match(action) && !state.socket.isConnected) {
                let url = action.payload.url;

                if (prevToken === state.user.token) {
                    return;
                }

                prevToken = state.user.token;

                if (!!state.user.token) {
                    url += `?token=${state.user.token}`;
                }
                
                socket = new WebSocket(url);
        
                socket.onopen = () => {
                    dispatch(socketActions.onOpen());
                };
        
                socket.onerror = (event: Event) => {
                    dispatch(socketActions.setError(event));
                };
        
                socket.onmessage = (event) => {
                    const { data } = event;
                    const orders: IOrders = JSON.parse(data);
                    dispatch(socketActions.setOrders(orders));
                };
        
                socket.onclose = () => {
                    dispatch(socketActions.onClose());
                    prevToken = null;
                    socket = null;
                };
            }
            else if (socket && socketActions.close.match(action) && state.socket.isConnected) {
                socket.close();
            }

            next(action);
        }
    }) as Middleware;
}   
   
export default socketMiddleware;