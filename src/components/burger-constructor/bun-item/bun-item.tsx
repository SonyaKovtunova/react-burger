import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import bunItemStyles from './bun-item.module.css';
import { IIngredientData } from "../../../interfaces/ingredient-data-interface";

interface IBunItemItemProps {
    ingredient: IIngredientData,
    type?: 'top' | 'bottom',
}

const BunItem = ({ type = 'top', ingredient }: IBunItemItemProps) => {
    return (
        <div className={bunItemStyles.item}>
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