import { FC, useMemo } from "react";
import { IOrder } from "../../../interfaces/orders";
import { useAppSelector } from "../../../services";
import { IIngredientData } from "../../../interfaces/ingredient-data-interface";
import { getInredientsSum } from "../../../utils/utils";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './order.module.css';

type TOrderProps = {
    order: IOrder;
}

const Order: FC<TOrderProps> = ({ order }) => {
    const ingredients = useAppSelector(store => store.burgerIngredients.ingredients);

    const orderIngredients = useMemo(() => 
        order.ingredients
            .map(ingredientId => ingredients.find(ingredient => ingredient._id === ingredientId))
            .filter(ingredient => !!ingredient)
            .map(ingredient => ingredient as IIngredientData), 
        [order, ingredients]);

    const sum = useMemo(() => getInredientsSum(orderIngredients), [orderIngredients]);
    
    return (
        <div className={styles.order}>
            <div className={styles.row}>
                <p className="text text_type_digits-default">#{order.number}</p>
                <p className="text text_type_main-default text_color_inactive">{new Date(order.createdAt).toLocaleString('ru-RU', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <p className="text text_type_main-medium mt-6 mb-2">{order.name}</p>
            <p className="text text_type_main-default mb-6">
                {
                    order?.status === 'done'
                        ? 'Выполнен'
                        : order?.status === 'pending'
                            ? 'В работе'
                            : order?.status === 'created'
                                ? 'Создан'
                                : order?.status
                }
            </p>
            <div className={styles.row}>
                <div className={styles.ingredients}>
                    {
                        orderIngredients.map((ingredient, index) => (
                            <div key={index} className={styles.imagesWrapper} style={{ zIndex: orderIngredients.length - index, marginLeft: index === 0 ? 0 : '-16px' }}>
                                <img className={styles.image} key={index} src={ingredient.image} />    
                            </div>
                        ))
                    }
                </div>
                <p className="text text_type_digits-default">{sum} <CurrencyIcon type="primary" /></p>
            </div>
        </div>
    );
}

export default Order;