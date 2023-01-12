import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../utils/hooks";
import styles from "./order-element.module.css";


export const OrderElement = () => {
  return (
<div className={`${styles.mainContainer} p-6 mb-4`}>
  <div className={`${styles.detailsContainer} mb-6`}>
  <p className="text text_type_main-medium">#024535</p>
  <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20</p>
  </div>
<p className="text text_type_main-medium mb-6">Interstellar бургер</p>
<div className={styles.lowerContainer}>
  <div className={styles.ingredientsContainer}>
  <IngredientPic/>
  <IngredientPic/>
  <IngredientPic/>
  </div>
  <div className={`${styles.costContainer} pt-4`}>
  <p className={"text text_type_digits-medium "+styles.text}>480</p>
  <CurrencyIcon type="primary" />
</div>
</div>
</div>
  );
};

const IngredientPic = () => {
  const ingredientPic = "https://code.s3.yandex.net/react/code/bun-02.png"
  return (
<div className={styles.picContainer}>
<img className={styles.pic} src={ingredientPic}/>
</div>
  );
};