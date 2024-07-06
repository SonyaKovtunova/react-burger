import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import bunItemStyles from './bun-item.module.css';
import { IIngredientData } from "../../../interfaces/ingredient-data-interface";
import { FC } from "react";

type TBunItemItemProps = {
    ingredient: IIngredientData;
    type?: 'top' | 'bottom';
}

const BunItem: FC<TBunItemItemProps> = ({ type = 'top', ingredient }) => {
    return (
        <div className={bunItemStyles.item} data-bun-id={ingredient._id}>
            <div></div>
            <ConstructorElement 
                type={type}
                text={`${ingredient.name} (${type === 'top' ? 'верх' : 'низ'})`}
                price={ingredient.price}
                thumbnail={ingredient.image}
                isLocked
            />   
        </div>
    );
}
  
export default BunItem; 