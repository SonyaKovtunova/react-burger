import { user } from "./constants";
import { getUserThunk, initialState, loginThunk, logoutThunk, registerThunk, sendPasswordResetCodeThunk, updateUserThunk, userSlice } from "./user";

describe("user reducer", () => {
    it("initialize correcty", () => {
        const state = userSlice.reducer(undefined, { type: "" });
        expect(state).toEqual(initialState);
    });

    it("setToken when accessToken does not start with Bearer", () => {
        const action = { type: userSlice.actions.setToken.type, payload: "test" };
        const state = userSlice.reducer(initialState, action);

        expect(state).toEqual({...initialState, token: null });
        const token = localStorage.getItem('token');
        expect(token).toBeNull();
    });

    it("setToken when accessToken starts with Bearer", () => {
        const action = { type: userSlice.actions.setToken.type, payload: "Bearer test" };
        const state = userSlice.reducer(initialState, action);

        expect(state).toEqual({...initialState, token: "test" });
        const token = localStorage.getItem('token');
        expect(token).not.toBeNull();
        expect(token).toEqual("test" );
    });

    it("get user pending", () => {
        const action = { type: getUserThunk.pending.type };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, userRequest: true, canResetPassword: false});
    });

    it("get user fulfilled", () => {
        const action = { type: getUserThunk.fulfilled.type, payload: user };
        const state = userSlice.reducer({...initialState, userRequest: true }, action);
        expect(state).toEqual({...initialState, userRequest: false, user });
    });

    it("get user rejected", () => {
        const action = { type: getUserThunk.rejected.type };
        const state = userSlice.reducer({...initialState, userRequest: true, user }, action);
        expect(state).toEqual({...initialState, userRequest: false, user: null });
    });

    it("update user pending", () => {
        const action = { type: updateUserThunk.pending.type };
        const state = userSlice.reducer({...initialState, canResetPassword: true }, action);
        expect(state).toEqual({...initialState, canResetPassword: false});
    });

    it("update user fulfilled", () => {
        const action = { type: updateUserThunk.fulfilled.type, payload: user };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, user });
    });

    it("update user rejected", () => {
        const action = { type: updateUserThunk.rejected.type };
        const state = userSlice.reducer({...initialState, user }, action);
        expect(state).toEqual({...initialState, user: null });
    });

    it("login pending", () => {
        const action = { type: loginThunk.pending.type };
        const state = userSlice.reducer({...initialState, canResetPassword: true, token: "test", user }, action);
        expect(state).toEqual({...initialState, canResetPassword: false, token: null, user: null, });
    });

    it("login fulfilled", () => {
        const action = { type: loginThunk.fulfilled.type, payload: user };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, user });
    });

    it("login rejected", () => {
        const action = { type: loginThunk.rejected.type };
        const state = userSlice.reducer({...initialState, user }, action);
        expect(state).toEqual({...initialState, user: null });
    });

    it("register pending", () => {
        const action = { type: registerThunk.pending.type };
        const state = userSlice.reducer({...initialState, canResetPassword: true, token: "test", user }, action);
        expect(state).toEqual({...initialState, canResetPassword: false, token: null, user: null, });
    });

    it("register fulfilled", () => {
        const action = { type: registerThunk.fulfilled.type, payload: user };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, user });
    });

    it("register rejected", () => {
        const action = { type: registerThunk.rejected.type };
        const state = userSlice.reducer({...initialState, user }, action);
        expect(state).toEqual({...initialState, user: null });
    });

    it("logout pending", () => {
        const action = { type: logoutThunk.pending.type };
        const state = userSlice.reducer({...initialState, user, canResetPassword: true}, action);
        expect(state).toEqual({...initialState, user: null, canResetPassword: false });
    });

    it("send password reset code pending", () => {
        const action = { type: sendPasswordResetCodeThunk.pending.type };
        const state = userSlice.reducer({...initialState, canResetPassword: true }, action);
        expect(state).toEqual({...initialState, canResetPassword: false, token: null, user: null, });
    });

    it("send password reset code fulfilled", () => {
        const action = { type: sendPasswordResetCodeThunk.fulfilled.type };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, canResetPassword: true });
    });

    it("send password reset code rejected", () => {
        const action = { type: sendPasswordResetCodeThunk.rejected.type };
        const state = userSlice.reducer({...initialState, canResetPassword: true}, action);
        expect(state).toEqual({...initialState, canResetPassword: false });
    });
});