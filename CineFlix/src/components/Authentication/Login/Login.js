import React from 'react'
import '../login.css'
import 'material-symbols';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const submitHandler = async () => {
    if (!email || !password) {
      
      return;
    }

    // console.log(email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const  {data}  = await axios.post(
        "/api/user/login",
        { email, password },
        config
        
      );
      console.log(data);
      alert("Login Successful")
      // console.log(JSON.stringify(data));
      
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate('/movies/popular')
    } catch (error) {
      alert("error occured")
    }
  };
  return (
    <div>
      <div className="login">
      
      <h2 id='heading'>Login</h2>
      

      <form className="login-form">

        <div className="textbox">
          <input type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <span className="material-symbols-outlined"> alternate_email </span>
        </div>

        <div className="textbox">
          <input type="password" placeholder="Enter Your Password" value={password}
            onChange={(e) => setPassword(e.target.value)}/>
          <span className="material-symbols-outlined"> lock </span>
        </div>
       
        <button type="submit" onClick={submitHandler}>Login</button>
        <a href="https://website.com">Forgot your credentials?</a>
      </form>
    </div>
    </div>
  )
}

export default Login
