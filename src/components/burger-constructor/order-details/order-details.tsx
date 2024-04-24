import orderDetailsStyles from './order-details.module.css';
import doneImg from '../../../images/done.png';
import { IBurgerConstructorState } from '../../../services/burger-constructor';
import { useSelector } from 'react-redux';

const OrderDetails = () => {
    const { orderNumber } = useSelector<{ burgerConstructor: IBurgerConstructorState }, { orderNumber: string | null }>(store => ({
        orderNumber: store.burgerConstructor.orderNumber,
    }));

    return (
        <div className={`${orderDetailsStyles.bodyWrapper} pt-8 pb-15`}>
            <p className={`text text_type_digits-large ${orderDetailsStyles.orderNumber}`}>{orderNumber}</p>
            <p className="text text_type_main-medium pt-8">идентификатор заказа</p>
            <img className="pt-15 pb-15" src={doneImg} />
            <p className="text text_type_main-default">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive pt-2">Дождитесь готовности на орбитальной станции</p>
        </div>
    );
}

export default OrderDetails;