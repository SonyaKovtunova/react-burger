import { FC } from "react";
import { IIngredientData } from "../../../interfaces/ingredient-data-interface";
import ingredientDetailsStyles from './ingredient-details.module.css';

type TIngredientDetailsProps = {
    ingredient: IIngredientData;
}

const IngredientDetails: FC<TIngredientDetailsProps> = ({ ingredient }) => {
    return (
        <div className={ingredientDetailsStyles.bodyWrapper} data-selected-ingredient-id={ingredient._id}>
            <img className={ingredientDetailsStyles.image} src={ingredient.image_large}/>
            <p className="text text_type_main-medium pt-4">{ingredient.name}</p>  
            <div className={`pt-8 ${ingredientDetailsStyles.nutritionValues}`}>
                <div className={ingredientDetailsStyles.nutritionValue}>
                    <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                    <p className="text text_type_main-default text_color_inactive pt-2">{ingredient.calories}</p>
                </div>
                <div className={ingredientDetailsStyles.nutritionValue}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_main-default text_color_inactive pt-2">{ingredient.proteins}</p>
                </div>
                <div className={ingredientDetailsStyles.nutritionValue}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_main-default text_color_inactive pt-2">{ingredient.fat}</p>
                </div>
                <div className={ingredientDetailsStyles.nutritionValue}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_main-default text_color_inactive pt-2">{ingredient.carbohydrates}</p>
                </div>
            </div>  
        </div>
    );
}

export default IngredientDetails;