import React, { useEffect } from "react";
import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { currentIngredientReducer } from "../../services/reducers/constructorReducers";
import { useParams, useHistory } from 'react-router-dom';
import { CHANGE_CURRENT_INGREDIENT } from "../../services/actions/ingredients";

function IngredientDetails() {
  const ingredientInfo = useSelector(state => state.currentIngredient);
  const ingredients = useSelector((state) => state.ingredients.items);
  const dispatch = useDispatch();
  const history = useHistory();
  const {id} = useParams();
  useEffect(()=>{
    if(!ingredientInfo){
      if (ingredients.length == 0) return;
      const item = ingredients.find((i) => i._id === id);
      if (!item) {
        history.push("/notFound")
        return;}
      dispatch({ type: CHANGE_CURRENT_INGREDIENT, ingredientData: item });
    }
  },[ingredients])

  return (
    ingredientInfo && (<>
      <img src={ingredientInfo.image} className={"mb-4 " + styles.img} alt={ingredientInfo.name} />
      <p className="mb-8 text text_type_main-medium">{ingredientInfo.name}</p>
      <div className={"mb-15 " + styles.nutritionContainer}>
        <NutritionInfo title={"Калории,ккал"} info={ingredientInfo.calories} />
        <NutritionInfo title={"Белки,г"} info={ingredientInfo.proteins} />
        <NutritionInfo title={"Жиры,г"} info={ingredientInfo.fat} />
        <NutritionInfo title={"Углеводы,г"} info={ingredientInfo.carbohydrates} />
      </div>
    </>)
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
