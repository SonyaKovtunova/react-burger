import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder } from "../utils/burger-api";
import { IOrderRequest } from "../interfaces/order-request";
import { IIngredientData } from "../interfaces/ingredient-data-interface";
import update from 'immutability-helper'

export const createOrderThunk = createAsyncThunk<string | null, IOrderRequest, { rejectValue: boolean }>(
    "burgerConstructor/createOrder",
    async (request, thunkAPI) => {
        if (!request.ingredients.length) {
            return thunkAPI.rejectWithValue(true);
        }

        const [ data, hasError ] = await createOrder(request);
    
        if (hasError) {
            return thunkAPI.rejectWithValue(true);
        }
    
        return data;
    }
  );

export interface IBurgerConstructorState {
    ingredients: IIngredientData[],
    bun: IIngredientData | null,
    orderNumber: string | null,
    orderNumberRequest: boolean,
    orderNumberFailed: boolean,
}

const initialState: IBurgerConstructorState = {
    ingredients: [],
    bun: null,
    orderNumber: null,
    orderNumberRequest: false,
    orderNumberFailed: false
}
  
export const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState,
    reducers: {
        updateBun: (state, action: { type: string, payload: IIngredientData }) => {
            state.bun = action.payload;
        },
        add: (state, action: { type: string, payload: IIngredientData }) => {
            state.ingredients = [...state.ingredients, action.payload ];
        },
        delete: (state, action: { type: string, payload: number }) => {
            state.ingredients = state.ingredients.filter((item, index) => index !== action.payload);
        },
        sort: (state, action: { type: string, payload: { dragIndex: number, hoverIndex: number } }) => {
            state.ingredients = update(state.ingredients, {
                $splice: [
                  [action.payload.dragIndex, 1],
                  [action.payload.hoverIndex, 0, state.ingredients[action.payload.dragIndex]],
                ],
            });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrderThunk.pending, (state) => {
                state.orderNumber = null;
                state.orderNumberRequest = true;
                state.orderNumberFailed = false;
            })
            .addCase(createOrderThunk.fulfilled, (state, action) => {
                state.orderNumber = action.payload;
                state.orderNumberRequest = false;
                state.orderNumberFailed = false;
                state.ingredients = [];
                state.bun = null;
            })
            .addCase(createOrderThunk.rejected, (state) => {
                state.orderNumber = null;
                state.orderNumberRequest = false;
                state.orderNumberFailed = true;
            });
    },
});
  
export default burgerConstructorSlice.reducer;