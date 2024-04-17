import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from './ingredient.module.css';
import { IIngredientData } from "../../../../interfaces/selected-ingredient-interface";

interface IIngredientProps {
    ingredient: IIngredientData,
}

const Ingredient = (props: IIngredientProps) => {
    return (
        <div className={ingredientStyles.ingredient}>
            <img className={ingredientStyles.imageWrapper} src={props.ingredient.image}/>
            <p className="text text_type_main-default mt-1">{props.ingredient.price} <CurrencyIcon type="primary" /></p>
            <p className={`text text_type_main-default mt-1 ${ingredientStyles.textCenter}`}>{props.ingredient.name}</p>
            { props.ingredient.isSelected && <Counter count={props.ingredient.count} size="default" />}
        </div>
    );
}
  
export default Ingredient; 