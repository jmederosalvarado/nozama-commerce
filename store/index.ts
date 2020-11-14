import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth/reducers";
import { cartReducer } from "./cart/reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
