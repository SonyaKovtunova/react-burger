import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorItemStyles from './burger-constructor-item.module.css';
import { IIngredientData } from "../../../interfaces/selected-ingredient-interface";

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
  
export default BurgerConstructorItem; 