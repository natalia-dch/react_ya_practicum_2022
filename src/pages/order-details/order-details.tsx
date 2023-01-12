import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../utils/hooks";
import styles from "./order-details.module.css";

export const OrderDetailsPage = () => {
  return (
    <div className={`${styles.mainContainer}`}>
        <p className={`text text_type_main-medium mb-10 ${styles.centeredText}`}>#024535</p>
        <p className="text text_type_main-medium mb-3">Interstellar бургер</p>
        <p className={`text text_type_main-default mb-15 ${styles.greenText}`}>
          Выполнен
        </p>
        <Ingredients />
        <div className={styles.lowerContainer}>
        <p className="text text_type_main-default text_color_inactive">
          Сегодня, 16:20
        </p>
        <div className={`${styles.costContainer} pt-4`}>
        <p className={"text text_type_digits-default " + styles.text}>480</p>
        <CurrencyIcon type="primary" />
      </div>
        </div>
    </div>
  );
};

export const Ingredients = () => {
  return (
    <>
      <p className="text text_type_main-medium mb-6">Состав:</p>
  <div className={`${styles.ingredientsContainer} mb-6`}>
      <Ingredient/>
      <Ingredient/>
      <Ingredient/>
      <Ingredient/>
      <Ingredient/>
      <Ingredient/>
    </div >
    </>
  );
};

export const Ingredient = () => {
  return (
    <div className={`${styles.ingrContainer} mb-4`}>
      <IngredientPic />
      <p className="text text_type_main-default ml-4 mr-4">Interstellar бургер</p>
      <div className={`${styles.costContainer} pt-4`}>
        <p className={"text text_type_digits-default " + styles.text}>2 x 480</p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

const IngredientPic = () => {
  const ingredientPic = "https://code.s3.yandex.net/react/code/bun-02.png";
  return (
    <div className={styles.picContainer}>
      <img className={styles.pic} src={ingredientPic} />
    </div>
  );
};
