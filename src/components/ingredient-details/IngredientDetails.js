import React from "react";
import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { currentIngredientReducer } from "../../services/reducers/constructorReducers";

function IngredientDetails() {
  const ingredientInfo = useSelector(state => state.currentIngredient);
  return (
    <>
      <img src={ingredientInfo.image} className={"mb-4 " + styles.img} alt={ingredientInfo.name} />
      <p className="mb-8 text text_type_main-medium">{ingredientInfo.name}</p>
      <div className={"mb-15 " + styles.nutritionContainer}>
        <NutritionInfo title={"Калории,ккал"} info={ingredientInfo.calories} />
        <NutritionInfo title={"Белки,г"} info={ingredientInfo.proteins} />
        <NutritionInfo title={"Жиры,г"} info={ingredientInfo.fat} />
        <NutritionInfo title={"Углеводы,г"} info={ingredientInfo.carbohydrates} />
      </div>
    </>
  );
}

function NutritionInfo({ title, info }) {
  return (
    <div>
      <p className="text text_type_main-default text_color_inactive">{title}</p>
      <p className="text text_type_digits-default text_color_inactive">
        {info}
      </p>
    </div>
  );
}

NutritionInfo.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.number.isRequired,
};

export default IngredientDetails;
