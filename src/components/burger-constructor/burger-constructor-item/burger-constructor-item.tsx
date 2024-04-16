import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorItemStyles from './burger-constructor-item.module.css';
import { IIngridientData } from "../../../interfaces/selected-ingridient-interface";

interface IBurgerConstructorItemProps {
    ingridient: IIngridientData
}

const BurgerConstructorItem = (props: IBurgerConstructorItemProps) => {
    return (
        <div className={burgerConstructorItemStyles.item}>
            <DragIcon type="primary" />
            <ConstructorElement 
                text={props.ingridient.name} 
                price={props.ingridient.price} 
                thumbnail={props.ingridient.image} 
            />   
        </div>
    );
}
  
export default BurgerConstructorItem; 