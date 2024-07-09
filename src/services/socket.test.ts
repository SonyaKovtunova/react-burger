import { IOrders } from "../interfaces/orders";
import { initialState, socketSlice } from "./socket";

describe("socket reducer", () => {
    it("initialize correcty", () => {
        const state = socketSlice.reducer(undefined, { type: "" });
        expect(state).toEqual(initialState);
    });

    it("open", () => {
        const action = { type: socketSlice.actions.open.type, payload: { url: "test" } };
        const state = socketSlice.reducer(initialState, action);

        expect(state).toEqual(initialState);
    });

    it("onOpen", () => {
        const action = { type: socketSlice.actions.onOpen.type };
        const state = socketSlice.reducer(initialState, action);

        expect(state).toEqual({ ...initialState, isConnected: true });
    });

    it("setError", () => {
        const action = { type: socketSlice.actions.setError.type, payload: {} as Event };
        const state = socketSlice.reducer(initialState, action);

        expect(state).toEqual({ ...initialState, error: {} });
    });

    it("close", () => {
        const action = { type: socketSlice.actions.close.type };
        const state = socketSlice.reducer(initialState, action);

        expect(state).toEqual(initialState);
    });

    it("onClose", () => {
        const action = { type: socketSlice.actions.onClose.type };
        const state = socketSlice.reducer(initialState, action);

        expect(state).toEqual(initialState);
    });

    it("setOrders", () => {
        const orders: IOrders = {
            success: true,
            orders: [],
            total: 100,
            totalToday: 10
        };

        const action = { type: socketSlice.actions.setOrders.type, payload: orders };
        const state = socketSlice.reducer(initialState, action);

        expect(state).toEqual({...initialState, orders });
    });
});