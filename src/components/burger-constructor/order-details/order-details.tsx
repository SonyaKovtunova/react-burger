import Modal from "../../modal/modal";
import orderDetailsStyles from './order-details.module.css';
import doneImg from '../../../images/done.png';
import PropTypes from 'prop-types';

interface IOrderDetailsProps {
    onClose: () => void,
}

const OrderDetails = (props: IOrderDetailsProps) => {
    return (
        <Modal onClose={props.onClose}>
            <div className={`${orderDetailsStyles.bodyWrapper} pt-8 pb-15`}>
                <p className={orderDetailsStyles.orderNumber}>034536</p>
                <p className="text text_type_main-medium pt-8">идентификатор заказа</p>
                <img className="pt-15 pb-15" src={doneImg} />
                <p className="text text_type_main-default">Ваш заказ начали готовить</p>
                <p className="text text_type_main-default text_color_inactive pt-2">Дождитесь готовности на орбитальной станции</p>
            </div>
        </Modal>
    );
}

OrderDetails.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default OrderDetails;