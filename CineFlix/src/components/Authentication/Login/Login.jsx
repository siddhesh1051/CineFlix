import React from 'react'
import './login.css'
// import Avatar from './avatar.png'
import 'material-symbols';

const Signup = () => {
  return (
    <div>
      <div className="login">
      
      <h2 id='heading'>Login</h2>
      

      <form className="login-form">

        <div className="textbox">
          <input type="email" placeholder="Enter Your Email" />
          <span className="material-symbols-outlined"> alternate_email </span>
        </div>

        <div className="textbox">
          <input type="password" placeholder="Enter Your Password" />
          <span className="material-symbols-outlined"> lock </span>
        </div>
       
        <button type="submit">Login</button>
        <a href="https://website.com">Forgot your credentials?</a>
      </form>
    </div>
    </div>
  )
}

export default Signup
