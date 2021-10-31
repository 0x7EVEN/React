import { useState } from "react";
import axios from "axios";

export function Login() {
  const [cred, setCred] = useState({});

  function handleInput(e) {
    const { name, value } = e.target;
    setCred({
      ...cred,
      [name]: value
    });
  }

  async function handleLogin() {
    // const { data } = await axios.get("http://localhost:3333/login", { cred });
    const { data } = await axios.get("http://localhost:3333/lcalhost", {
      cred
    });
    console.log(data);
  }

  return (
    <div>
      <h1>Login</h1>
      <div className="p-2 text-start">
        <input
          onClick={handleInput}
          placeholder={"username"}
          name={"username"}
          type="text"
        />
      </div>
      <br />
      <div className="p-2">
        <input
          onClick={handleInput}
          placeholder={"passowrd"}
          name={"password"}
          type="text"
        />
      </div>
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
