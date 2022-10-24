import React from "react";
import styles from "./order-details.module.css";
import doneImg from "../../images/done.svg";
import { useSelector } from "react-redux";

function OrderDetails() {
  const orderNum = useSelector(state => state.order.order.number)
  return (
    <div className={styles.container}>
      <p className="text text_type_digits-large mt-30 mb-8">{orderNum}</p>
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
