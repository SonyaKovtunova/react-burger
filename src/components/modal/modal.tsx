import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ReactElement } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyles from './modal.module.css';

const modalRoot = document.getElementById("react-modals");

interface IModalProps {
    title: string | null,
    onClose: any,
    children?: ReactElement[],
}

const Modal = (props: IModalProps) => {
    if (!modalRoot) {
        throw new Error();
    }

    return ReactDOM.createPortal(
        (
            <div className={modalStyles.modalWrapper}>
                <ModalOverlay onClose={props.onClose} />
                <div className={modalStyles.modal}>
                    <div className={modalStyles.header}>
                        <p className="text text_type_main-large">{props.title}</p>
                        <div>
                            <CloseIcon type="primary" onClick={props.onClose} />
                        </div>
                    </div>
                    <>
                        {props.children}
                    </>    
                </div>      
            </div>
        ), 
        modalRoot
    );
} 

export default Modal; 