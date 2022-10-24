import {
  CHANGE_CURRENT_INGREDIENT,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
} from "../actions/ingredients";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "../actions/ingredientsAPI";
import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAILED,
} from "../actions/order";

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
        items: action.ingredients.map(i=>({...i,qty:0,})),
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
export const constructorIngredientsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return [...state,action.item];
    }
    case REMOVE_INGREDIENT: {      
      return state.filter(item => item.id !== action.id);
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
};
export const orderReducer = (state = orderInitialState, action) => {
  switch (action.type) {
    case ORDER_REQUEST: {
      return {
        ...state,
        order: {},
        orderSucceeded: false,
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
        orderSucceeded: false,
      };
    }
    default: {
      return state;
    }
  }
};
