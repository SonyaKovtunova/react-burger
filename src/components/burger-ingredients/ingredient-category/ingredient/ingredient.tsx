import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from './ingredient.module.css';
import { IIngredientData } from "../../../../interfaces/ingredient-data-interface";
import { IStoreState, useAppDispatch } from "../../../../services";
import { setSelectedIngredient } from "../../../../services/burger-ingredients";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { CATEGORIES, INGREDIENT_DND_NAME } from "../../../../utils/constants";
import { Link, useLocation } from "react-router-dom";
import { FC } from "react";

type TIngredientProps = {
    ingredient: IIngredientData;
}

const Ingredient: FC<TIngredientProps> = ({ ingredient }) => {
    
    const count = useSelector<IStoreState, number>(store => 
        ingredient.type === CATEGORIES[0].type 
            && store.burgerConstructor.bun 
            && store.burgerConstructor.bun._id === ingredient._id 
            ? 2
            : store.burgerConstructor.ingredients.filter(item => item._id === ingredient._id).length);

    const dispatch = useAppDispatch();

    const [ , dragRef ] = useDrag({
        type: INGREDIENT_DND_NAME,
        item: { data: ingredient },
    });
    
    const location = useLocation();
    
    const selectIngredient = () => {
        dispatch(setSelectedIngredient(ingredient));
    }

    return (
        <Link to={`/ingredients/${ingredient._id}`} state={{ background: location }} className={ingredientStyles.link}>
            <div className={ingredientStyles.ingredient} onClick={selectIngredient} ref={dragRef}>
                <img className={ingredientStyles.imageWrapper} src={ingredient.image}/>
                <p className="text text_type_main-default mt-1">{ingredient.price} <CurrencyIcon type="primary" /></p>
                <p className={`text text_type_main-default mt-1 ${ingredientStyles.textCenter}`}>{ingredient.name}</p>
                { count > 0 && <Counter count={count} size="default" />}
            </div>    
        </Link>
    );
}
  
export default Ingredient; 