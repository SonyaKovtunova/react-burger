import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../services";
import { Link, useLocation } from "react-router-dom";
import Order from "./order/order";
import styles from './orders.module.css';
import { IOrder } from "../../interfaces/feed";
import { setOrder } from "../../services/order";

const Orders: FC = () => {
    const location = useLocation();
    const orders = useAppSelector(store => store.orders.orders);
    const dispatch = useAppDispatch();

    const selectOrder = (order: IOrder) => {
        dispatch(setOrder(order));
    }
    
    return (
        <div className={`${styles.orderList} custom-scroll`}>
            {
                orders?.orders.map((order, index) => (
                    <div key={index} className={`${index < orders.orders.length - 1 ? 'mb-4' : ''}`}>
                        <Link to={`${order._id}`} state={{ background: location }} className={styles.link} onClick={() => selectOrder(order)}>
                            <Order order={order}  /> 
                        </Link>    
                    </div>
                ))
            }
        </div>
    );
}

export default Orders; 