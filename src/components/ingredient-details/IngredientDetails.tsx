import React, { FC, useEffect } from "react";
import styles from "./ingredient-details.module.css";
import { useSelector, useDispatch } from "react-redux";
import { currentIngredientReducer } from "../../services/reducers/constructorReducers";
import { useParams, useHistory } from "react-router-dom";
import { CHANGE_CURRENT_INGREDIENT } from "../../services/actions/ingredients";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

function IngredientDetails() {
  const ingredientInfo = useAppSelector((state) => state.currentIngredient);
  const ingredients = useAppSelector((state) => state.ingredients.items);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { id } = useParams<{id?: string}>();
  useEffect(() => {
    if (!ingredientInfo) {
      if (ingredients.length == 0) return;
      const item = ingredients.find((i) => i._id === id);
      if (!item) {
        history.push("/notFound");
        return;
      }
      dispatch({ type: CHANGE_CURRENT_INGREDIENT, ingredientData: item });
    }
  }, [ingredients]);

  return (
    ingredientInfo && (
      <>
        <img
          src={ingredientInfo.image}
          className={"mb-4 " + styles.img}
          alt={ingredientInfo.name}
        />
        <p className="mb-8 text text_type_main-medium">{ingredientInfo.name}</p>
        <div className={"mb-15 " + styles.nutritionContainer}>
          <NutritionInfo
            title={"Калории,ккал"}
            info={ingredientInfo.calories}
          />
          <NutritionInfo title={"Белки,г"} info={ingredientInfo.proteins} />
          <NutritionInfo title={"Жиры,г"} info={ingredientInfo.fat} />
          <NutritionInfo
            title={"Углеводы,г"}
            info={ingredientInfo.carbohydrates}
          />
        </div>
      </>
    )
  );
}
type TNutritionInfoProps = {
  title: string,
  info: number,
};

const NutritionInfo : FC<TNutritionInfoProps> = ({ title, info }) =>  {
  return (
    <div>
      <p className="text text_type_main-default text_color_inactive">{title}</p>
      <p className="text text_type_digits-default text_color_inactive">
        {info}
      </p>
    </div>
  );
}



export default IngredientDetails;
