import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import ModalOverlay from "./ModalOverlay";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");

function Modal({ title, close, ...props }) {
  const keyPressHandler = (event) => {
    if (event.key === "Escape") {
      close();
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", keyPressHandler, false);
    return () => {
      document.removeEventListener("keydown", keyPressHandler, false);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      {" "}
      <ModalOverlay close={close} />{" "}
      <div className={"p-4 m-4 " + styles.modal}>
        <div className={styles.closeBtn} onClick={close}>
          <CloseIcon type="primary" />
        </div>
        <p className={"text text_type_main-medium "}>{title}</p>
        {props.children}
      </div>
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default Modal;
