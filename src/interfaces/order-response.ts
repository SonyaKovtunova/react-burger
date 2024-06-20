import { ICommonResponse } from "./common-response";

export interface IOrderResponse extends ICommonResponse {
    name: string,
    order: {
        number: string,
    },
}