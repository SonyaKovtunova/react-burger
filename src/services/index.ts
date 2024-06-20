import { configureStore, createSelector } from "@reduxjs/toolkit";
import burgerIngredientsReducer, { IBurgerIngredientsState } from "./burger-ingredients";
import burgerConstructor, { IBurgerConstructorState } from "./burger-constructor";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ICategoryData } from "../interfaces/category-data-interface";

export interface IStoreState {
    burgerIngredients: IBurgerIngredientsState,
    burgerConstructor: IBurgerConstructorState
}

export const store = configureStore({
    reducer: {
        burgerIngredients: burgerIngredientsReducer,
        burgerConstructor: burgerConstructor,
    },
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

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<IStoreState> = useSelector