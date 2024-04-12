import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngridient } from "../../../interfaces/ingridient-interface";
import burgerConstructorItemStyles from './burger-constructor-item.module.css';

interface IBurgerConstructorItemProps {
    ingridient: IIngridient
}

const BurgerConstructorItem = (props: IBurgerConstructorItemProps) => {
    return (
        <div className={burgerConstructorItemStyles.item}>
            <DragIcon type="primary" />
            <div className={burgerConstructorItemStyles.burgerConstructorElementWrapper}>
                <ConstructorElement 
                    text={props.ingridient.name} 
                    price={props.ingridient.price} 
                    thumbnail={props.ingridient.image} 
                    extraClass={burgerConstructorItemStyles.burgerConstructorElement}
                />    
            </div>
        </div>
    );
}
  
export default BurgerConstructorItem; 