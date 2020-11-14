import { AuthAction, AuthState } from "./types";

// const initialState: AuthState = {
//   user: null,
// };

const initialState: AuthState = {
  user: {
    username: "jmederos",
    password: "jmederos",
    name: "Jorge Mederos",
    rating: 5,
  },
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        user: action.payload,
      };

    case "LOG_OUT":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}
