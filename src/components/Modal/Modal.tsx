import { FC } from 'react';

import * as styles from './Modal.module.scss';

interface ModalProps {
    id: number;
    onDeleteClick: () => void;
    toggleModal: () => void;
}
export const Modal: FC<ModalProps> = ({ id, onDeleteClick, toggleModal }) => (
    <div className={styles.modal}>
        <div className={styles.modal__window}>
            <p>Are you sure you want to delete {id}?</p>
            <button className="button button--danger" onClick={onDeleteClick}>Confirm Delete</button>
            <button className="button" onClick={toggleModal}>Cancel</button>
        </div>
    </div>
);