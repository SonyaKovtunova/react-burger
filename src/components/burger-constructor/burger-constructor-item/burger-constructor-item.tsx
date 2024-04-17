import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorItemStyles from './burger-constructor-item.module.css';
import { IIngredientData } from "../../../interfaces/selected-ingredient-interface";
import PropTypes from 'prop-types';

interface IBurgerConstructorItemProps {
    ingredient: IIngredientData,
}

const BurgerConstructorItem = (props: IBurgerConstructorItemProps) => {
    return (
        <div className={burgerConstructorItemStyles.item}>
            <DragIcon type="primary" />
            <ConstructorElement 
                text={props.ingredient.name} 
                price={props.ingredient.price} 
                thumbnail={props.ingredient.image} 
            />   
        </div>
    );
}

BurgerConstructorItem.propTypes = {
    ingredient: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
};
  
export default BurgerConstructorItem; 