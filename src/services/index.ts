import { configureStore, createSelector } from "@reduxjs/toolkit";
import burgerIngredientsReducer, { IBurgerIngredientsState } from "./burger-ingredients";
import burgerConstructorReducer, { IBurgerConstructorState } from "./burger-constructor";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ICategoryData } from "../interfaces/category-data-interface";
import feedReducer, { IFeedState } from "./feed";
import feedMiddleware from "./feed-middleware";

export interface IStoreState {
    burgerIngredients: IBurgerIngredientsState,
    burgerConstructor: IBurgerConstructorState,
    feed: IFeedState
}

export const store = configureStore({
    reducer: {
        burgerIngredients: burgerIngredientsReducer,
        burgerConstructor: burgerConstructorReducer,
        feed: feedReducer
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat([feedMiddleware]);
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
    (state: IStoreState) => state.burgerIngredients.ingredientsRequest || state.burgerConstructor.orderNumberRequest
);

export const createOrderNumbersSelector = (status: string) => createSelector(
    (state: IStoreState) => state.feed.feed,
    (feed) => feed?.orders.filter(order => order.status === status).map(order => order.number)
);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IStoreState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;