import { authReducer, authInitialState } from "./authReducers";
import {
  resetPasswordReducer,
  resetPasswordInitialState,
} from "./authReducers";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from "../actions/auth/login";
import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from "../actions/auth/logout";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from "../actions/auth/register";
import {
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED,
} from "../actions/auth/refreshToken";
import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
} from "../actions/auth/resetPassword";

describe("auth reducer", () => {

  test("should handle LOGIN_REQUEST", () => {
    expect(
      authReducer(undefined, {
        type: LOGIN_REQUEST,
      })
    ).toEqual({
      ...authInitialState,
      login_error: false,
      login_success: false,
      login_loading: true,
    });
  });

  test("should handle LOGIN_SUCCESS", () => {
    expect(
      authReducer(undefined, {
        type: LOGIN_SUCCESS,
      })
    ).toEqual({
      ...authInitialState,
      login_loading: false,
      login_success: true,
    });
  });

  test("should handle LOGIN_FAILED", () => {
    expect(
      authReducer(undefined, {
        type: LOGIN_FAILED,
      })
    ).toEqual({
      ...authInitialState,
      login_loading: false,
      login_error: true,
    });
  });

  test("should handle LOGOUT_REQUEST", () => {
    expect(
      authReducer(undefined, {
        type: LOGOUT_REQUEST,
      })
    ).toEqual({
      ...authInitialState,
      logout_loading: true,
      logout_success: false,
      logout_error: false,
    });
  });

  test("should handle LOGOUT_SUCCESS", () => {
    expect(
      authReducer(undefined, {
        type: LOGOUT_SUCCESS,
      })
    ).toEqual({
      ...authInitialState,
      logout_loading: false,
      logout_success: true,
    });
  });

  test("should handle LOGOUT_FAILED", () => {
    expect(
      authReducer(undefined, {
        type: LOGOUT_FAILED,
      })
    ).toEqual({
      ...authInitialState,
      logout_loading: false,
      logout_error: true,
    });
  });

  test("should handle REGISTER_REQUEST", () => {
    expect(
      authReducer(undefined, {
        type: REGISTER_REQUEST,
      })
    ).toEqual({
      ...authInitialState,
      register_error: false,
      register_loading: true,
    });
  });

  test("should handle REGISTER_SUCCESS", () => {
    expect(
      authReducer(undefined, {
        type: REGISTER_SUCCESS,
      })
    ).toEqual({
      ...authInitialState,
      register_loading: false,
      register_error: false,
      register_success: true,
    });
  });

  test("should handle REGISTER_FAILED", () => {
    expect(
      authReducer(undefined, {
        type: REGISTER_FAILED,
      })
    ).toEqual({
      ...authInitialState,
      register_loading: false,
      register_error: true,
      register_success: false,
    });
  });

  test("should handle REFRESH_TOKEN_REQUEST", () => {
    expect(
      authReducer(undefined, {
        type: REFRESH_TOKEN_REQUEST,
      })
    ).toEqual({
      ...authInitialState,
      refresh_token_loading: true,
      refresh_token_error: false,
      refresh_token_success: false,
    });
  });

  test("should handle REFRESH_TOKEN_SUCCESS", () => {
    expect(
      authReducer(undefined, {
        type: REFRESH_TOKEN_SUCCESS,
      })
    ).toEqual({
      ...authInitialState,
      refresh_token_loading: false,
      refresh_token_success: true,
    });
  });

  test("should handle REFRESH_TOKEN_FAILED", () => {
    expect(
      authReducer(undefined, {
        type: REFRESH_TOKEN_FAILED,
      })
    ).toEqual({
      ...authInitialState,
      refresh_token_loading: false,
      refresh_token_error: true,
    });
  });
});

describe("reset password reducer", () => {

  test("should handle RESET_PASSWORD_REQUEST", () => {
    expect(
      resetPasswordReducer(undefined, {
        type: RESET_PASSWORD_REQUEST,
      })
    ).toEqual({
      ...resetPasswordInitialState,
      reset_password_loading: true,
      reset_password_error: false,
      reset_password_success: false,
    });
  });

  test("should handle RESET_PASSWORD_SUCCESS", () => {
    expect(
      resetPasswordReducer(undefined, {
        type: RESET_PASSWORD_SUCCESS,
      })
    ).toEqual({
      ...resetPasswordInitialState,
      reset_password_loading: false,
      reset_password_success: true,
    });
  });

  test("should handle RESET_PASSWORD_FAILED", () => {
    expect(
      resetPasswordReducer(undefined, {
        type: RESET_PASSWORD_FAILED,
      })
    ).toEqual({
      ...resetPasswordInitialState,
      reset_password_loading: false,
      reset_password_error: true,
    });
  });

  test("should handle CHANGE_PASSWORD_REQUEST", () => {
    expect(
      resetPasswordReducer(undefined, {
        type: CHANGE_PASSWORD_REQUEST,
      })
    ).toEqual({
      ...resetPasswordInitialState,
      change_password_loading: true,
      change_password_error: false,
      change_password_success: false,
    });
  });

  test("should handle CHANGE_PASSWORD_SUCCESS", () => {
    expect(
      resetPasswordReducer(undefined, {
        type: CHANGE_PASSWORD_SUCCESS,
      })
    ).toEqual({
      ...resetPasswordInitialState,
      change_password_loading: false,
      change_password_success: true,
    });
  });

  test("should handle CHANGE_PASSWORD_FAILED", () => {
    expect(
      resetPasswordReducer(undefined, {
        type: CHANGE_PASSWORD_FAILED,
      })
    ).toEqual({
      ...resetPasswordInitialState,
      change_password_loading: false,
      change_password_error: true,
    });
  });
});
