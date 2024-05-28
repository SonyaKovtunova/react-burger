import { FC } from 'react';
import modalOverlayStyles from './modal-overlay.module.css';

type TModalOverlayProps = {
    onClose: () => void;
}

const ModalOverlay: FC<TModalOverlayProps> = ({ onClose }) => {

    return (
        <div className={modalOverlayStyles.modalOverlay} onClick={onClose}></div>
    );
}

export default ModalOverlay; 