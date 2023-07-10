import React, { useState, useEffect } from "react"
import axios from "axios";
import 'material-symbols';
import { Link, useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactGA from 'react-ga4';
import Spinner from './Spinner'



function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [ navigate]);

  useEffect(() => {
    ReactGA.send("pageview")
  
    
  }, [])
  
  const [values, setValues] = useState({ email: "", password: "" });
  const [isLoading, setisLoading] = useState(false);
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {
    event.preventDefault();
    setisLoading(true)
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_API + "/login",
        {
          ...values,
        },
        {
          withCredentials: true,
        }
         
      )
      console.log(data);
      
     const token = data.token;
     const user = data.user;
     localStorage.setItem('token', token);
     console.log(user);
      


      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/");
          window.location.reload();
        }
      }
    } catch (ex) {
      console.log(ex);
    }

    setisLoading(false)
  };
  return (

    <div>
      <div 
       
       className="login">
      
      <h2 id='heading'>Login</h2>
      

      <form className="login-form" onSubmit={(e) => handleSubmit(e)}>

        <div className="textbox">
          <input type="email" placeholder="Enter Your Email" name="email" onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            } />
          <span className="material-symbols-outlined"> alternate_email </span>
        </div>

        <div className="textbox">
          <input type="password" placeholder="Enter Your Password" name="password"
             onChange={(e) =>
               setValues({ ...values, [e.target.name]: e.target.value })
             }/>
          <span className="material-symbols-outlined"> lock </span>
        </div>

        {
        isLoading
        ?
        <button 
         type="submit " className="hover:scale-[1.01] active:scale-95 duration-200" ><Spinner/>
         </button>

        :
        <button 
         type="submit " className="hover:scale-[1.01] active:scale-95 duration-200" >Login
         </button>
         }
        
        <span>
          Don't have an account ?<Link to="/signup"> Register </Link>
        </span>
      </form>
    </div>
    </div>
  );
}

export default Login;
