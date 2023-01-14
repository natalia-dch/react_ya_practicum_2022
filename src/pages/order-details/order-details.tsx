import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getIngredients } from "../../services/actions/ingredientsAPI";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import styles from "./order-details.module.css";

export const OrderDetailsPage = () => {
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(getIngredients());
  // }, []);
  const { id } = useParams<{id?: string}>();
  const { orders } = useAppSelector((state) => state.wsOrders);
  const order = orders?.orders?.filter(o => o.number.toString() === id)[0];
  const ingredientInfo = useAppSelector((state) => state.ingredients.items);
  const myIngredientInfo = order.ingredients.map((ingId) =>
  ingredientInfo.filter((i) => i._id === ingId)[0]);
  console.log(myIngredientInfo)
  const images = myIngredientInfo.map((i) => i.image);
  const cost = myIngredientInfo.map(i=>i.price).reduce((sum,i) => sum + i);
  
  return (
    <div className={`${styles.mainContainer}`}>
        <p className={`text text_type_main-medium mb-10 ${styles.centeredText}`}>#{id}</p>
        <p className="text text_type_main-medium mb-3">{order.name}</p>
        <p className={`text text_type_main-default mb-15 ${styles.greenText}`}>
          {order.status === "done" ? "Выполнен" : "Выполняется"}
        </p>
        <Ingredients info={myIngredientInfo}/>
        <div className={styles.lowerContainer}>
        <p className="text text_type_main-default text_color_inactive">
          {new Date(order.createdAt).toLocaleString()}
        </p>
        <div className={`${styles.costContainer} pt-4`}>
        <p className={"text text_type_digits-default " + styles.text}>{cost}</p>
        <CurrencyIcon type="primary" />
      </div>
        </div>
    </div>
  );
};

export const Ingredients = ({info}) => {
  return (
    <>
      <p className="text text_type_main-medium mb-6">Состав:</p>
  <div className={`${styles.ingredientsContainer} mb-6`}>
    {info.map(ingredient =>
      (<Ingredient info={ingredient}/> ))}
    </div >
    </>
  );
};

export const Ingredient = ({info}) => {
  console.log(info)
  return (
    <div className={`${styles.ingrContainer} mb-4`}>
      <IngredientPic src={info.image}/>
      <p className="text text_type_main-default ml-4 mr-4">{info.name}</p>
      <div className={`${styles.costContainer} pt-4`}>
        <p className={"text text_type_digits-default " + styles.text}>{info.price}</p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

const IngredientPic = ({src}) => {
  return (
    <div className={styles.picContainer}>
      <img className={styles.pic} src={src} />
    </div>
  );
};
