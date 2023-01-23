import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks";
import styles from "./order-element.module.css";

type OrderElementPropsT = {
  number: string;
  createdAt: string;
  name: string;
  status: string;
  ingredients: Array<any>;
};
export const OrderElement = ({
  number,
  createdAt,
  name,
  status,
  ingredients,
}: OrderElementPropsT) => {
  const history = useHistory();
  const ingredientInfo = useAppSelector((state) => state.ingredients.items);
  const myIngredientInfo = ingredients.map((ingId) =>
  ingredientInfo.filter((i : any) => i._id === ingId)[0]);
  const images = myIngredientInfo.slice(0,10).map((i) => i.image);
  const cost = myIngredientInfo.map(i=>i.price).reduce((sum,i) => sum + i);

  const openDetails = () => {
    history.push(`${history.location.pathname}/${number}`, { modal: true})
    
  }
  return (
    <div className={`${styles.mainContainer} p-6 mb-4`} onClick={openDetails}>
      <div className={`${styles.detailsContainer} mb-6`}>
        <p className="text text_type_main-medium">#{number}</p>
        <p className="text text_type_main-default text_color_inactive">
          {new Date(createdAt).toLocaleString()}
        </p>
      </div>
      <p className="text text_type_main-medium mb-6">{name}</p>
      <div className={styles.lowerContainer}>
        <div className={styles.ingredientsContainer}>
          {images.map((i, j) => (
                        <IngredientPic src={i} key={j} />
          ))}
        </div>
        <div className={`${styles.costContainer} pt-4`}>
          <p className={"text text_type_digits-medium " + styles.text}>{cost}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

type IngredientPicPropsT = {
  src: string;
};

const IngredientPic = ({ src }: IngredientPicPropsT) => {
  return (
    <div className={styles.picContainer}>
      <img className={styles.pic} src={src} />
    </div>
  );
};
