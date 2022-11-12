import React, { useState } from "react";
import IngredientDetails from "../../components/ingredient-details/IngredientDetails";
import styles from "./styles.module.css";
import PropTypes from "prop-types";

export const IngredientPage = ({ children }) => {
  return <div className={styles.centered}>{children}</div>;
};

IngredientPage.propTypes = {
  children: PropTypes.element,

};
