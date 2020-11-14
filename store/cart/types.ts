export type CartState = {
  offers: string[];
};

export type CartAddAction = {
  type: "CART_ADD";
  payload: string;
};

export type CartRemoveAction = {
  type: "CART_REMOVE";
  payload: string;
};

export type CartAction = CartAddAction | CartRemoveAction;
