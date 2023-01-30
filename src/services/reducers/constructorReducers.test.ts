import {
  ingredientsReducer,
  ingredientsInitialState,
} from "./constructorReducers";
import {
  constructorIngredientsReducer,
  constructorInitialState,
} from "./constructorReducers";
import { currentIngredientReducer } from "./constructorReducers";
import { orderReducer, orderInitialState } from "./constructorReducers";
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

const ingredientCreator = (type: string, id: number) => {
  return {
    __v: 1,
    _id: id.toString(),
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    image: "",
    name: `ingredient_${id}`,
    price: 100,
    proteins: 0,
    type: type,
  };
};

describe("ingredients reducer", () => {

  test("should handle GET_INGREDIENTS_REQUEST", () => {
    expect(
      ingredientsReducer(undefined, {
        type: GET_INGREDIENTS_REQUEST,
      })
    ).toEqual({
      ...ingredientsInitialState,
      loading: true,
    });
  });

  test("should handle GET_INGREDIENTS_SUCCESS", () => {
    const ingr1 = {
      __v: 1,
      _id: "1",
      calories: 0,
      carbohydrates: 0,
      fat: 0,
      image: "",
      name: "ingredient_1",
      price: 100,
      proteins: 0,
      type: "",
    };
    const ingr2 = {
      __v: 2,
      _id: "2",
      calories: 0,
      carbohydrates: 0,
      fat: 0,
      image: "",
      name: "ingredient_2",
      price: 100,
      proteins: 0,
      type: "",
    };
    expect(
      ingredientsReducer(undefined, {
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: [ingr1, ingr2],
      })
    ).toEqual({
      ...ingredientsInitialState,
      loading: false,
      error: false,
      items: [
        { ...ingr1, qty: 0 },
        { ...ingr2, qty: 0 },
      ],
    });
  });

  test("should handle GET_INGREDIENTS_FAILED", () => {
    expect(
      ingredientsReducer(undefined, {
        type: GET_INGREDIENTS_FAILED,
      })
    ).toEqual({
      ...ingredientsInitialState,
      items: [],
      loading: false,
      error: true,
    });
  });
});

describe("constructor reducer", () => {
  const item1 = { ...ingredientCreator("bun", 1), listId: "1" };
  const item2 = { ...ingredientCreator("stuffing", 2), listId: "2" };
  const item3 = { ...ingredientCreator("stuffing", 3), listId: "3" };
  const item4 = { ...ingredientCreator("stuffing", 4), listId: "4" };
  const initialIngredients = [item1, item2, item3, item4];

  test("should handle ADD_INGREDIENT", () => {
    const item1 = ingredientCreator("bun", 1);
    expect(
      constructorIngredientsReducer(undefined, {
        type: ADD_INGREDIENT,
        item: item1,
      })
    ).toEqual({
      ...constructorInitialState,
      bread: item1,
    });

    const item2 = ingredientCreator("stuffing", 2);
    expect(
      constructorIngredientsReducer(undefined, {
        type: ADD_INGREDIENT,
        item: item2,
      })
    ).toEqual({
      ...constructorInitialState,
      ingredients: [item2],
    });
  });

  test("should handle CHANGE_INGREDIENT_POSITION", () => {
    const resultIngredients = [item1, item3, item4, item2];
    expect(
      constructorIngredientsReducer(
        {
          ...constructorInitialState,
          ingredients: initialIngredients,
        },
        {
          type: CHANGE_INGREDIENT_POSITION,
          id: { id: "2" },
          index: 3,
        }
      )
    ).toEqual({
      ...constructorInitialState,
      ingredients: resultIngredients,
    });
  });

  test("should handle REMOVE_INGREDIENT", () => {
    const resultIngredients = [item1, item3, item4];
    expect(
      constructorIngredientsReducer(
        {
          ...constructorInitialState,
          ingredients: [item1, item2, item3, item4],
        },
        {
          type: REMOVE_INGREDIENT,
          id: "2",
        }
      )
    ).toEqual({
      ...constructorInitialState,
      ingredients: resultIngredients,
    });
  });

  test("should handle RESET_CONSTRUCTOR", () => {
    expect(
      constructorIngredientsReducer(
        {
          ...constructorInitialState,
          ingredients: initialIngredients,
        },
        {
          type: RESET_CONSTRUCTOR,
        }
      )
    ).toEqual(constructorInitialState);
    expect(
      constructorIngredientsReducer(constructorInitialState, {
        type: RESET_CONSTRUCTOR,
      })
    ).toEqual(constructorInitialState);
  });
});

describe("currentIngredient reducer", () => {

  test("should handle CHANGE_CURRENT_INGREDIENT", () => {
    const item1 = ingredientCreator("bun", 1);
    expect(
      currentIngredientReducer(undefined, {
        type: CHANGE_CURRENT_INGREDIENT,
        ingredientData: item1,
      })
    ).toEqual(item1);
  });
});

describe("order reducer", () => {

  test("should handle ORDER_REQUEST", () => {
    expect(
      orderReducer(undefined, {
        type: ORDER_REQUEST,
      })
    ).toEqual({
      ...orderInitialState,
      order: {},
      orderSucceeded: false,
      orderError: false,
      orderRequest: true,
    });
  });

  test("should handle ORDER_SUCCESS", () => {
    const order1 = {
      _id: "1",
      status: "in progress",
      name: "order_1",
      createdAt: "",
      updatedAt: "",
      number: 1,
      ingredients: [
        "123","234"
      ],
    };
    expect(
      orderReducer(undefined, {
        type: ORDER_SUCCESS,
        order: order1,
      })
    ).toEqual({
      ...orderInitialState,
      orderRequest: false,
      orderSucceeded: true,
      order: order1,
    });
  });

  test("should handle ORDER_FAILED", () => {
    expect(
      orderReducer(undefined, {
        type: ORDER_FAILED,
      })
    ).toEqual({
      ...orderInitialState,
      order: {},
      orderRequest: false,
      orderError: true,
    });
  });
});
