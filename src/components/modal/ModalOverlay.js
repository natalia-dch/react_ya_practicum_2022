import React from "react";
import styles from "./modal.module.css";
import PropTypes from "prop-types";

function ModalOverlay({ close }) {
  return <div className={styles.modalOverlay} onClick={close}></div>;
}

ModalOverlay.propTypes = {
  close: PropTypes.func.isRequired,
};

export default ModalOverlay;
