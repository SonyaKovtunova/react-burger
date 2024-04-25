import { IIngredientsResponse } from "../interfaces/ingredients-response";
import { IIngredientData } from "../interfaces/ingredient-data-interface";
import { IOrderRequest } from "../interfaces/order-request";
import { IOrderResponse } from "../interfaces/order-response";

const URL: string = 'https://norma.nomoreparties.space/api';

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