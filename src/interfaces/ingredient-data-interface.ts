import { IIngredientResponse } from "./ingredients-response";

export interface IIngredientData extends IIngredientResponse {
    dndUniqueId?: string;
}