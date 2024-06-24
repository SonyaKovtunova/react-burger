export interface IFeed {
    success: boolean,
    orders: Array<IOrder>,
    total: number,
    totalToday: number
}

export interface IOrder {
    ingredients: Array<string>,
    _id: string,
    status: string,
    name: string,
    number: number,
    createdAt: string,
    updatedAt: string
}