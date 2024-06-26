import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services";
import { Link, useLocation } from "react-router-dom";
import Order from "./order/order";
import styles from './feed.module.css';
import OrdersByStatus from "./orders-by-status/orders-by-status";
import { IOrder } from "../../interfaces/orders";
import { setOrder } from "../../services/order";
import { socketActions } from "../../services/socket";

const Feed: FC = () => {
    const location = useLocation();
    const isConnected = useAppSelector(store => store.socket.isConnected);
    const orders = useAppSelector(store => store.socket.orders);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isConnected) {
            dispatch(socketActions.open({ url: 'wss://norma.nomoreparties.space/orders/all' }));
        }
        
        return () => {
            if (isConnected) {
                dispatch(socketActions.close());
            }
        }
    }, [dispatch, isConnected]);

    const selectOrder = (order: IOrder) => {
        dispatch(setOrder(order));
    }

    return (
        <div className={styles.grid}>
            <div>
                <p className="text text_type_main-large mb-5">Лента заказов</p>
                <div className={`${styles.orderList} custom-scroll`}>
                    {
                        orders?.orders.map((order, index) => (
                            <div key={index} className={`${index < orders.orders.length - 1 ? 'mb-4' : ''}`}>
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
                <p className={`text text_type_digits-large ${styles.total}`}>{orders?.total}</p>
                <p className="text text_type_main-medium pt-15">Выполнено за сегодня:</p>
                <p className={`text text_type_digits-large ${styles.total}`}>{orders?.totalToday}</p>
            </div>
        </div>
    );
}
 
export default Feed;