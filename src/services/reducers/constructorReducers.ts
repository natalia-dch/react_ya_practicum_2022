// @ts-nocheck
import {
  CHANGE_CURRENT_INGREDIENT,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  CHANGE_INGREDIENT_POSITION,
  RESET_CONSTRUCTOR,
} from "../actions/ingredients";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "../actions/ingredientsAPI";
import { ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAILED } from "../actions/order";
import { TIngredient } from "../../utils/types";
import { type } from "os";

type TIngredientState = {
  items: Array<TIngredient>;
  loading: boolean;
  error: boolean;
};

export const ingredientsInitialState = {
  items: [],
  loading: true,
  error: false,
};
export const ingredientsReducer = (
  state: TIngredientState = ingredientsInitialState,
  action: { type: string; ingredients?: Array<TIngredient> }
) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        items: action.ingredients.map((i) => ({ ...i, qty: 0 })),
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        items: [],
        loading: false,
        error: true,
      };
    }
    default: {
      return state;
    }
  }
};

type TConstractorState = {
  ingredients: Array<TIngredient>;
  bread: TIngredient | null;
};

export const constructorInitialState: TConstractorState = {
  ingredients: [],
  bread: null,
};

export const constructorIngredientsReducer = (
  state: TConstractorState = constructorInitialState,
  action: { type: string; item?: TIngredient, id?: {id: string} | string, index?: number }
) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.item.type === "bun") return { ...state, bread: action.item };
      return { ...state, ingredients: [action.item, ...state.ingredients] };
    }
    case CHANGE_INGREDIENT_POSITION: {
      const item = state.ingredients.filter(
        (item) => item.listId == action.id.id
      )[0];
      const newIngredients = state.ingredients.filter(
        (item) => item.listId != action.id.id
      );
      newIngredients.splice(action.index, 0, item);
      return { ...state, ingredients: newIngredients };
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (item) => item.listId !== action.id
        ),
      };
    }
    case RESET_CONSTRUCTOR: {
      return constructorInitialState;
    }
    default: {
      return state;
    }
  }
};
export const currentIngredientReducer = (state = null, action: any) => {
  switch (action.type) {
    case CHANGE_CURRENT_INGREDIENT: {
      return action.ingredientData;
    }
    default: {
      return state;
    }
  }
};
export const orderInitialState = {
  order: {},
  orderRequest: false,
  orderSucceeded: false,
  orderError: false,
};
export const orderReducer = (state = orderInitialState, action: any) => {
  switch (action.type) {
    case ORDER_REQUEST: {
      return {
        ...state,
        order: {},
        orderSucceeded: false,
        orderError: false,
        orderRequest: true,
      };
    }
    case ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderSucceeded: true,
        order: action.order,
      };
    }
    case ORDER_FAILED: {
      return {
        ...state,
        order: {},
        orderRequest: false,
        orderError: true,
      };
    }
    default: {
      return state;
    }
  }
};
