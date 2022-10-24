export const ORDER_REQUEST = "ORDER_REQUEST";
export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const ORDER_FAILED = "ORDER_FAILED";

const url = "https://norma.nomoreparties.space/api/orders";

export function order(ingredientIDs) {
  return function (dispatch) {
    dispatch({ type: ORDER_REQUEST });
    fetch("https://norma.nomoreparties.space/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredientIDs,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: ORDER_SUCCESS,
            order: res.order,
          });
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
