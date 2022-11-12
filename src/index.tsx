// @ts-nocheck
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import {rootReducer} from './services/reducers/rootReducer';
import { configureStore } from '@reduxjs/toolkit'
import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED} from './services/actions/ingredientsAPI'
import { ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAILED} from './services/actions/order'

const actionLogger = store => next => action => {
  const APIactions = [ GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED,ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAILED]
if(APIactions.includes(action.type)){
  console.log(`${new Date().getTime()} | Action: ${action.type}`,action );
}
return next(action);
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(actionLogger)
})

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
    <Provider store={store}>
     <Router><App /></Router>
      
    </Provider>
);

reportWebVitals();
