import React, { useState, useEffect } from "react";
import axios from "axios";
import 'material-symbols';
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [cookies] = useCookies([]);
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
        process.env.REACT_APP_API + "/login",
        {
          ...values,
        },
        { withCredentials: true ,
          Credentials:"include"}
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
       
        <button type="submit" >Login</button>
        {/* <a href="https://website.com">Forgot your credentials?</a> */}
        <span>
          Don't have an account ?<Link to="/signup"> Register </Link>
        </span>
      </form>
    </div>
      <ToastContainer />
    </div>
    // <div className="container">
    //   <h2>Login to your Account</h2>
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
    //       Don't have an account ?<Link to="/register"> Register </Link>
    //     </span>
    //   </form>
    //   <ToastContainer />
    // </div>
  );
}

export default Login;
