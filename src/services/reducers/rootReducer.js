import {
  ingredientsReducer,
  constructorIngredientsReducer,
  currentIngredientReducer,
  orderReducer,
} from "./constructorReducers.js";
import { authReducer, resetPasswordReducer } from "./authReducers.js";
import { userInfoReducer } from "./userInfoReducer.js";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorIngredients: constructorIngredientsReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
  auth: authReducer,
  resetPassword: resetPasswordReducer,
  userInfo: userInfoReducer,
});
