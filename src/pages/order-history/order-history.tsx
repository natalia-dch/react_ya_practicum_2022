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
import { TOrder } from "../../utils/types";

export const SERVER_URL = "wss://norma.nomoreparties.space/orders";


export const OrderHistoryPage = () => {
  const dispatch = useAppDispatch();
  const { orders, status } = useAppSelector((state) => state.wsOrders);
  const isDisconnected = status !== WebsocketStatus.OFFLINE;
  const connect = (url : string) => dispatch(connectOrder(url));
  const disconnect = () => dispatch(disconnectOrder());

  useEffect(() => {
    const cookie = getCookie("accessToken");
     connect(`${SERVER_URL}?token=${cookie?.slice(7)}`);
    return () => {
      disconnect();
    }
  }, []);

  return (
    <div className={`${styles.feedContainer} pr-2 ml-15`}>
        {orders?.orders?.map((order : TOrder) => (
          <OrderElement
            key={order.number}
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
