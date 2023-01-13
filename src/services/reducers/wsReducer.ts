import { createReducer } from '@reduxjs/toolkit'
import { wsOpen, wsClose, wsMessage, wsError, wsConnecting } from "../actions/wsActions";

export enum WebsocketStatus {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}
  
export type orderStore = {
    status: WebsocketStatus,
    connectionError: string,
    orders: Array<any>
}

const initialState: orderStore = {
    status: WebsocketStatus.OFFLINE,
    connectionError: '',
    orders: []
};

export const wsReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(wsConnecting, (state) => {
          state.status = WebsocketStatus.CONNECTING;
      })
      .addCase(wsOpen, (state) => {
          state.status = WebsocketStatus.ONLINE;
          state.connectionError = '';
      })
      .addCase(wsClose, (state) => {
        state.status = WebsocketStatus.OFFLINE;
      })
      .addCase(wsError, (state, action) => {
        state.connectionError = action.payload;
      })
      .addCase(wsMessage, (state, action) => {
        state.orders = action.payload;
      })
  })
                      