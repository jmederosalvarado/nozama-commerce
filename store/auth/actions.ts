import { UserPreview } from "../../types/users";
import { LogInAction, LogOutAction } from "./types";

export function login(user: UserPreview): LogInAction {
  return {
    type: "LOG_IN",
    payload: user,
  };
}

export function logout(): LogOutAction {
  return {
    type: "LOG_OUT",
  };
}
