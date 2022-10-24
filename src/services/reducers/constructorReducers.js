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
  itemsRequest: false,
  itemsFailed: false,
};
export const ingredientsReducer = (state = ingredientsInitialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        itemsRequest: false,
        itemsFailed: false,
        items: action.items,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        itemsRequest: false,
        itemsFailed: true,
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
export const currentIngredientReducer = (state = {}, action) => {
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
  orderFailed: false,
};
export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        order: action.order,
      };
    }
    case ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
