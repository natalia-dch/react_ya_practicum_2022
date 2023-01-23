import {
  ingredientsReducer,
  constructorIngredientsReducer,
  currentIngredientReducer,
  orderReducer,
} from "./constructorReducers";
import { authReducer, resetPasswordReducer } from "./authReducers";
import { userInfoReducer } from "./userInfoReducer";
import { combineReducers } from "redux";
import { wsReducer } from "./wsReducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorIngredients: constructorIngredientsReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
  auth: authReducer,
  resetPassword: resetPasswordReducer,
  userInfo: userInfoReducer,
  wsOrders: wsReducer,
});
