import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, ReactElement, useEffect } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyles from './modal.module.css';

const modalRoot = document.getElementById("react-modals");

type TModalProps = {
    title?: string;
    onClose: () => void;
    children?: ReactElement[] | ReactElement;
}

const Modal: FC<TModalProps> = ({ title, onClose, children }) => {
    if (!modalRoot) {
        throw new Error();
    }

    useEffect(() => {
        document.addEventListener('keyup', pressEscKey);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keyup', pressEscKey);
            document.body.style.overflow = 'auto';
        };
    }, []);

    const pressEscKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
    }

    return ReactDOM.createPortal(
        (
            <div className={modalStyles.modalWrapper} data-react-modals>
                <ModalOverlay onClose={onClose} />
                <div className={modalStyles.modal}>
                    <div className={modalStyles.header}>
                        <p className="text text_type_main-large">{title}</p>
                        <div data-button="closeModal">
                            <CloseIcon type="primary" onClick={onClose} />
                        </div>
                    </div>
                    <>
                        {children}
                    </>    
                </div>      
            </div>
        ), 
        modalRoot
    );
}

export default Modal; 