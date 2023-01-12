import React, { useState, useEffect } from "react";
import { OrderElement } from "../../components/order-element/OrderElement";
import styles from "./orders-feed.module.css";

export const OrdersPage = () => {
  return (
    <>
      <div className={`${styles.mainContainer}`}>
        <Feed />
        <Statictics />
      </div>
    </>
  );
};

const Feed = () => {
  return (
    <div>
    <p className="text text_type_main-large mb-4">Лента заказов:</p>
    <div className={`${styles.feedContainer} pr-2`}>

      <OrderElement />
      <OrderElement />
      <OrderElement />
      <OrderElement />
    </div>
    </div>
  );
};

const Statictics = () => {
  const orderIds = ["034533", "034533", "034533", "034533", "034533"];
  const orderInProgressIds = ["034533", "034533", "034533"];
  return (
    <div className="mt-15">
      <div className={`${styles.columns}`}>
        <div>
          <p className="text text_type_main-medium pb-6">Готовы:</p>
          {orderIds.map((id) => (
            <p className={"text text_type_digits-default mb-2 "+styles.greenText}>{id}</p>
          ))}
        </div>
        <div>
          <p className="text text_type_main-medium pb-6">В работе:</p>
          {orderInProgressIds.map((id) => (
            <p className="text text_type_digits-default mb-2">{id}</p>
          ))}
        </div>
      </div>

      <p className="text text_type_main-medium mt-15">Выполнено за всё время:</p>
      <p className="text text_type_digits-large">28 752</p>
      <p className="text text_type_main-medium mt-15">Выполнено за сегодня:</p>
      <p className="text text_type_digits-large">138</p>
    </div>
  );
};
