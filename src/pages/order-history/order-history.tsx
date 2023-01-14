import React, { useState, useEffect } from "react";
import { OrderElement } from "../../components/order-element/OrderElement";
import { WebsocketStatus } from "../../services/reducers/wsReducer";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import styles from "./orders-history.module.css";
import {
  connect as connectOrder,
  disconnect as disconnectOrder,
} from "../../services/actions/wsActions";
import { getCookie } from "../../utils/cookies";

export const SERVER_URL = "wss://norma.nomoreparties.space/orders";


export const OrderHistoryPage = () => {
  const dispatch = useAppDispatch();
  const { orders, status } = useAppSelector((state) => state.wsOrders);
  const isDisconnected = status !== WebsocketStatus.OFFLINE;
  const connect = () => dispatch(connectOrder(`${SERVER_URL}?token=${getCookie("accessToken")?.slice(6)}`));
  const disconnect = () => dispatch(disconnectOrder());

  useEffect(() => {
    console.log("connecting");
    connect();
    return () => {
      disconnect();
    }
  }, []);

  return (
    <div className={`${styles.feedContainer} pr-2 ml-15`}>
        {orders?.orders?.map((order) => (
          <OrderElement
            number={order.number}
            createdAt={order.createdAt}
            name={order.name}
            status={order.status}
            ingredients={order.ingredients}
          />
        ))}
    </div>
  );
};
