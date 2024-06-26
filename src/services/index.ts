import { configureStore, createSelector } from "@reduxjs/toolkit";
import burgerIngredientsReducer, { IBurgerIngredientsState } from "./burger-ingredients";
import burgerConstructorReducer, { IBurgerConstructorState } from "./burger-constructor";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ICategoryData } from "../interfaces/category-data-interface";
import userReducer, { IUserState } from "./user";
import orderReducer, { IOrderState } from "./order";
import socketMiddleware from "./socket-middleware";
import socketReducer, { ISocketState, TSocketActions, socketActions } from "./socket";

export interface IStoreState {
    burgerIngredients: IBurgerIngredientsState,
    burgerConstructor: IBurgerConstructorState,
    socket: ISocketState,
    user: IUserState,
    order: IOrderState
}

const actions: TSocketActions = {
    open: socketActions.open,
    onOpen: socketActions.onOpen,
    setError: socketActions.setError,
    close: socketActions.close,
    onClose: socketActions.onClose,
    setOrders: socketActions.setOrders,
};

export const store = configureStore({
    reducer: {
        burgerIngredients: burgerIngredientsReducer,
        burgerConstructor: burgerConstructorReducer,
        socket: socketReducer,
        user: userReducer,
        order: orderReducer,
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat([socketMiddleware(actions)]);
    }
});

export const getCategoriesState = createSelector(
    (state: IStoreState) => state.burgerIngredients.ingredients,
    (ingredients) => ingredients.reduce(
        (result: ICategoryData[], item) => {
        if (result.length === 0 || !result.find(x => x.type === item.type)) {
            result.push({
                type: item.type,
                ingredients: []
            });
        }
            
        const category = result.find(x => x.type === item.type);
    
        if (category) {
            category.ingredients.push(item);
        }
    
        return result;
        }, 
        [],
    ),
);

export const createIsLoadingSelector = createSelector(
    (state: IStoreState) => (state),
    (state: IStoreState) => state.burgerIngredients.ingredientsRequest 
        || state.burgerConstructor.orderNumberRequest
        || state.user.userRequest
);

export const createOrderNumbersSelector = (status: string) => createSelector(
    (state: IStoreState) => state.socket.orders,
    (orders) => orders?.orders.filter(order => order.status === status).map(order => order.number)
);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IStoreState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;