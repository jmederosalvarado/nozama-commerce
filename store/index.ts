import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth/reducers";
import { AuthAction } from "./auth/types";

const rootReducer = combineReducers({
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
