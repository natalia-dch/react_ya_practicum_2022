import React from 'react';
import { CloseIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from './ModalOverlay';

function Modal({title,content,close}){
  return (
    <>
    <ModalOverlay close={close}/>
    <div className={styles.modal}>
    <CloseIcon type="primary" onClick={close} className={styles.closeBtn}/>
    <p className={"text text_type_main-default "}>{title}</p>
    {content}
    </div>
    </>
  )
}



export default Modal;
