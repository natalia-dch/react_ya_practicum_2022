// @ts-nocheck
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/app";
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import {rootReducer} from './services/reducers/rootReducer';
import { configureStore } from '@reduxjs/toolkit'

const actionLogger = store => next => action => {
console.log(`${new Date().getTime()} | Action: ${JSON.stringify(action)}` );
return next(action);
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [actionLogger()],
})

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
