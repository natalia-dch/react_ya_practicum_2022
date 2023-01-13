import React, { useState, useEffect } from "react";
import { OrderElement } from "../../components/order-element/OrderElement";
import { WebsocketStatus } from "../../services/reducers/wsReducer";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import styles from "./orders-feed.module.css";
import {
  connect as connectOrder,
  disconnect as disconnectOrder,
} from "../../services/actions/wsActions";

export const SERVER_URL = "wss://norma.nomoreparties.space/orders/all";

export const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const { orders, status } = useAppSelector((state) => state.wsOrders);
  const isDisconnected = status !== WebsocketStatus.OFFLINE;
  const connect = () => dispatch(connectOrder(SERVER_URL));
  const disconnect = () => dispatch(disconnectOrder());

  useEffect(() => {
    console.log("connecting");
    connect();
  }, []);

  return (
    <>
      <div className={`${styles.mainContainer}`}>
        <Feed orders={orders} />
        <Statictics orders={orders} />
      </div>
    </>
  );
};

const Feed = ({orders}) => {
  return (
    <div>
      <p className="text text_type_main-large mb-4">Лента заказов:</p>
      <div className={`${styles.feedContainer} pr-2`}>
        {orders?.orders?.map((order) => (
          <OrderElement
            number={order.number}
            createdAt={order.createdAr}
            name={order.name}
            status={order.status}
            ingredients={order.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

const Statictics = ({ orders }) => {
  console.log(
    orders?.orders
      ?.filter((order) => order.status === "done")
      ?.map((order) => order.number)
  );
  const orderIds = orders?.orders
    ?.filter((order) => order.status === "done")
    ?.map((order) => order.number)
    .slice(0, 20);
  const orderInProgressIds = orders?.orders
    ?.filter((order) => order.status === "pending")
    ?.map((order) => order.id)
    .slice(0, 20);
  return (
    <div className="mt-15">
      <div className={`${styles.columns}`}>
        <div>
          <p className="text text_type_main-medium pb-6">Готовы:</p>
          <div className={styles.gridContainer}>
            {orderIds?.map((id) => (
              <p
                className={
                  "text text_type_digits-default mb-2 " + styles.greenText
                }
              >
                {id}
              </p>
            ))}
          </div>
        </div>
        <div>
          <p className="text text_type_main-medium pb-6">В работе:</p>
          {orderInProgressIds?.map((id) => (
            <p className="text text_type_digits-default mb-2">{id}</p>
          ))}
        </div>
      </div>

      <p className="text text_type_main-medium mt-15">
        Выполнено за всё время:
      </p>
      <p className="text text_type_digits-large">{orders.total}</p>
      <p className="text text_type_main-medium mt-15">Выполнено за сегодня:</p>
      <p className="text text_type_digits-large">{orders.totalToday}</p>
    </div>
  );
};
