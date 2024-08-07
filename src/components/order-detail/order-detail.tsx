import { FC, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../services";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredientData } from "../../interfaces/ingredient-data-interface";
import styles from './order-detail.module.css';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getInredientsSum } from "../../utils/utils";
import { getOrderThunk } from "../../services/order";

const OrderDetail: FC = () => {
    const order = useAppSelector(store => store.order.order);
    const ingredients = useAppSelector(store => store.burgerIngredients.ingredients);

    const dispatch = useAppDispatch();

    const params = useParams();
    const orderFailed = useAppSelector(store => store.order.orderFailed);
    
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!order && params['id']) {
            dispatch(getOrderThunk(params['id']));
        }
    }, [order, params, dispatch]);

    useEffect(() => {
        if (orderFailed) {
            if (location.state?.background) {
                navigate('/', { state: { } });
            } else {
                navigate(-1);
            }
        }
    }, [orderFailed, location.state?.background, navigate]);

    const orderIngredients = useMemo(() => 
        order?.ingredients
            .map(ingredientId => ingredients.find(ingredient => ingredient._id === ingredientId))
            .filter(ingredient => !!ingredient)
            .map(ingredient => ingredient as IIngredientData), 
        [order, ingredients]);

    const sum = useMemo(() => getInredientsSum(orderIngredients), [orderIngredients]);

    const orderIngredientGroups = useMemo(() => 
        orderIngredients?.reduce((result, item) => {
            const foundItem = result.find(i => i.item._id === item._id);

            if (foundItem) {
                foundItem.count++;
            } else {
                result.push({ item, count: 1 });
            }
            return result;
        }, [] as Array<{item: IIngredientData, count: number}>), 
        [orderIngredients]);

    return (
        <div className={styles.order}>
            <p className="text text_type_digits-default mb-10">#{order?.number}</p>
            <div className={`mb-15 ${styles.nameAndStatus}`}>
                <p className="text text_type_main-medium mb-2">{order?.name}</p>
                <p className={`text text_type_main-default ${order?.status === 'done' ? styles.done : ''}`}>
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
            </div>
            <div className={`mb-10 ${styles.ingredientsWrapper}`}>
                <p className="text text_type_main-medium mb-6">Состав:</p>
                <div className={`${styles.ingredients} custom-scroll`}>
                    {
                        orderIngredientGroups?.map((ingredient, index) => (
                            <div key={index} className={`${styles.ingredient} ${index < orderIngredientGroups.length - 1 ? 'mb-4' : ''}`}>
                                <div className={styles.ingredientInfo}>
                                    <div className={styles.imageWrapper}>
                                        <img className={styles.image} key={index} src={ingredient.item.image} alt="" />    
                                    </div>
                                    <p className="text text_type_main-default">{ingredient.item.name}</p>
                                </div>
                                <p className="text text_type_digits-default">{ingredient.count} x {ingredient.item.price} <CurrencyIcon type="primary" /></p>
                            </div>
                        ))
                    }
                </div>
                </div> 
            <div className={styles.timeAndPrice}>
                <p className="text text_type_main-default text_color_inactive">{order ? new Date(order.createdAt).toLocaleString('ru-RU', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : null}</p>
                <p className="text text_type_digits-default">{sum} <CurrencyIcon type="primary" /></p>
            </div>
        </div>
    );
}
 
export default OrderDetail;