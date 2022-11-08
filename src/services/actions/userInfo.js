import { checkResponse } from "../../../utils/APIUtils";
import { BASE_URL } from "../../../utils/data";

const URL = BASE_URL + "auth/user";

export const USER_INFO_REQUEST = "USER_INFO_REQUEST";
export const USER_INFO_SUCCESS = "USER_INFO_SUCCESS";
export const USER_INFO_FAILED = "USER_INFO_FAILED";

export function getUserInfo() {
  return function (dispatch) {
    dispatch({ type: USER_INFO_REQUEST });
    fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + getCookie('accessToken')
      },
    })
    .then(checkResponse).then(res => {
      if (res) {
        dispatch({
          type: USER_INFO_SUCCESS,
          userInfo:res.user
        });

      } else {
        dispatch({
          type: USER_INFO_FAILED,
        });
      }
    })
      .catch((error) => {
        dispatch({
          type: USER_INFO_FAILED,
        });
      });
  };
}

export const CHANGE_USER_INFO_REQUEST = "CHANGE_USER_INFO_REQUEST";
export const CHANGE_USER_INFO_SUCCESS = "CHANGE_USER_INFO_SUCCESS";
export const CHANGE_USER_INFO_FAILED = "CHANGE_USER_INFO_FAILED";

export function changeUserInfo(name,email) {
  return function (dispatch) {
    dispatch({ type: CHANGE_USER_INFO_REQUEST });
    fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + getCookie('accessToken')
      },
      body: JSON.stringify({
        
        "email": email, 
        "name": name, 
    
    }),
    })
    .then(checkResponse).then(res => {
      if (res) {
        dispatch({
          type: CHANGE_USER_INFO_SUCCESS,
          userInfo:res.user
        });

      } else {
        dispatch({
          type: CHANGE_USER_INFO_FAILED,
        });
      }
    })
      .catch((error) => {
        dispatch({
          type: CHANGE_USER_INFO_FAILED,
        });
      });
  };
}
