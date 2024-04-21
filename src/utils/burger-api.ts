import { IIngredientsResponse } from "../interfaces/ingredients-response";
import { IIngredientData } from "../interfaces/ingredient-data-interface";
import { IOrderRequest } from "../interfaces/order-request";
import { IOrderResponse } from "../interfaces/order-response";

const URL: string = 'https://norma.nomoreparties.space/api';

export const getIngredients = () : Promise<[IIngredientData[], boolean]> => {
    return fetch(`${URL}/ingredients`)
        .then((response) => response.ok ? response.json() : response.json().then((err) => Promise.reject(err)))
        .then<[IIngredientData[], boolean]>((response) => {
            const data = response as IIngredientsResponse;
            return [ data.data.map(item => item as IIngredientData), false ];
        })
        .catch((error) => {
            return [ [] as IIngredientData[], true ];
        });
}

export const createOrder = (data: IOrderRequest) : Promise<[string | null, boolean]> => {
    const headers: HeadersInit = new Headers();
    headers.set('Content-Type', 'application/json');

    const request: RequestInit = {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
    };

    return fetch(`${URL}/orders`, request)
        .then((response) => response.ok ? response.json() : response.json().then((err) => Promise.reject(err)))
        .then<[string, boolean]>((response) => {
            const data = response as IOrderResponse;
            return [ data.order?.number, !data.success ];
        })
        .catch((error) => {
            return [ null, true ];
        });
}