import { ISelectedIngridient } from "./selected-ingridient-interface";

export interface ICategory {
    type: string,
    ingridients: ISelectedIngridient[],
}