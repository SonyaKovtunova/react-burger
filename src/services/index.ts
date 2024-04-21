import { configureStore } from "@reduxjs/toolkit";
import burgerIngredientsReducer from "./burger-ingredients";
import burgerConstructor from "./burger-constructor";
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        burgerIngredients: burgerIngredientsReducer,
        burgerConstructor: burgerConstructor,
    },
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()