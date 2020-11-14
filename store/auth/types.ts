import { UserPreview } from "../../types/user";

export type AuthState = {
  user: UserPreview | null;
};

export type LogInAction = {
  type: "LOG_IN";
  payload: UserPreview;
};

export type LogOutAction = {
  type: "LOG_OUT";
};

export type AuthAction = LogInAction | LogOutAction;
