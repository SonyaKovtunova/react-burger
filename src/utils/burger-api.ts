import { IIngredientsResponse } from "../interfaces/ingredients-response";
import { IIngredientData } from "../interfaces/ingredient-data-interface";
import { IOrderRequest } from "../interfaces/order-request";
import { IOrderResponse } from "../interfaces/order-response";
import { IAuthResponse } from "../interfaces/auth-response";
import { ICommonResponse } from "../interfaces/common-response";
import { IFeed } from "../interfaces/feed";

const URL: string = 'https://norma.nomoreparties.space/api';

export const sendLogin = (email: string, password: string) => {
    const headers: HeadersInit = new Headers();
    headers.set('Content-Type', 'application/json');

    const request: RequestInit = {
        method: 'POST',
        headers,
        body: JSON.stringify({ email, password }),
    };

    return sendRequest(`${URL}/auth/login`, request)
        .then((response) => response as IAuthResponse);
}

export const sendLogout = (token: string) => {
    const headers: HeadersInit = new Headers();
    headers.set('Content-Type', 'application/json');

    const request: RequestInit = {
        method: 'POST',
        headers,
        body: JSON.stringify({ token }),
    };

    return sendRequest(`${URL}/auth/logout`, request)
        .then((response) => response as IAuthResponse);
}

export const sendRegister = (email: string, name: string, password: string) => {
    const headers: HeadersInit = new Headers();
    headers.set('Content-Type', 'application/json');

    const request: RequestInit = {
        method: 'POST',
        headers,
        body: JSON.stringify({ email, name, password }),
    };

    return sendRequest(`${URL}/auth/register`, request)
        .then((response) => response as IAuthResponse);
}

export const sendPasswordResetCode = (email: string) => {
    const headers: HeadersInit = new Headers();
    headers.set('Content-Type', 'application/json');

    const request: RequestInit = {
        method: 'POST',
        headers,
        body: JSON.stringify({ email }),
    };

    return sendRequest(`${URL}/password-reset`, request)
        .then((response) => response as IAuthResponse);
}

export const sendResetPassword = (password: string, token: string) => {
    const headers: HeadersInit = new Headers();
    headers.set('Content-Type', 'application/json');

    const request: RequestInit = {
        method: 'POST',
        headers,
        body: JSON.stringify({ password, token }),
    };

    return sendRequest(`${URL}/password-reset/reset`, request)
        .then((response) => response as IAuthResponse);
}

export const sendGetUser = (accessToken: string | null, refreshToken: string) => {
    const request: RequestInit = {
        method: 'GET',
        headers: new Headers()
    };

    return sendRequestWithRefreshToken(`${URL}/auth/user`, accessToken, refreshToken, request)
        .then((response) => response as IAuthResponse);
}

export const sendUpdateUser = (email: string, name: string, password: string, accessToken: string | null, refreshToken: string) => {
    const headers: HeadersInit = new Headers();
    headers.set('Content-Type', 'application/json');

    const request: RequestInit = {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ email, name, password }),
    };

    return sendRequestWithRefreshToken(`${URL}/auth/user`, accessToken, refreshToken, request)
        .then((response) => response as IAuthResponse);
}

export const getIngredients = () => {
    return sendRequest(`${URL}/ingredients`)
        .then((response) => {
            const data = response as IIngredientsResponse;
            return data.data.map(item => item as IIngredientData);
        });
}

export const createOrder = (data: IOrderRequest) => {
    const headers: HeadersInit = new Headers();
    headers.set('Content-Type', 'application/json');

    const request: RequestInit = {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
    };

    return sendRequest(`${URL}/orders`, request)
        .then((response) => {
            const data = response as IOrderResponse;
            return data.order?.number;
        });
}

export const getOrder = (id: string) => {
    return sendRequest(`${URL}/orders/${id}`)
        .then((response) => {
            const data = response as IFeed;
            return data;
        });
}

const sendRequestWithRefreshToken = (url: string, accessToken: string | null, refreshToken: string, options: RequestInit = {}) => {
    options = resetHeader(options, 'Authorization', `Bearer ${accessToken}`);

    return sendRequest(url, options)
        .then(data => ({ ...data, accessToken : `Bearer ${accessToken}`, refreshToken: refreshToken }))
        .catch((err: ICommonResponse) => {
            return sendRefreshTokenRequest(refreshToken)
                .then(refreshTokenData => {
                    if (refreshTokenData.success) {
                        options = resetHeader(options, 'Authorization', refreshTokenData.accessToken);
                        return sendRequest(url, options)
                            .then(data => ({ 
                                ...data, 
                                accessToken: refreshTokenData.accessToken, 
                                refreshToken: refreshTokenData.refreshToken 
                            }));
                    }

                    return Promise.reject(refreshTokenData);
                });
        });
}

const sendRefreshTokenRequest = (token: string) => {
    const headers: HeadersInit = new Headers();
    headers.set('Content-Type', 'application/json');

    const request: RequestInit = {
        method: 'POST',
        headers,
        body: JSON.stringify({ token }),
    };

    return sendRequest(`${URL}/auth/token`, request)
        .then((response) => response as IAuthResponse);
}

const resetHeader = (options: RequestInit = {}, key: string, value: string) => {
    if (options.headers) {
        const headers = new Headers(options.headers);
        headers.set(key, value);

        options = {
            ...options,
            headers: headers
        }
    }

    return options;
}

const sendRequest = (url: string, options: RequestInit = {}) => fetch(url, options).then(checkResponse);

const checkResponse = (response: Response) => response.ok ? response.json() : response.json().then((err) => Promise.reject(err))