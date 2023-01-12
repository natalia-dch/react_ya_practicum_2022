import React, { useState, useEffect } from "react";
import { OrderElement } from "../../components/order-element/OrderElement";
import styles from "./orders-history.module.css";


export const OrderHistoryPage = () => {
  return (
    <div className={`${styles.feedContainer} pr-2 ml-15`}>
      <OrderElement />
      <OrderElement />
      <OrderElement />
      <OrderElement />
    </div>
  );
};