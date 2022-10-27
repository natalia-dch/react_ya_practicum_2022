import { checkResponse } from "../../utils/APIUtils";
import { BASE_URL } from "../../utils/data";
import { RESET_CONSTRUCTOR } from "./ingredients";

export const ORDER_REQUEST = "ORDER_REQUEST";
export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const ORDER_FAILED = "ORDER_FAILED";

const URL = BASE_URL + "/orders";

export function order(ingredientIDs) {
  return function (dispatch) {
    dispatch({ type: ORDER_REQUEST });
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredientIDs,
      }),
    })
    .then(checkResponse).then(res => {
      if (res) {
        dispatch({
          type: ORDER_SUCCESS,
          order: res.order,
        });
        dispatch({
          type: RESET_CONSTRUCTOR,
        })
      } else {
        dispatch({
          type: ORDER_FAILED,
        });
      }
    })
      .catch((error) => {
        dispatch({
          type: ORDER_FAILED,
        });
      });
  };
}
