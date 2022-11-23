import React, { useState } from "react";
import IngredientDetails from "../../components/ingredient-details/IngredientDetails";
import styles from "./styles.module.css";
import PropTypes from "prop-types";

export const IngredientPage = ({ children }) => {
  return <div className={styles.centered}>
    <p className={"text text_type_main-large p-2 mt-10"}>Детали ингредиента</p>
    {children}
    </div>;
};

IngredientPage.propTypes = {
  children: PropTypes.element,

};
