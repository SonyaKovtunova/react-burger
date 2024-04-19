import { IIngredientsResponse } from "../interfaces/ingredients-response";
import { IIngredientData } from "../interfaces/selected-ingredient-interface";

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