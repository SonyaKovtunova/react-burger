import { IIngredientData } from "../../../interfaces/selected-ingredient-interface";
import Modal from "../../modal/modal";
import ingredientDetailsStyles from './ingrediaent-details.module.css';

interface IIngredientDetailsProps {
    onClose: any,
    ingredient: IIngredientData
}

const IngredientDetails = (props: IIngredientDetailsProps) => {

    return (
        <Modal title='Детали ингредиента' onClose={props.onClose}>
            <div className={ingredientDetailsStyles.bodyWrapper}>
                <img className={ingredientDetailsStyles.image} src={props.ingredient.image_large}/>
                <p className="text text_type_main-medium pt-4">{props.ingredient.name}</p>  
                <div className={`pt-8 ${ingredientDetailsStyles.nutritionValues}`}>
                    <div className={ingredientDetailsStyles.nutritionValue}>
                        <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                        <p className="text text_type_main-default text_color_inactive pt-2">{props.ingredient.calories}</p>
                    </div>
                    <div className={ingredientDetailsStyles.nutritionValue}>
                        <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                        <p className="text text_type_main-default text_color_inactive pt-2">{props.ingredient.proteins}</p>
                    </div>
                    <div className={ingredientDetailsStyles.nutritionValue}>
                        <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                        <p className="text text_type_main-default text_color_inactive pt-2">{props.ingredient.fat}</p>
                    </div>
                    <div className={ingredientDetailsStyles.nutritionValue}>
                        <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                        <p className="text text_type_main-default text_color_inactive pt-2">{props.ingredient.carbohydrates}</p>
                    </div>
                </div>  
            </div>
        </Modal>
    );
}

export default IngredientDetails;