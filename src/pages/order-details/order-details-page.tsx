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
import { stringify } from "querystring";
import { OrderHistory } from "../../components/order-history/order-history";

export const SERVER_URL = "wss://norma.nomoreparties.space/orders/all";

export const OrderDetailsPage = () => {

  return (
        <div className={`${styles.mainContainer}`} >
        <OrderHistory/>
        </div>
  );
};

export const Ingredients = ({ info, counts }: { info: Array<TIngredient>, counts: Record<string,number> }) => {
  return (
    <>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <div className={`${styles.ingredientsContainer} mb-6`}>
        {info
          .map((ingredient, i) => (
            ingredient && 
            <Ingredient info={ingredient} key={i} count={counts[ingredient._id]} />
          ))}
      </div>
    </>
  );
};

type IngredientProps = {
  info: TIngredient;
  count: number
};

export const Ingredient = ({ info, count }: IngredientProps) => {
  return (
    <div className={`${styles.ingrContainer} mb-4`}>
      <IngredientPic src={info.image} />
      <p className="text text_type_main-default ml-4 mr-4">{info.name}</p>
      <div className={`${styles.costContainer} pt-4`}>
        <p className={"text text_type_digits-default " + styles.text}>
          {info.price}
        </p>
        <CurrencyIcon type="primary" />
        <p className={"text text_type_digits-default " + styles.text}>
           x {count}
        </p>
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
