import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../interfaces/user";
import { sendGetUser, sendLogin, sendLogout, sendPasswordResetCode, sendRegister, sendResetPassword, sendUpdateUser } from "../utils/burger-api";
import { deleteCookie, getCookie, setCookie } from "../utils/cookies";
import { IStoreState } from ".";

const updateRefreshToken = (refreshToken: string) => {
    if (refreshToken) {
        setCookie('token', refreshToken);
    } else {
        deleteCookie('token');
    }
}
  
export const getUserThunk = createAsyncThunk<IUser | null>(
    "user/get",
    async (_, { getState, dispatch }) => {
        const refreshToken = getCookie('token');
        const { token } = (getState() as IStoreState).user;

        if (!refreshToken) {
            return null;
        }
    
        const data = await sendGetUser(token, refreshToken);

        updateRefreshToken(data.refreshToken);
        dispatch(userSlice.actions.setToken(data.accessToken));
        return data.user;
    }
);

export const updateUserThunk = createAsyncThunk<IUser | null, { email: string, name: string, password: string }>(
    "user/update",
    async ({ email, name, password }, { getState, dispatch }) => {
        const refreshToken = getCookie('token');
        const { token } = (getState() as IStoreState).user;

        if (!refreshToken) {
            return null;
        }

        const data = await sendUpdateUser(email, name, password, token, refreshToken);

        updateRefreshToken(data.refreshToken);
        dispatch(userSlice.actions.setToken(data.accessToken));
        return data.user;
    }
);

export const loginThunk = createAsyncThunk<IUser | null, { email: string, password: string }>(
    "user/login",
    async ({ email, password }, { dispatch }) => {
        const data = await sendLogin(email, password);
            
        updateRefreshToken(data.refreshToken);
        dispatch(userSlice.actions.setToken(data.accessToken));
        return data.user;
    }
);
  
export const registerThunk = createAsyncThunk<IUser | null, { email: string, name: string, password: string }>(
    "user/register",
    async ({ email, name, password }, { dispatch }) => {
        const data = await sendRegister(email, name, password);

        updateRefreshToken(data.refreshToken);
        dispatch(userSlice.actions.setToken(data.accessToken));
        return data.user;
    }
);

export const sendPasswordResetCodeThunk = createAsyncThunk<void, { email: string }>(
    "user/sendPasswordResetCode",
    async ({ email }) => {
        const data = await sendPasswordResetCode(email);

        if (data.success) {
            localStorage.setItem('waitForResetPassword', '1');
        }
    }
);
  
export const resetPasswordThunk = createAsyncThunk<void, { password: string, token: string }>(
    "user/sendResetPasswordRequest",
    async ({ password, token }) => {
        await sendResetPassword(password, token);
        localStorage.removeItem('waitForResetPassword');
    }
);
  
export const logoutThunk = createAsyncThunk(
    "user/logout",
    async (_, { dispatch }) => {
        dispatch(userSlice.actions.setToken(null));

        const token = getCookie('token');
        if (!token) {
            return;
        }

        deleteCookie('token');
        await sendLogout(token);
    }
);

export interface IUserState {
    user: IUser | null,
    userRequest: boolean,
    token: string | null,
    canResetPassword: boolean,
}

const initialState: IUserState = {
    user: null,
    userRequest: false,
    token: null,
    canResetPassword: !!localStorage.getItem('waitForResetPassword')
}
  
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action: { type: string, payload: string | null }) => {
            let accessToken = action.payload;
            if (accessToken && accessToken.indexOf('Bearer') === 0) {
                accessToken = accessToken.split('Bearer ')[1];
                state.token = accessToken;
            } else {
                state.token = null;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserThunk.pending, (state) => {
                state.userRequest = true;
                state.canResetPassword = false;
            })
            .addCase(getUserThunk.fulfilled, (state, action) => {
                state.userRequest = false;
                state.user = action.payload;
            })
            .addCase(getUserThunk.rejected, (state) => {
                state.userRequest = false;
                state.user = null;
            })
            .addCase(updateUserThunk.pending, (state) => {
                state.canResetPassword = false;
            })
            .addCase(updateUserThunk.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(updateUserThunk.rejected, (state) => {
                state.user = null;
            })
            .addCase(loginThunk.pending, (state) => {
                state.token = null;
                state.user = null;
                state.canResetPassword = false;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(loginThunk.rejected, (state) => {
                state.user = null;
            })
            .addCase(registerThunk.pending, (state) => {
                state.token = null;
                state.user = null;
                state.canResetPassword = false;
            })
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(registerThunk.rejected, (state) => {
                state.user = null;
            })
            .addCase(logoutThunk.pending, (state) => {
                state.user = null;
                state.canResetPassword = false;
            })
            .addCase(sendPasswordResetCodeThunk.pending, (state) => {
                state.canResetPassword = false;
            })
            .addCase(sendPasswordResetCodeThunk.fulfilled, (state) => {
                state.canResetPassword = true;
            })
            .addCase(resetPasswordThunk.pending, (state) => {
                state.canResetPassword = false;
            });
    },
});

export default userSlice.reducer;