import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../interfaces/user";
import { sendGetUserRequest, sendLoginRequest, sendLogoutRequest, sendPasswordResetCodeRequest, sendRegisterRequest, sendResetPasswordRequest, sendUpdateUserRequest } from "../utils/burger-api";
import { IAuthResponse } from "../interfaces/auth-response";
import { deleteCookie, getCookie, setCookie } from "../utils/cookies";

const setTokens = (data: IAuthResponse) => {
    updateRefreshToken(data.refreshToken);
    updateAccessToken(data.accessToken);
}

const updateRefreshToken = (refreshToken: string) => {
    if (refreshToken) {
        setCookie('token', refreshToken);
    } else {
        deleteCookie('token');
    }
}
  
const updateAccessToken = (accessToken: string) => {
    if (accessToken && accessToken.indexOf('Bearer') === 0) {
        const authToken = accessToken.split('Bearer ')[1];
        localStorage.setItem('token', authToken);
    } else {
        localStorage.removeItem('token');
    }
}
  
export const getUserThunk = createAsyncThunk<IUser | null>(
    "user/get",
    async () => {
        const refreshToken = getCookie('token');
        const accessToken = localStorage.getItem('token');
        if (!refreshToken || !accessToken) {
            return null;
        }
    
        const data = await sendGetUserRequest(accessToken, refreshToken);

        setTokens(data);
        return data.user;
    }
);

export const updateUserThunk = createAsyncThunk<IUser | null, { email: string, name: string, password: string }>(
    "user/update",
    async ({ email, name, password }) => {
        const refreshToken = getCookie('token');
        const accessToken = localStorage.getItem('token');
        if (!refreshToken || !accessToken) {
            return null;
        }

        const data = await sendUpdateUserRequest(email, name, password, accessToken, refreshToken);

        setTokens(data);
        return data.user;
    }
);

export const loginThunk = createAsyncThunk<IUser | null, { email: string, password: string }>(
    "user/login",
    async ({ email, password }) => {
        const data = await sendLoginRequest(email, password);
            
        setTokens(data);
        return data.user;
    }
);
  
export const registerThunk = createAsyncThunk<IUser | null, { email: string, name: string, password: string }>(
    "user/register",
    async ({ email, name, password }) => {
        const data = await sendRegisterRequest(email, name, password);

        setTokens(data);
        return data.user;
    }
);

export const sendPasswordResetCodeThunk = createAsyncThunk<void, { email: string }>(
    "user/sendPasswordResetCode",
    async ({ email }) => {
        var data = await sendPasswordResetCodeRequest(email);

        if (data.success) {
            localStorage.setItem('waitForResetPassword', '1');
        }
    }
);
  
export const resetPasswordThunk = createAsyncThunk<void, { password: string, token: string }>(
    "user/sendResetPasswordRequest",
    async ({ password, token }) => {
        await sendResetPasswordRequest(password, token);
        localStorage.removeItem('waitForResetPassword');
    }
);
  
export const logoutThunk = createAsyncThunk(
    "user/logout",
    async () => {
        localStorage.removeItem('token');

        const token = getCookie('token');
        if (!token) {
            return;
        }

        deleteCookie('token');
        await sendLogoutRequest(token);
    }
);

export interface IUserState {
    user: IUser | null,
    canResetPassword: boolean,
}

const initialState: IUserState = {
    user: null,
    canResetPassword: !!localStorage.getItem('waitForResetPassword')
}
  
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserThunk.pending, (state) => {
                state.canResetPassword = false;
            })
            .addCase(getUserThunk.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(getUserThunk.rejected, (state) => {
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