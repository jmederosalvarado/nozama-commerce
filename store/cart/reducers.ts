import { CartAction, CartState } from "./types";

const initialState: CartState = {
  offers: [],
};

export function cartReducer(
  state: CartState = initialState,
  action: CartAction
): CartState {
  switch (action.type) {
    case "CART_ADD":
      return {
        ...state,
        offers: [...state.offers, action.payload],
      };

    case "CART_REMOVE":
      return {
        ...state,
        offers: state.offers.filter((value) => value !== action.payload),
      };

    default:
      return state;
  }
}
