import burgerConstructorStyles from './burger-constructor.module.css';
import BurgerConstructorItem from './burger-constructor-item/burger-constructor-item';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredientData } from '../../interfaces/selected-ingredient-interface';

interface IBurgerConstructorProps {
    selectedIngredient: IIngredientData[]
}

const BurgerConstructor = (props: IBurgerConstructorProps) => {

    const sum = props.selectedIngredient.reduce((result, item) => result + item.count * item.price, 0);

    return (
        <div className={burgerConstructorStyles.burgerConstructor}>
            <div className={burgerConstructorStyles.list}>
                {
                    props.selectedIngredient.map((selectedIngredient, index) => {
                        return <BurgerConstructorItem key={index} ingredient={selectedIngredient} />
                    })
                }    
            </div>
            <div className={burgerConstructorStyles.orderWrapper}>
                <div></div>
                <div className={burgerConstructorStyles.sumWrapper}>
                    <p className="text text_type_main-large">{sum} <CurrencyIcon type="primary" /></p>
                </div>
                <div className={burgerConstructorStyles.buttonWrapper}>
                    <Button htmlType="button" type="primary" size="large">
                        Оформить заказ
                    </Button>    
                </div>
                
            </div>
        </div>
    );
}
  
export default BurgerConstructor; 