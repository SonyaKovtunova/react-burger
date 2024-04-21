import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder } from "../utils/burger-api";
import { IOrderRequest } from "../interfaces/order-request";

export const createOrderThunk = createAsyncThunk<string | null, IOrderRequest, { rejectValue: boolean }>(
    "burgerConstructor/createOrder",
    async (request, thunkAPI) => {
      const [ data, hasError ] = await createOrder(request);
  
      if (hasError) {
        return thunkAPI.rejectWithValue(true);
      }
  
      return data;
    }
  );

interface IBurgerItemState {
    _id: string,
    count: number
}

export interface IBurgerConstructorState {
    ingredients: IBurgerItemState[],
    orderNumber: string | null,
    orderNumberRequest: boolean,
    orderNumberFailed: boolean,
}

const initialState: IBurgerConstructorState = {
    ingredients: [],
    orderNumber: null,
    orderNumberRequest: false,
    orderNumberFailed: false
}
  
export const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState,
    reducers: {
        add: (state, action: { type: string, payload: string }) => {
            const ingredients = [...state.ingredients];

            const ingredient = ingredients.find(item => item._id === action.payload);

            if (!ingredient) {
                ingredients.push({ _id: action.payload, count: 1 });
            }
            else {
                ingredient.count++;
            }

            state.ingredients = ingredients;
        },
        delete: (state, action: { type: string, payload: string }) => {
            state.ingredients = state.ingredients.filter(item => item._id !== action.payload);
        },
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
            })
            .addCase(createOrderThunk.rejected, (state) => {
                state.orderNumber = null;
                state.orderNumberRequest = false;
                state.orderNumberFailed = true;
            });
    },
});
  
export default burgerConstructorSlice.reducer;