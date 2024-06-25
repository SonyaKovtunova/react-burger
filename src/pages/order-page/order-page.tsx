import { FC } from "react";
import OrderDetail from "../../components/order-detail/order-detail";

type TOrderDetailProps = {
    withToken: boolean;
}

const OrderPage: FC<TOrderDetailProps> = ({ withToken = false }) => {
    return (
        <OrderDetail withToken={withToken} />
    );
}
 
export default OrderPage;