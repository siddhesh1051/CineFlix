import React from 'react'
// import './signup.css'
// import Avatar from './avatar.png'
import 'material-symbols';
import { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  // const navigate = useNavigate();

  const submitHandler = async () => {
    
    if (!name || !email || !password || !confirmpassword) {
      alert("Please fill all the fields");
      return;
    }
    if (password !== confirmpassword) {
      
      alert("Password and Confirm Password should be same");
      return;
    }
    console.log(name, email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
         
        },
        config,
        );
        console.log(data);
        localStorage.setItem("userInfo", JSON.stringify(data.user))
      alert("User Created Successfully");
      
    } catch (error) {
      alert("error occured");
    }
  };



  return (
    <div>
      <div className="login">
      
      <h2 id='heading'>Signup</h2>
      

      <form className="login-form">
        <div className="textbox">
          <input type="text" placeholder="Username"  onChange={(e) => setName(e.target.value)}/>
          <span className="material-symbols-outlined"> account_circle </span>
        </div>
        <div className="textbox">
          <input type="email" placeholder="Email"  onChange={(e) => setEmail(e.target.value)}/>
          <span className="material-symbols-outlined"> alternate_email </span>
        </div>
        
        <div className="textbox">
          <input type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)}/>
          <span className="material-symbols-outlined"> lock </span>
        </div>
        <div className="textbox">
          <input type="password" placeholder="Confirm Password"  onChange={(e) => setConfirmpassword(e.target.value)}/>
          <span className="material-symbols-outlined"> lock </span>
        </div>
        <button type="submit" onClick={submitHandler} >Signup</button>
        <a href="https://website.com">Forgot your credentials?</a>
      </form>
    </div>
    </div>
  )
}

export default Signup
