import { FC, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../services";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredientData } from "../../interfaces/ingredient-data-interface";
import styles from './order-detail.module.css';
import { getOrderThunk } from "../../services/feed";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getInredientsSum } from "../../utils/utils";

const OrderDetail: FC = () => {
    const selectedOrder = useAppSelector(store => store.feed.selectedOrder);
    const ingredients = useAppSelector(store => store.burgerIngredients.ingredients);

    const dispatch = useAppDispatch();

    const params = useParams();
    const selectedOrderFailed = useAppSelector(store => store.feed.selectedOrderFailed);
    
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!selectedOrder && params['id']) {
            dispatch(getOrderThunk(params['id']));
        }
    }, [selectedOrder, params, dispatch]);

    useEffect(() => {
        if (selectedOrderFailed) {
            if (location.state?.background) {
                navigate('/', { state: { } });
            } else {
                navigate(-1);
            }
        }
    }, [selectedOrderFailed,location.state?.background, navigate]);

    const orderIngredients = useMemo(() => 
        selectedOrder?.ingredients
            .map(ingredientId => ingredients.find(ingredient => ingredient._id === ingredientId))
            .filter(ingredient => !!ingredient)
            .map(ingredient => ingredient as IIngredientData), 
        [selectedOrder, ingredients]);

    const sum = useMemo(() => getInredientsSum(orderIngredients), [orderIngredients]);

    return (
        <div className={styles.order}>
            <p className="text text_type_digits-default mb-10">#{selectedOrder?.number}</p>
            <div className={`mb-15 ${styles.nameAndStatus}`}>
                <p className="text text_type_main-medium mb-2">{selectedOrder?.name}</p>
                <p className={`text text_type_main-default ${selectedOrder?.status === 'done' ? styles.done : ''}`}>
                    {selectedOrder?.status === 'done'
                        ? 'Выполнен'
                        : selectedOrder?.status === 'pending'
                            ? 'В работе'
                            : selectedOrder?.status
                    }
                </p>
            </div>
            <div className={`mb-10 ${styles.ingredientsWrapper}`}>
                <p className="text text_type_main-medium mb-6">Состав:</p>
                <div className={`${styles.ingredients} custom-scroll`}>
                    {
                        orderIngredients?.map((ingredient, index) => (
                            <div key={index} className={`${styles.ingredient} ${index < orderIngredients.length - 1 ? 'mb-4' : ''}`}>
                                <div className={styles.ingredientInfo}>
                                    <div className={styles.imageWrapper}>
                                        <img className={styles.image} key={index} src={ingredient.image} alt="" />    
                                    </div>
                                    <p className="text text_type_main-default">{ingredient.name}</p>
                                </div>
                                <p className="text text_type_digits-default">1 x {ingredient.price} <CurrencyIcon type="primary" /></p>
                            </div>
                        ))
                    }
                </div>
                </div> 
            <div className={styles.timeAndPrice}>
                <p className="text text_type_main-default text_color_inactive">{selectedOrder ? new Date(selectedOrder.createdAt).toLocaleString('ru-RU', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : null}</p>
                <p className="text text_type_digits-default">{sum} <CurrencyIcon type="primary" /></p>
            </div>
        </div>
    );
}
 
export default OrderDetail;