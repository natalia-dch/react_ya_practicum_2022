import React from 'react';
import styles from './modal.module.css';

function ModalOverlay({close}){
  return (
    <div className={styles.modalOverlay} onClick={close}>
    </div>
  )
}



export default ModalOverlay;
