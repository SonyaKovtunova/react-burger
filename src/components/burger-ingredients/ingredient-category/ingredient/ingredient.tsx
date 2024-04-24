import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from './ingredient.module.css';
import { IIngredientData } from "../../../../interfaces/ingredient-data-interface";
import { useAppDispatch } from "../../../../services";
import { burgerIngredientsSlice } from "../../../../services/burger-ingredients";
import { useSelector } from "react-redux";
import { IBurgerConstructorState } from "../../../../services/burger-constructor";
import { useDrag } from "react-dnd";
import { CATEGORIES } from "../../../../utils/constants";

interface IIngredientProps {
    ingredient: IIngredientData,
}

const Ingredient = (props: IIngredientProps) => {
    
    const { count } = useSelector<{ burgerConstructor: IBurgerConstructorState }, { count: number }>(store => ({
        count: props.ingredient.type === CATEGORIES[0].type && store.burgerConstructor.bun && store.burgerConstructor.bun._id === props.ingredient._id 
            ? 2
            : store.burgerConstructor.ingredients.filter(item => item._id === props.ingredient._id).length
    }));

    const dispatch = useAppDispatch();

    const [ , dragRef ] = useDrag({
        type: 'ingredients',
        item: { data: props.ingredient },
    });
    
    const selectIngredient = () => {
        dispatch(burgerIngredientsSlice.actions.setSelectedIngredientId(props.ingredient._id));
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