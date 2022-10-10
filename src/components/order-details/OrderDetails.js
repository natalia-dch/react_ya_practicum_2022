import React from "react";
import styles from "./order-details.module.css";
import doneImg from "../../images/done.svg";

function OrderDetails() {
  return (
    <div className={styles.container}>
      <p className="text text_type_digits-large mt-30 mb-8">123456</p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img src={doneImg} alt='символ "галочка"' className="mb-15" />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
