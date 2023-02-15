import React, { useState, useEffect } from "react";
import axios from "axios";
import './signup.css'
import 'material-symbols';
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";



function Register() {
  const [cookies] = useCookies(["cookie-name"]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");

    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "https://cineflix-api.up.railway.app/register",
        {
          ...values,
        },
        { withCredentials: true }
      );
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
  };
  return (

    <div>
      <div className="login">
      
      <h2 id='heading'>Signup</h2>
      

      <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
        {/* <div className="textbox">
          <input type="text" placeholder="Username"  onChange={(e) => setName(e.target.value)}/>
          <span className="material-symbols-outlined"> account_circle </span>
        </div> */}
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
        {/* <div className="textbox">
          <input type="password" placeholder="Confirm Password"  onChange={(e) => setConfirmpassword(e.target.value)}/>
          <span className="material-symbols-outlined"> lock </span>
        </div> */}
        <button type="submit" >Signup</button>
        {/* <a href="https://website.com">Forgot your credentials?</a> */}
        <span>
        Already have an account ?<Link to="/login"> Login</Link>
         </span>
      </form>
    </div>
      <ToastContainer />
    </div>
    // <div className="container">
    //   <h2>Register Account</h2>
    //   <form onSubmit={(e) => handleSubmit(e)}>
    //     <div>
    //       <label htmlFor="email">Email</label>
    //       <input
    //         type="email"
    //         name="email"
    //         placeholder="Email"
    //         onChange={(e) =>
    //           setValues({ ...values, [e.target.name]: e.target.value })
    //         }
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="password">Password</label>
    //       <input
    //         type="password"
    //         placeholder="Password"
    //         name="password"
    //         onChange={(e) =>
    //           setValues({ ...values, [e.target.name]: e.target.value })
    //         }
    //       />
    //     </div>
    //     <button type="submit">Submit</button>
    //     <span>
    //       Already have an account ?<Link to="/login"> Login</Link>
    //     </span>
    //   </form>
    //   <ToastContainer />
    // </div>
  );
}

export default Register;
