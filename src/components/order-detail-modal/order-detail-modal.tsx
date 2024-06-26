import { FC } from "react";
import Modal from "../modal/modal";
import OrderDetail from "../order-detail/order-detail";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const OrderDetailModal: FC = () => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();

    const closeModal = () => {
        if (location.state?.background) {
            navigate(-1);
        } else {
            navigate('/', { state: { } });
        }
    };
    
    return (<>
        {
            params['id'] &&
                <Modal onClose={closeModal}>
                    <OrderDetail />
                </Modal>
        }
    </>);

}

export default OrderDetailModal;