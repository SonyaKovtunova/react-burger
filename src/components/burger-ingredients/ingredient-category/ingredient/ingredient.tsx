import { Button, Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from './ingredient.module.css';
import { IIngredientData } from "../../../../interfaces/ingredient-data-interface";
import { useAppDispatch } from "../../../../services";
import { burgerIngredientsSlice } from "../../../../services/burger-ingredients";
import { useSelector } from "react-redux";
import { IBurgerConstructorState, burgerConstructorSlice } from "../../../../services/burger-constructor";
import { SyntheticEvent, useState } from "react";

interface IIngredientProps {
    ingredient: IIngredientData,
}

const Ingredient = (props: IIngredientProps) => {
    
    const { count } = useSelector<{ burgerConstructor: IBurgerConstructorState }, { count: number }>(store => ({
        count: store.burgerConstructor.ingredients.find(item => item._id === props.ingredient._id)?.count ?? 0
    }));

    const dispatch = useAppDispatch();
    const [ isButtonShow, setIsButtonShow ] = useState(false);

    const selectIngredient = () => {
        dispatch(burgerIngredientsSlice.actions.setSelectedIngredientId(props.ingredient._id));
    }

    const showButton = () => {
        setIsButtonShow(true);
    }

    const hideButton = () => {
        setIsButtonShow(false);
    }

    const addIngredient = (e: SyntheticEvent) => {
        e.stopPropagation();
        dispatch(burgerConstructorSlice.actions.add(props.ingredient._id));
    }

    return (
        <div className={ingredientStyles.ingredient} onClick={selectIngredient} onMouseEnter={showButton} onMouseLeave={hideButton}>
            <img className={ingredientStyles.imageWrapper} src={props.ingredient.image}/>
            <p className="text text_type_main-default mt-1">{props.ingredient.price} <CurrencyIcon type="primary" /></p>
            <p className={`text text_type_main-default mt-1 ${ingredientStyles.textCenter}`}>{props.ingredient.name}</p>
            { count > 0 && <Counter count={count} size="default" />}
            { isButtonShow && 
                <Button htmlType="button" type="primary" size="small" extraClass={`${ingredientStyles.addButton}`} onClick={addIngredient}>
                    +
                </Button>
            }
        </div>
    );
}
  
export default Ingredient; 