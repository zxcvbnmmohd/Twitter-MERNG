import * as TYPES from "../types";

export const setUser = (user) => {
  return {
    type: TYPES.AUTH_USER,
    payload: user,
  };
};

export const clearUser = () => {
  check(() => localStorage.removeItem("token"));
  return {
    type: TYPES.AUTH_LOGOUT_SUCCESS,
  };
};

const check = (doSomething) => {
  if (typeof window !== "undefined") {
    doSomething();
  }
};
