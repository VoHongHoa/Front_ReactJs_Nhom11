import { combineReducers } from "redux";
import userReducer from "../reducers/userReducer";
import cartreducer from "../reducers/cartReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productsReducer from "./productReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "user"],
};
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartreducer,
  products: productsReducer,
});
export default persistReducer(persistConfig, rootReducer);
