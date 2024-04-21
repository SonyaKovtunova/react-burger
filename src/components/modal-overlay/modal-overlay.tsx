import modalOverlayStyles from './modal-overlay.module.css';

interface IModalOverlayProps {
    onClose: () => void,
}

const ModalOverlay = (props: IModalOverlayProps) => {

    return (
        <div className={modalOverlayStyles.modalOverlay} onClick={props.onClose}></div>
    );
}

export default ModalOverlay; 