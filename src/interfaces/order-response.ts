export interface IOrderResponse {
    name: string,
    order: {
        number: string,
    },
    success: boolean,
}