import { ReactElement, useEffect } from "react";
import modalOverlayStyles from './modal-overlay.module.css';

interface IModalOverlayProps {
    onClose: any,
}

const ModalOverlay = (props: IModalOverlayProps) => {

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
            props.onClose();
        }
    }

    return (
        <div className={modalOverlayStyles.modalOverlay} onClick={props.onClose}></div>
    );
} 

export default ModalOverlay; 