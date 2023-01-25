import { userInfoReducer, initialState } from "./userInfoReducer";
import {
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_INFO_FAILED,
  CHANGE_USER_INFO_REQUEST,
  CHANGE_USER_INFO_SUCCESS,
  CHANGE_USER_INFO_FAILED,
} from "../actions/userInfo";

describe("ingredients reducer", () => {
  test("should return the initial state", () => {
    expect(userInfoReducer(undefined, {})).toEqual(initialState);
  });

  test("should handle USER_INFO_REQUEST", () => {
    expect(
      userInfoReducer(undefined, {
        type: USER_INFO_REQUEST,
      })
    ).toEqual({
      ...initialState,
      user_info_loading: true,
      user_info_success: false,
      user_info_error: false,
    });
  });

  test("should handle USER_INFO_SUCCESS", () => {
    const userInfo = { email: "aaa@aaa", name: "Alex" };
    expect(
      userInfoReducer(undefined, {
        type: USER_INFO_SUCCESS,
        userInfo: userInfo,
      })
    ).toEqual({
      ...initialState,
      user_info_loading: false,
      user_info_success: true,
      email: userInfo.email,
      name: userInfo.name,
    });
  });

  test("should handle USER_INFO_FAILED", () => {
    expect(
      userInfoReducer(undefined, {
        type: USER_INFO_FAILED,
      })
    ).toEqual({
      ...initialState,
      user_info_loading: false,
      user_info_error: true,
    });
  });

  test("should handle CHANGE_USER_INFO_REQUEST", () => {
    expect(
      userInfoReducer(undefined, {
        type: CHANGE_USER_INFO_REQUEST,
      })
    ).toEqual({
      ...initialState,
      change_user_info_loading: true,
      change_user_info_error: false,
      change_user_info_success: false,
    });
  });

  test("should handle CHANGE_USER_INFO_SUCCESS", () => {
    const userInfo = { email: "aaa@aaa", name: "Alex" };
    expect(
      userInfoReducer(undefined, {
        type: CHANGE_USER_INFO_SUCCESS,
        userInfo: userInfo,
      })
    ).toEqual({
      ...initialState,
      change_user_info_loading: false,
      change_user_info_success: true,
      email: userInfo.email,
      name: userInfo.name,
    });
  });

  test("should handle CHANGE_USER_INFO_FAILED", () => {
    expect(
      userInfoReducer(undefined, {
        type: CHANGE_USER_INFO_FAILED,
      })
    ).toEqual({
      ...initialState,
      change_user_info_loading: false,
      change_user_info_error: true,
    });
  });
});
