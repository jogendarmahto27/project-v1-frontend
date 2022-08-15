import React from 'react'
import { useState } from 'react';
import { navigate,useNavigate } from 'react-router-dom';
import './Login.css';


const Login = () => {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [password,setPassword] = useState("")


  const loginHandler = (e) => {
    e.preventDefault();
    if(name==="admin" && password==="admin"){
      window.alert("welcome");
      navigate('/transaction');

    }
    else{
      window.alert("incorrect username or password")
      setName("");
      setPassword("");
    }

  }


  return (
    <div>

    <div class="login-wrapper">
      <form action="" class="form">
        <h2>Login</h2>
        <div class="input-group">
          <input type="text" name="loginUser" id="loginUser" value={name} 
          onChange={(e) => setName(e.target.value)} autoComplete="off" required />
          <label for="loginUser">User Name</label>
        </div>
        <div class="input-group">
          <input
            type="password"
            name="loginPassword"
            id="loginPassword" value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
          <label for="loginPassword">Password</label>
        </div>
        <input type="submit" value="Login" onClick={loginHandler} class="submit-btn" />
      </form>
    </div>
    </div>
  )
}

export default Login

  