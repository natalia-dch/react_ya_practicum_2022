import React, { useState } from "react";
import IngredientDetails from "../../components/ingredient-details/IngredientDetails";
import styles from "./styles.module.css";

export const IngredientPage = ({ children }) => {
  return <div className={styles.centered}>{children}</div>;
};
