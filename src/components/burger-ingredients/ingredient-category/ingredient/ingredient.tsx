import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from './ingredient.module.css';
import { IIngredientData } from "../../../../interfaces/ingredient-data-interface";
import { IStoreState, useAppDispatch } from "../../../../services";
import { setSelectedIngredient } from "../../../../services/burger-ingredients";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { CATEGORIES, INGREDIENT_DND_NAME } from "../../../../utils/constants";

interface IIngredientProps {
    ingredient: IIngredientData,
}

const Ingredient = (props: IIngredientProps) => {
    
    const count = useSelector<IStoreState, number>(store => 
        props.ingredient.type === CATEGORIES[0].type 
            && store.burgerConstructor.bun 
            && store.burgerConstructor.bun._id === props.ingredient._id 
            ? 2
            : store.burgerConstructor.ingredients.filter(item => item._id === props.ingredient._id).length);

    const dispatch = useAppDispatch();

    const [ , dragRef ] = useDrag({
        type: INGREDIENT_DND_NAME,
        item: { data: props.ingredient },
    });
    
    const selectIngredient = () => {
        dispatch(setSelectedIngredient(props.ingredient));
    }

    return (
        <div className={ingredientStyles.ingredient} onClick={selectIngredient} ref={dragRef}>
            <img className={ingredientStyles.imageWrapper} src={props.ingredient.image}/>
            <p className="text text_type_main-default mt-1">{props.ingredient.price} <CurrencyIcon type="primary" /></p>
            <p className={`text text_type_main-default mt-1 ${ingredientStyles.textCenter}`}>{props.ingredient.name}</p>
            { count > 0 && <Counter count={count} size="default" />}
        </div>
    );
}
  
export default Ingredient; 