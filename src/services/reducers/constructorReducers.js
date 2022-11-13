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

const ingredientsInitialState = {
  items: [],
  loading: true,
  error: false,
};
export const ingredientsReducer = (state = ingredientsInitialState, action) => {
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

const constructorInitialState = { ingredients: [], bread: null };
export const constructorIngredientsReducer = (
  state = constructorInitialState,
  action
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
export const currentIngredientReducer = (state = null, action) => {
  switch (action.type) {
    case CHANGE_CURRENT_INGREDIENT: {
      return action.ingredientData;
    }
    default: {
      return state;
    }
  }
};
const orderInitialState = {
  order: {},
  orderRequest: false,
  orderSucceeded: false,
  orderError: false,
};
export const orderReducer = (state = orderInitialState, action) => {
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
        items: [],
        orderRequest: false,
        orderError: true,
      };
    }
    default: {
      return state;
    }
  }
};
