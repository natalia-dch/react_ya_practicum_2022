import React, { FC } from "react";
import styles from "./modal.module.css";

type TModalOverlayProps = {
  close: () => void;
}

const ModalOverlay : FC<TModalOverlayProps> = ({ close }) => {
  return <div className={styles.modalOverlay} onClick={close}></div>;
}

export default ModalOverlay;
