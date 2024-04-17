import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from './ingredient.module.css';
import { IIngredientData } from "../../../../interfaces/selected-ingredient-interface";
import { Dispatch, SetStateAction } from "react";
import PropTypes from 'prop-types';

interface IIngredientProps {
    ingredient: IIngredientData,
    openModal: () => void,
    selectIngredientToShow: Dispatch<SetStateAction<IIngredientData | undefined>>,
}

const Ingredient = (props: IIngredientProps) => {

    const selectIngrediaentAndShow = () => {
        props.selectIngredientToShow(props.ingredient);
        props.openModal();
    }

    return (
        <div className={ingredientStyles.ingredient} onClick={selectIngrediaentAndShow}>
            <img className={ingredientStyles.imageWrapper} src={props.ingredient.image}/>
            <p className="text text_type_main-default mt-1">{props.ingredient.price} <CurrencyIcon type="primary" /></p>
            <p className={`text text_type_main-default mt-1 ${ingredientStyles.textCenter}`}>{props.ingredient.name}</p>
            { props.ingredient.isSelected && <Counter count={props.ingredient.count} size="default" />}
        </div>
    );
}

Ingredient.propTypes = {
    ingredient: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        isSelected: PropTypes.bool,
        count: PropTypes.number,
    }).isRequired,
    openModal: PropTypes.func.isRequired,
    selectIngredientToShow: PropTypes.func.isRequired,
};
  
export default Ingredient; 