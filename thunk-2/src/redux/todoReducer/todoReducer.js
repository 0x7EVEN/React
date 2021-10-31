import {
    ADD_TODO_LOADING,
    ADD_TODO_ERROR,
    ADD_TODO_SUCCESS,
    GET_TODO_LOADING,
    GET_TODO_ERROR,
    GET_TODO_SUCCESS,
    GET_SINGLE_TASK_LOADING,
    GET_SINGLE_TASK_ERROR,
    GET_SINGLE_TASK_SUCCESS
  } from "./actionTypes";

  const initialState = {
    isLoading:false,
    isError:false,
    todos:[]
  }


export function todoReducer(state=initialState, { type, payload }) {
  switch (type) {
    case ADD_TODO_LOADING:
      return {
        ...state,
        isLoading: false
      };
      case ADD_TODO_ERROR:
        return {
          ...state,
          isLoading: false,
          isError: true,
          err: payload
        };
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        todos: [...state.todos, payload]
      };
    case GET_TODO_LOADING:
    return {
        ...state,
        isLoading: true,
        isError: false
      };
    case GET_TODO_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        err: payload
      };
    case GET_TODO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        todos: payload
      };
    case GET_SINGLE_TASK_LOADING:
      return{
        ...state,
        isLoading:true,
        isError:false,
        isSuccess:false
      }
    
      case GET_SINGLE_TASK_ERROR:
        return{
          ...state,
          isLoading:false,
          isError:true,
          isSuccess:false,
          error:payload
        }

    case GET_SINGLE_TASK_SUCCESS:
      return{
        ...state,
        isLoading:false,
        isError:false,
        isSuccess:true,
        todos:payload
      }
      default:
      return {
        ...state
      };
  }
}
