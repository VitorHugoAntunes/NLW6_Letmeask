import closeIcon from '../../assets/images/close.svg'

import './styles.scss'
import { ReactNode } from 'react';

type CloseModalProps ={
    closeModal: () => void;
    children?: ReactNode;
    title?: ReactNode;
    description?: ReactNode;
}

export function ModalComponent(props: CloseModalProps){
    return (
        <div className="modal-background">
            <div className="modal-container">
                <button onClick={() => props.closeModal()}>
                    <img src={closeIcon} alt="Fechar" />
                </button>
                <div className="modal-content">
                    <div className="modal-title">{props.title || 'Default'}</div>
                    <div className="modal-description">{props.description}</div>
                    <div className="modal-body">{props.children || 'Default'}</div>
                </div>
            </div>
        </div>
    );
}