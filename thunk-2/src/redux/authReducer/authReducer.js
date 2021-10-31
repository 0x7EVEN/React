import { AUTH_LOADING, AUTH_ERROR, AUTH_SUCCESS } from "./actionTypes";

export function authReducer(state, { type, payload }) {
  switch (type) {
    case AUTH_LOADING:
      return {
        loading: true,
        error: false
      };
    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        creds: payload
      };
    default:
      return {
        ...state
      };
  }
}
