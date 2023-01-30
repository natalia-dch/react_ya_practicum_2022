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
import { TIngredient, TOrder } from "../../utils/types";
import { type } from "os";
import { Ingredients } from "../../pages/order-details/order-details-page";
import { orderT } from "./wsReducer";

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
  action:
    | { type: typeof GET_INGREDIENTS_SUCCESS; ingredients: Array<TIngredient> }
    | { type: typeof GET_INGREDIENTS_REQUEST | typeof GET_INGREDIENTS_FAILED }
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
  action:
    | { type: typeof ADD_INGREDIENT; item: TIngredient }
    | {
        type: typeof CHANGE_INGREDIENT_POSITION;
        id: { id: string };
        index: number;
      }
    | { type: typeof REMOVE_INGREDIENT; id: string }
    | { type: typeof RESET_CONSTRUCTOR }
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
export const currentIngredientReducer = (
  state: TIngredient | null = null,
  action: {
    type: typeof CHANGE_CURRENT_INGREDIENT;
    ingredientData: TIngredient;
  }
) => {
  switch (action.type) {
    case CHANGE_CURRENT_INGREDIENT: {
      return action.ingredientData;
    }
    default: {
      return state;
    }
  }
};
type orderStateT = {
  order: TOrder | null,
  orderRequest: boolean,
  orderSucceeded: boolean,
  orderError: boolean,
};

export const orderInitialState = {
  order: null,
  orderRequest: false,
  orderSucceeded: false,
  orderError: false,
};
export const orderReducer = (
  state : orderStateT = orderInitialState,
  action:
    | {
        type: typeof ORDER_REQUEST | typeof ORDER_FAILED;
      }
    | {
        type: typeof ORDER_SUCCESS;
        order: TOrder;
      }
) => {
  switch (action.type) {
    case ORDER_REQUEST: {
      return {
        ...state,
        order: null,
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
        order: null,
        orderRequest: false,
        orderError: true,
      };
    }
    default: {
      return state;
    }
  }
};
