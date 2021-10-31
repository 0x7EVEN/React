import {
    ADD_TODO_LOADING,
    ADD_TODO_ERROR,
    ADD_TODO_SUCCESS,
    GET_TODO_LOADING,
    GET_TODO_ERROR,
    GET_TODO_SUCCESS
  } from "./actionTypes";
  import axios from "axios";


// export const  GetTodo = (id,setTask)=> (dispatch)=>{
    
// }



  export function addTodoLoading() {
    return {
      type: ADD_TODO_LOADING
    };
  }
  
  export function addTodoError(err) {
    return {
      type: ADD_TODO_ERROR,
      payload: err
    };
  }
  export function addTodoSuccess(data) {
    return {
      type: ADD_TODO_SUCCESS,
      payload: data
    };
  }
  
  export function getTodoLaoding() {
    return {
      type: GET_TODO_LOADING
    };
  }
  
  export function getTodoError(err) {
    return {
      type: GET_TODO_ERROR,
      payload: err
    };
  }
  
  export function getTodoSuccess(data) {
    return {
      type: GET_TODO_SUCCESS,
      payload: data
    };
  }
  
  export function getSingleTaskLoading(){
    return {
      type:GET_TODO_LOADING
    }
  }

  export function getSingleTaskError(err){
    return {
      type:GET_TODO_ERROR,
      payload:err
    }
  }

  export function getSingleTaskSuccess(data){
    return {
      type:GET_TODO_SUCCESS,
      payload:data
    }
  }

// action to fetch the data 
export const addTask = (payload) => async (dispatch) => {
    // dispatching request
    dispatch(addTodoError());
    try{
      const {data }= await axios.post("http://localhost:3333/todos",payload)
      dispatch(addTodoSuccess(data));
      return data;
    }catch(err){
      console.log(err.message);
      dispatch(addTodoError(err))
    }
};

export const getTasks = () => async(dispatch)=>{
  dispatch(getTodoLaoding());
  try{
    const {data} = await axios.get("http://localhost:3333/todos")
    dispatch(getTodoSuccess(data));
  }catch(err){
    console.log(err.message);
    dispatch(getTodoError(err));
  }
}

export const singleTask = (id) => async(dispatch)=>{
  dispatch(getSingleTaskLoading())
  try{
    const {data} = await axios.get("http://localhost:3333/todos/"+id);
    console.log("data in func",data)
    dispatch(getSingleTaskSuccess(data))
    return data;
  }catch(err){
    dispatch(getSingleTaskError(err))
    console.log(err.message)
  }
}