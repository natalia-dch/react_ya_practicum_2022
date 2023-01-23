import React, { FC, ReactNode, useState } from "react";
import { useParams } from "react-router-dom";
import IngredientDetails from "../../components/ingredient-details/IngredientDetails";
import styles from "./styles.module.css";

type TIngredientPageProps = {
  children: ReactNode
}

export const IngredientPage : FC<TIngredientPageProps> = ({ children }) => {
  return <div className={styles.centered}>
    <p className={"text text_type_main-large p-2 mt-10"}>Детали ингредиента</p>
    {children}
    </div>;
};
