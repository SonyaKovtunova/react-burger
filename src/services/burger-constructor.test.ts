import { IIngredientData } from '../interfaces/ingredient-data-interface';
import { burgerConstructorSlice, createOrderThunk, initialState } from './burger-constructor';
import { ingredient } from './constants';

describe("burger constructor reducer", () => {
    it("initialize correcty", () => {
        const state = burgerConstructorSlice.reducer(undefined, { type: "" });
        expect(state).toEqual(initialState);
    });

    it("update bun when initial bun is null", () => {
        const action = { type: burgerConstructorSlice.actions.updateBun.type, payload: ingredient };
        const state = burgerConstructorSlice.reducer(initialState, action);

        expect(state).toEqual({...initialState, bun: ingredient });
    });

    it("update bun when initial bun is not null", () => {
        const prevBun: IIngredientData = {
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

        const action = { type: burgerConstructorSlice.actions.updateBun.type, payload: ingredient };
        const state = burgerConstructorSlice.reducer({...initialState, bun: prevBun }, action);

        expect(state).toEqual({...initialState, bun: ingredient });
    });

    it("add ingredient", () => {
        const action = { type: burgerConstructorSlice.actions.addIngredient.type, payload: ingredient };
        const state = burgerConstructorSlice.reducer(initialState, action);

        expect(state).not.toBeNull();
        expect(state.ingredients).not.toBeNull();
        expect(state.ingredients.length).toEqual(1);
        expect(state.ingredients[0]).not.toBeNull();
        expect(state.ingredients[0].dndUniqueId).not.toBeNull();
        expect(state).toEqual({...initialState, ingredients: [...initialState.ingredients, ingredient] });
    });

    it("delete element when index is not found", () => {
        const prevState = {...initialState, ingredients: [ingredient] };

        const action = { type: burgerConstructorSlice.actions.deleteIngredient.type, payload: 1 };
        const state = burgerConstructorSlice.reducer(prevState, action);

        expect(state).toEqual(prevState);
    });

    it("delete element when index is found", () => {
        const prevState = {...initialState, ingredients: [ingredient] };

        const action = { type: burgerConstructorSlice.actions.deleteIngredient.type, payload: 0 };
        const state = burgerConstructorSlice.reducer(prevState, action);

        expect(state).toEqual({...prevState, ingredients: []});
    });

    it("sort ingredients", () => {
        const ingredient2: IIngredientData = {
            _id: "test2",
            name: "test2",
            proteins: 1,
            fat: 1,
            carbohydrates: 1,
            calories: 1,
            price: 1,
            image: "test2",
            image_mobile: "test2",
            image_large: "test2",
            type: "test2",
        };
        const prevState = {...initialState, ingredients: [ingredient, ingredient2] };

        const action = { type: burgerConstructorSlice.actions.sortIngredients.type, payload: { dragIndex: 0, hoverIndex: 1 } };
        const state = burgerConstructorSlice.reducer(prevState, action);

        expect(state).toEqual({...prevState, ingredients: [ingredient2, ingredient]});
    });

    it("clear order number", () => {
        const action = { type: burgerConstructorSlice.actions.clearOrderNumber.type };
        const state = burgerConstructorSlice.reducer({ ...initialState, orderNumber: "test" }, action);

        expect(state).toEqual(initialState);
    });

    it("create order pending", () => {
        const action = { type: createOrderThunk.pending.type };
        const state = burgerConstructorSlice.reducer(initialState, action);

        expect(state).toEqual({...initialState, orderNumber: null, orderNumberRequest: true, orderNumberFailed: false });
    });

    it("create order fulfilled", () => {
        const action = { type: createOrderThunk.fulfilled.type, payload: "test" };
        const state = burgerConstructorSlice.reducer({ ...initialState, ingredients: [ingredient], bun: ingredient, orderNumberRequest: true }, action);

        expect(state).toEqual({...initialState, orderNumber: "test", orderNumberRequest: false, orderNumberFailed: false, ingredients: [], bun: null });
    });

    it("create order rejected", () => {
        const action = { type: createOrderThunk.rejected.type };
        const state = burgerConstructorSlice.reducer({...initialState, orderNumber: "test", orderNumberRequest: true }, action);

        expect(state).toEqual({...initialState, orderNumber: null, orderNumberRequest: false, orderNumberFailed: true });
    });
});