import { IIngredientData } from "../interfaces/ingredient-data-interface";
import { burgerIngredientsSlice, getIngredientsThunk, initialState } from "./burger-ingredients";
import { ingredient } from "./constants";

describe("burger ingredients reducer", () => {
    it("initialize correcty", () => {
        const state = burgerIngredientsSlice.reducer(undefined, { type: "" });
        expect(state).toEqual(initialState);
    });

    it("set tab", () => {
        const action = { type: burgerIngredientsSlice.actions.setTab.type, payload: "tab 2" };
        const state = burgerIngredientsSlice.reducer({...initialState, currentTab: "tab 1" }, action);

        expect(state).toEqual({...initialState, currentTab: "tab 2" });
    });

    it("set selected ingredient", () => {
        const prevelectedIngredient: IIngredientData = {
            _id: "test prev",
            name: "test prev",
            proteins: 2,
            fat: 2,
            carbohydrates: 2,
            calories: 2,
            price: 2,
            image: "test prev",
            image_mobile: "test prev",
            image_large: "test prev",
            type: "test prev",
        };

        const action = { type: burgerIngredientsSlice.actions.setSelectedIngredient.type, payload: ingredient };
        const state = burgerIngredientsSlice.reducer({...initialState, selectedIngredient: prevelectedIngredient }, action);

        expect(state).toEqual({...initialState, selectedIngredient: ingredient });
    });

    it("clear selected ingredient", () => {
        const action = { type: burgerIngredientsSlice.actions.clearSelectedIngredient.type };
        const state = burgerIngredientsSlice.reducer({...initialState, selectedIngredient: ingredient }, action);

        expect(state).toEqual(initialState);
    });

    it("get ingredients pending", () => {
        const action = { type: getIngredientsThunk.pending.type };
        const state = burgerIngredientsSlice.reducer(initialState, action);

        expect(state).toEqual({...initialState, ingredientsRequest: true, ingredientsFailed: false });
    });

    it("get ingredients fulfilled", () => {
        const action = { type: getIngredientsThunk.fulfilled.type, payload: [ingredient] };
        const state = burgerIngredientsSlice.reducer({ ...initialState, ingredientsRequest: true }, action);

        expect(state).toEqual({...initialState, ingredients: [ingredient], ingredientsRequest: false, ingredientsFailed: false });
    });

    it("get ingredients rejected", () => {
        const action = { type: getIngredientsThunk.rejected.type };
        const state = burgerIngredientsSlice.reducer({...initialState, ingredientsRequest: true }, action);

        expect(state).toEqual({...initialState, ingredientsRequest: false, ingredientsFailed: true });
    });
});