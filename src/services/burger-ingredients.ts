import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IIngredientData } from "../interfaces/ingredient-data-interface";
import { getIngredients } from "../utils/burger-api";
import { CATEGORIES } from "../utils/constants";

export const getIngredientsThunk = createAsyncThunk<IIngredientData[], void, { rejectValue: boolean }>(
  "burgerIngredients/getIngredientsThunk",
  async () => {
    return await getIngredients();
  }
);
  
export interface IBurgerIngredientsState {
  ingredients: IIngredientData[],
  ingredientsRequest: boolean,
  ingredientsFailed: boolean,
  currentTab: string,
  selectedIngredient: IIngredientData | null,
}

const initialState: IBurgerIngredientsState = {
  ingredients: [] as IIngredientData[],
  ingredientsRequest: false,
  ingredientsFailed: false,
  currentTab: CATEGORIES[0].type,
  selectedIngredient: null
}
  
export const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {
    setTab: (state, action: { type: string, payload: string }) => {
      state.currentTab = action.payload;
    },
    setSelectedIngredient: (state, action: { type: string, payload: IIngredientData }) => {
      state.selectedIngredient = action.payload;
    },
    clearSelectedIngredient: (state) => {
      state.selectedIngredient = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.pending, (state) => {
        state.ingredientsRequest = true;
        state.ingredientsFailed = false;
      })
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.ingredientsRequest = false;
        state.ingredients = action.payload;
        state.ingredientsFailed = false;
      })
      .addCase(getIngredientsThunk.rejected, (state) => {
        state.ingredientsRequest = false;
        state.ingredientsFailed = true;
      });
    },
});
  
export const { setTab, setSelectedIngredient, clearSelectedIngredient } = burgerIngredientsSlice.actions;
export default burgerIngredientsSlice.reducer;