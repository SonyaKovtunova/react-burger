import { IIngridientData } from "./selected-ingridient-interface";

export interface ICategoryData {
    type: string,
    ingridients: IIngridientData[],
}