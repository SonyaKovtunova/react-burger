import { IIngredientData } from "../interfaces/ingredient-data-interface";

export const getInredientsSum = (ingredients: IIngredientData[] | undefined) => {
    return ingredients?.reduce((result, item) => result + (item?.price ?? 0), 0) ?? 0;
}