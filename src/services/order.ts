import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrder, getOrderWithToken } from "../utils/burger-api";
import { IFeed, IOrder } from "../interfaces/feed";
import { IStoreState } from ".";
import { getCookie } from "../utils/cookies";

export const getOrderThunk = createAsyncThunk<IFeed, { id: string, withToken: boolean }>(
    "order/get",
    async (request, { getState }) => {
        if (request.withToken) {
            const refreshToken = getCookie('token');
            const { token } = (getState() as IStoreState).user;

            if (!refreshToken) {
                return await getOrder(request.id);
            }

            return await getOrderWithToken(request.id, token, refreshToken);
        }

        return await getOrder(request.id);
    }
);

export interface IOrderState {
    order: IOrder | null;
    orderFailed: boolean;
}

const initialState: IOrderState = {
    order: null,
    orderFailed: false,
}
  
export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrder: (state, action: { type: string, payload: IOrder | null }) => {
            state.order = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(getOrderThunk.pending, (state) => {
            state.order = null;
            state.orderFailed = false;
          })
          .addCase(getOrderThunk.fulfilled, (state, action) => {
            state.order = action.payload.orders.length > 0 ? action.payload.orders[0] : null;
            state.orderFailed = !state.order;
          })
          .addCase(getOrderThunk.rejected, (state) => {
            state.order = null;
            state.orderFailed = true;
          })
    },
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;