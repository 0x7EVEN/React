import { createStore, combineReducers, applyMiddleware } from "redux";

import { authReducer } from "../authReducer/authReducer";
import { todoReducer } from "../todoReducer/todoReducer";



const middleWare = (store) => (next)=> (action)=>{
  console.log("inside middleware -----------------------")
  if(typeof action == "function" ){
    console.log("success thunk")
    return action(store.dispatch)
  }
  next(action)
}

const rootReducer = combineReducers({
  authReducer,
  todoReducer
});

export const store = createStore(rootReducer,
  applyMiddleware(middleWare)
);