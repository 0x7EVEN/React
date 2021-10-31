import "./App.css";
import { Route, Switch } from "react-router-dom";

import { Login } from "./components/Login/Login";
import { Home } from "./components/Home/Home";
import SingleTodo from "./components/singleTodo/singleTodo";
import Addtodo from "./components/addTodo/addTodo"
export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/addtodos">
          <Addtodo/>
        </Route>
        <Route path="/todos/:id">
          <SingleTodo/>
        </Route>
      </Switch>
    </div>
  );
}
