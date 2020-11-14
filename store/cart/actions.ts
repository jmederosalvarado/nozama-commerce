import { UserPreview } from "../../types/users";
import { CartAddAction, CartRemoveAction } from "./types";

export function cartAdd(offer: string): CartAddAction {
  return {
    type: "CART_ADD",
    payload: offer,
  };
}

export function cartRemove(offer: string): CartRemoveAction {
  return {
    type: "CART_REMOVE",
    payload: offer,
  };
}
