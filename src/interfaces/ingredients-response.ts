import { ICommonResponse } from "./common-response";

export interface IIngredientsResponse extends ICommonResponse {
    data: IIngredientResponse[]
}

export interface IIngredientResponse {
    _id: string,
    name: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    type: string,
}