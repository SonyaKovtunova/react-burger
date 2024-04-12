import { IIngridient } from "./ingridient-interface";

export interface ICategory {
    type: string,
    ingridients: IIngridient[],
}