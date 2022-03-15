import React from "react";
import ReactDOM from "react-dom";
import "./styles/global.scss";
import App from "./views/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import AppReducer from "./store/reducers/AppReducer";
import "@fortawesome/fontawesome-free/css/all.min.css";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
//--------------------------------------------------------------------------
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistConfig = {
  key: "App",
  storage,
};
const persistedReducer = persistReducer(persistConfig, AppReducer);

let store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);
let persistor = persistStore(store);
//const store = createStore(AppReducer, applyMiddleware(thunk));
ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  // </React.StrictMode>
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
