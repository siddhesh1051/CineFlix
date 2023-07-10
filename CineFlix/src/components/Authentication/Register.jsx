import React, { useState, useEffect } from "react";
import axios from "axios";
import './signup.css'
import 'material-symbols';
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./Spinner";



function Register() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");

    }
  }, [ navigate]);

  const [values, setValues] = useState({ username:"",email: "", password: "" });
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
        process.env.REACT_APP_API + "/register",
        {
          ...values,
        },
        {
          withCredentials: true,
        }
         
      )
      
     const token = data.token;
     const user = data.user;

     localStorage.setItem('token', token);
     console.log(user);
     
      if (data) {
        if (data.errors) {
          const {username, email, password } = data.errors;
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
       initial={{ scale: 0, opacity: 0 }}
       transition={{
         delay: 0.15,
         duration: 0.4
       }}
       whileInView={{ scale: 1, opacity: 1 }}
       viewport={{ once: true }}
       className="login">
      
      <h2 id='heading'>Signup</h2>
      

      <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="textbox">
          <input type="text" placeholder="Username" name="username" onChange={(e) =>
            setValues({ ...values, [e.target.name]: e.target.value })
            }/>
          <span className="material-symbols-outlined"> account_circle </span>
        </div>
        <div className="textbox">
          <input type="email" placeholder="Email"  name="email" onChange={(e) =>
            setValues({ ...values, [e.target.name]: e.target.value })
            }/>
          <span className="material-symbols-outlined"> alternate_email </span>
        </div>
        
        <div className="textbox">
          <input type="password" placeholder="Password" name="password" onChange={(e) =>
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
         type="submit " className="hover:scale-[1.01] active:scale-95 duration-200" >Signup
         </button>
         }

        <span>
        Already have an account ?<Link to="/login"> Login</Link>
         </span>
      </form>
    </div>
  </div>
    
  );
}

export default Register;
