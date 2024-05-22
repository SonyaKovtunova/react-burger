import { IIngredientsResponse } from "../interfaces/ingredients-response";
import { IIngredientData } from "../interfaces/ingredient-data-interface";
import { IOrderRequest } from "../interfaces/order-request";
import { IOrderResponse } from "../interfaces/order-response";
import { IAuthResponse } from "../interfaces/auth-response";

const URL: string = 'https://norma.nomoreparties.space/api';

export const login = (email: string, password: string) : Promise<IAuthResponse> => {
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

export const logout = (token: string) : Promise<IAuthResponse> => {
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

export const refreshToken = (token: string) : Promise<IAuthResponse> => {
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

export const register = (email: string, name: string, password: string) : Promise<IAuthResponse> => {
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

export const sendPasswordResetCode = (email: string) : Promise<IAuthResponse> => {
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

export const resetPassword = (password: string, token: string) : Promise<IAuthResponse> => {
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

export const getUser = (token: string) : Promise<IAuthResponse> => {
    const headers: HeadersInit = new Headers();
    headers.set('Authorization', `Bearer ${token}`);
    
    const request: RequestInit = {
        method: 'GET',
        headers,
    };

    return sendRequest(`${URL}/auth/user`, request)
        .then((response) => response as IAuthResponse);
}

export const getIngredients = () : Promise<IIngredientData[]> => {
    return sendRequest(`${URL}/ingredients`)
        .then((response) => {
            const data = response as IIngredientsResponse;
            return data.data.map(item => item as IIngredientData);
        });
}

export const createOrder = (data: IOrderRequest) : Promise<string> => {
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

const sendRequest = (url: string, options: RequestInit = {}) => fetch(url, options).then(checkResponse);

const checkResponse = (response: Response) => response.ok ? response.json() : response.json().then((err) => Promise.reject(err))