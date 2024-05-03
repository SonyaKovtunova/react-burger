import { IIngredientData } from "./ingredient-data-interface";

export interface ICategoryData {
    type: string,
    ingredients: IIngredientData[],
}