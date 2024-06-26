import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services";
import { Link, useLocation } from "react-router-dom";
import Order from "./order/order";
import styles from './orders.module.css';
import { IOrder } from "../../interfaces/orders";
import { setOrder } from "../../services/order";
import { socketActions } from "../../services/socket";

const Orders: FC = () => {
    const location = useLocation();
    const isConnected = useAppSelector(store => store.socket.isConnected);
    const orders = useAppSelector(store => store.socket.orders);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isConnected) {
            dispatch(socketActions.open({ url: 'wss://norma.nomoreparties.space/orders' }));
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