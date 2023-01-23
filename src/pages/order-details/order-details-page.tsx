import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getIngredients } from "../../services/actions/ingredientsAPI";
import { WebsocketStatus } from "../../services/reducers/wsReducer";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { TIngredient, TOrder } from "../../utils/types";
import styles from "./order-details.module.css";
import {
  connect as connectOrder,
  disconnect as disconnectOrder,
} from "../../services/actions/wsActions";

export const SERVER_URL = "wss://norma.nomoreparties.space/orders/all";

export const OrderDetailsPage = () => {
  const dispatch = useAppDispatch();
  const { orders, status } = useAppSelector((state) => state.wsOrders);
  const isDisconnected = status === WebsocketStatus.OFFLINE;
  const connect = () => dispatch(connectOrder(SERVER_URL));
  const disconnect = () => dispatch(disconnectOrder());

  useEffect(() => {
    dispatch(getIngredients());
    console.log("connecting");
    if (isDisconnected) connect();
    return () => {
      disconnect();
    };
  }, []);

  const { id } = useParams<{ id?: string }>();
  const order = orders?.orders?.filter(
    (o: TOrder) => o.number.toString() === id
  )[0];
  const orderIngredients = order?.ingredients ? order.ingredients : [];
  const ingredientInfo: Array<TIngredient> = useAppSelector(
    (state) => state.ingredients.items
  );
  const myIngredientInfo: Array<TIngredient> = orderIngredients.map(
    (ingId: string) => ingredientInfo.filter((i) => i._id === ingId)[0]
  );
  const images = myIngredientInfo.map((i) => i.image);
  const cost = myIngredientInfo
    .map((i) => i.price)
    .reduce((sum, i) => sum + i, 0);

  return (
    <div className={`${styles.mainContaine}`}>
      {order && (
        <>
          <p
            className={`text text_type_main-medium mb-10 ${styles.centeredText}`}
          >
            #{id}
          </p>
          <p className="text text_type_main-medium mb-3">{order.name}</p>
          <p
            className={`text text_type_main-default mb-15 ${styles.greenText}`}
          >
            {order.status === "done" ? "Выполнен" : "Выполняется"}
          </p>
          <Ingredients info={myIngredientInfo} />
          <div className={styles.lowerContainer}>
            <p className="text text_type_main-default text_color_inactive">
              {new Date(order.createdAt).toLocaleString()}
            </p>
            <div className={`${styles.costContainer} pt-4`}>
              <p className={"text text_type_digits-default " + styles.text}>
                {cost}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export const Ingredients = ({ info }: { info: Array<TIngredient> }) => {
  return (
    <>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <div className={`${styles.ingredientsContainer} mb-6`}>
        {info.map((ingredient, i) => (
          <Ingredient info={ingredient} key={i} />
        ))}
      </div>
    </>
  );
};

type IngredientProps = {
  info: string;
};

export const Ingredient = ({ info }: { info: TIngredient }) => {
  return (
    <div className={`${styles.ingrContainer} mb-4`}>
      <IngredientPic src={info.image} />
      <p className="text text_type_main-default ml-4 mr-4">{info.name}</p>
      <div className={`${styles.costContainer} pt-4`}>
        <p className={"text text_type_digits-default " + styles.text}>
          {info.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

type IngredientPicProps = {
  src: string;
};

const IngredientPic = ({ src }: IngredientPicProps) => {
  return (
    <div className={styles.picContainer}>
      <img className={styles.pic} src={src} />
    </div>
  );
};
