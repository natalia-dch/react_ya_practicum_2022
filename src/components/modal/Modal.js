import React from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from './ModalOverlay';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("react-modals");

function Modal({title,content,close}){
    return ReactDOM.createPortal(
      <>
      <ModalOverlay close={close}/>
      <div className={"p-4 m-4 "+styles.modal}>
      <div className={styles.closeBtn} onClick={close}>
      <CloseIcon type="primary"/>
      </div>
      <p className={"text text_type_main-medium "}>{title}</p>
      {content}
      </div>
      </>,
      modalRoot
    );
}

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  title: PropTypes.string,
  content: PropTypes.element.isRequired
};

export default Modal;
