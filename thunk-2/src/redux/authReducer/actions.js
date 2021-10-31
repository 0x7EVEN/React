import { AUTH_LOADING, AUTH_ERROR, AUTH_SUCCESS } from "./actionTypes";

export function authLoading() {
  return {
    type: AUTH_LOADING
  };
}

export function authError(err) {
  return {
    type: AUTH_ERROR,
    payload: err
  };
}

export function authSuccess(data) {
  return {
    type: AUTH_SUCCESS,
    payload: data
  };
}
