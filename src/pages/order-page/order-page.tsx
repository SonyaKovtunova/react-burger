import { FC } from "react";
import OrderDetail from "../../components/order-detail/order-detail";
import styles from './order-page.module.css';

const OrderPage: FC = () => {
    return (
        <div className={styles.page}>
            <OrderDetail />
        </div>
    );
}
 
export default OrderPage;