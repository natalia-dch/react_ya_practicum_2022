import { wsReducer, initialState, WebsocketStatus } from "./wsReducer";
import {
  wsOpen,
  wsClose,
  wsMessage,
  wsError,
  wsConnecting,
} from "../actions/wsActions";

describe("websocket reducer", () => {
  test("should return the initial state", () => {
    expect(
      wsReducer(undefined, {
        type: undefined,
      })
    ).toEqual(initialState);
  });

  test("should handle wsConnecting", () => {
    expect(wsReducer(undefined, wsConnecting)).toEqual({
      ...initialState,
      status: WebsocketStatus.CONNECTING,
    });
  });

  test("should handle wsOpen", () => {
    expect(wsReducer(undefined, wsOpen)).toEqual({
      ...initialState,
      status: WebsocketStatus.ONLINE,
      connectionError: "",
    });
  });

  test("should handle wsClose", () => {
    expect(wsReducer(undefined, wsClose)).toEqual({
      ...initialState,
      status: WebsocketStatus.OFFLINE,
    });
  });

  test("should handle wsError", () => {
    const error = "error";
    expect(wsReducer(undefined, wsError(error))).toEqual({
      ...initialState,
      connectionError: error,
    });
  });

  test("should handle wsMessage", () => {
    const orders = ["a", "b"];
    expect(wsReducer(undefined, wsMessage(orders))).toEqual({
      ...initialState,
      orders: orders,
    });
  });
});
