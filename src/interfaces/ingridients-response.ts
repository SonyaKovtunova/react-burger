export interface IIngridientsResponse {
    success: boolean,
    data: IIngridientResponse[]
}

export interface IIngridientResponse {
    _id: string,
    name: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    type: string,
}