import { IIngredientData } from "./selected-ingredient-interface";

export interface ICategoryData {
    type: string,
    ingredients: IIngredientData[],
}