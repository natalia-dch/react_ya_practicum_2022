import React from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from './ModalOverlay';
const modalRoot = document.getElementById("react-modals");

function Modal({title,content,close}){
    return ReactDOM.createPortal(
      <>
      <ModalOverlay close={close}/>
      <div className={styles.modal}>
      <CloseIcon type="primary" onClick={close} className={styles.closeBtn}/>
      <p className={"text text_type_main-default "}>{title}</p>
      {content}
      </div>
      </>,
      modalRoot
    );
}

export default Modal;
