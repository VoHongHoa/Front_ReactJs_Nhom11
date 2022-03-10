import React from "react";
import ReactDOM from "react-dom";
import "./styles/global.scss";
import App from "./views/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./store/reducers/rootReducers";
import "@fortawesome/fontawesome-free/css/all.min.css";
const reduxStore = createStore(rootReducer, applyMiddleware(thunk));
ReactDOM.render(
  // <React.StrictMode>
  <Provider store={reduxStore}>
    <App />
  </Provider>,
  // </React.StrictMode>
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
