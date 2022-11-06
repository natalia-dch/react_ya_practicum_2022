import {
  ingredientsReducer,
  constructorIngredientsReducer,
  currentIngredientReducer,
  orderReducer,
} from "./constructorReducers.js";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructorIngredients: constructorIngredientsReducer,
    currentIngredient: currentIngredientReducer,
    order: orderReducer,
});
