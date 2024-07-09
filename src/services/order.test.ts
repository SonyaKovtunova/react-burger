import { IOrder, IOrders } from "../interfaces/orders";
import { getOrderThunk, initialState, orderSlice } from "./order";

describe("order reducer", () => {
    it("initialize correcty", () => {
        const state = orderSlice.reducer(undefined, { type: "" });
        expect(state).toEqual(initialState);
    });

    it("set order", () => {
        const payload: IOrder = {
            ingredients: [],
            _id: "test",
            status: "test",
            name: "test",
            number: 1,
            createdAt: "test",
            updatedAt: "test"
        };

        const action = { type: orderSlice.actions.setOrder.type, payload };
        const state = orderSlice.reducer(initialState, action);

        expect(state).toEqual({...initialState, order: payload });
    });

    it("set null order", () => {
        const order: IOrder = {
            ingredients: [],
            _id: "test",
            status: "test",
            name: "test",
            number: 1,
            createdAt: "test",
            updatedAt: "test"
        };

        const action = { type: orderSlice.actions.setOrder.type, payload: null };
        const state = orderSlice.reducer({...initialState, order: order }, action);

        expect(state).toEqual(initialState);
    });

    it("get order pending", () => {
        const action = { type: getOrderThunk.pending.type };
        const state = orderSlice.reducer(initialState, action);

        expect(state).toEqual(initialState);
    });

    it("get order fulfilled", () => {
        const orders: IOrders = {
            success: true,
            orders: [
                {
                    ingredients: [],
                    _id: "test",
                    status: "test",
                    name: "test",
                    number: 1,
                    createdAt: "test",
                    updatedAt: "test"
                }
            ],
            total: 100,
            totalToday: 10
        };

        const action = { type: getOrderThunk.fulfilled.type, payload: orders };
        const state = orderSlice.reducer(initialState, action);

        expect(state).toEqual({...initialState, order: orders.orders[0] });
    });

    it("get order rejected", () => {
        const action = { type: getOrderThunk.rejected.type };
        const state = orderSlice.reducer(initialState, action);

        expect(state).toEqual({...initialState, orderFailed: true });
    });
});