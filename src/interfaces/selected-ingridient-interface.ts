import { IIngridientResponse } from "./ingridients-response";

export interface IIngridientData extends IIngridientResponse {
    count: number,
    isSelected: boolean,
}