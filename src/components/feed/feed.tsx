import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../services";
import { Link, useLocation } from "react-router-dom";
import Order from "./order/order";
import styles from './feed.module.css';
import OrdersByStatus from "./orders-by-status/orders-by-status";
import { IOrder } from "../../interfaces/feed";
import { setOrder } from "../../services/order";

const Feed: FC = () => {
    const location = useLocation();
    const feed = useAppSelector(store => store.feed.feed);

    const dispatch = useAppDispatch();
    
    const selectOrder = (order: IOrder) => {
        dispatch(setOrder(order));
    }

    return (
        <>
            <div>
                <p className="text text_type_main-large mb-5">Лента заказов</p>
                <div className={`${styles.orderList} custom-scroll`}>
                    {
                        feed?.orders.map((order, index) => (
                            <div key={index} className={`${index < feed.orders.length - 1 ? 'mb-4' : ''}`}>
                                <Link to={`/feed/${order._id}`} state={{ background: location }} className={styles.link} onClick={() => selectOrder(order)}>
                                    <Order order={order}  /> 
                                </Link>    
                            </div>
                        ))
                    }
                </div>
            </div>
            <div>
                <div className={styles.ordersByStatusList}>
                    <OrdersByStatus status='done' />
                    <OrdersByStatus status='pending' />
                </div>
                <p className="text text_type_main-medium pt-15">Выполнено за все время:</p>
                <p className={`text text_type_digits-large ${styles.total}`}>{feed?.total}</p>
                <p className="text text_type_main-medium pt-15">Выполнено за сегодня:</p>
                <p className={`text text_type_digits-large ${styles.total}`}>{feed?.totalToday}</p>
            </div>
        </>
    );
}
 
export default Feed;