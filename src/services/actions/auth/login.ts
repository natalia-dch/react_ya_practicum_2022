import { checkResponse } from "../../../utils/APIUtils";
import { BASE_URL } from "../../../utils/data";
import { setCookie } from "../../../utils/cookies";
import { Dispatch } from 'redux';

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

const URL = BASE_URL + "/auth/login";

export function login(email : string, password : string) {
  return function (dispatch : Dispatch) {
    dispatch({ type: LOGIN_REQUEST });
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(checkResponse)
      .then((res) => {
        if (res) {
          setCookie("accessToken", res.accessToken.split("Bearer ")[1], {
            expires: 20 * 60,
          });
          setCookie("refreshToken", res.refreshToken);
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
