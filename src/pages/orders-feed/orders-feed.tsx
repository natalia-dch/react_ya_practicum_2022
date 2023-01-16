import React, { useState, useEffect } from "react";
import { OrderElement } from "../../components/order-element/OrderElement";
import { WebsocketStatus } from "../../services/reducers/wsReducer";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import styles from "./orders-feed.module.css";
import {
  connect as connectOrder,
  disconnect as disconnectOrder,
} from "../../services/actions/wsActions";
import { TOrder } from "../../utils/types";

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
    return () => {
      disconnect();
    }
  }, []);

  return (
    <>
      <div className={`${styles.mainContainer}`}>
        <Feed orders={orders.orders} />
        <Statictics orders={orders.orders} total={orders.total} totalToday={orders.totalToday}/>
      </div>
    </>
  );
};

type FeedPropsT = {
  orders : Array<TOrder>,
}

const Feed = ({orders} : FeedPropsT) => {
  return (
    <div>
      <p className="text text_type_main-large mb-4">Лента заказов:</p>
      <div className={`${styles.feedContainer} pr-2`}>
        {orders?.map((order) => (
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
    </div>
  );
};

type StatisticsPropsT = {
  orders : Array<TOrder>,
  total: number,
  totalToday: number,
}

const Statictics = ({ orders, total, totalToday } : StatisticsPropsT) => {
  const orderIds = orders
    ?.filter((order) => order.status === "done")
    ?.map((order) => order.number)
    .slice(0, 20);
  const orderInProgressIds = orders
    ?.filter((order) => order.status === "pending")
    ?.map((order) => order.number)
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
      <p className="text text_type_digits-large">{total}</p>
      <p className="text text_type_main-medium mt-15">Выполнено за сегодня:</p>
      <p className="text text_type_digits-large">{totalToday}</p>
    </div>
  );
};
