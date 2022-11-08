import { checkResponse } from "../../../utils/APIUtils";
import { BASE_URL } from "../../../utils/data";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

const URL = BASE_URL + "auth/login";

export function login(email,password) {
  return function (dispatch) {
    dispatch({ type: LOGIN_REQUEST });
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        
          "email": email, 
          "password": password, 
      
      }),
    })
    .then(checkResponse).then(res => {
      if (res) {
        setCookie("accessToken",res.accessToken)
        setCookie("refreshToken",res.refreshToken)
        dispatch({
          type: LOGIN_SUCCESS,
        });

      } else {
        dispatch({
          type: LOGIN_FAILED,
        });
      }
    })
      .catch((error) => {
        dispatch({
          type: LOGIN_FAILED,
        });
      });
  };
}
