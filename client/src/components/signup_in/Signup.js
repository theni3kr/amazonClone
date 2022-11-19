import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./sign.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
  const navigate = useNavigate()
  const [logdata, setdata] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    passwordagain: "",
  });
  console.log(logdata);
  const adddata = (e) => {
    const { name, value } = e.target;

    setdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const register = async (e) => {
    e.preventDefault();
    const {name,email,mobile,password,passwordagain} = logdata

    const res = await fetch('/putuser',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,email,mobile,password,passwordagain
      })
    })

    const data = await res.json()

    if(res.status !== 201){
      toast.error(data.error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }else{
      navigate('/signin')
    }

  };

  return (
    <>
      <section>
        <div className="sign_container">
          <div className="sign_header">
            <img src="./blacklogoamazon.png" alt="amazonlogo" />
          </div>
          <div className="sign_form">
            <form method="POST">
              <h1>Create account</h1>
              <div className="from_data">
                <label htmlFor="name">Your name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={logdata.name}
                  onChange={adddata}
                />
              </div>
              <div className="from_data">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={logdata.email}
                  onChange={adddata}
                />
              </div>
              <div className="from_data">
                <label htmlFor="mobile">Mobile number</label>
                <input
                  type="text"
                  name="mobile"
                  id="mobile"
                  value={logdata.mobile}
                  onChange={adddata}
                />
              </div>
              <div className="from_data">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="At least 6 characters"
                  name="password"
                  id="password"
                  value={logdata.password}
                  onChange={adddata}
                />
              </div>
              <div className="from_data">
                <label htmlFor="passwordagain">Password again</label>
                <input
                  type="password"
                  name="passwordagain"
                  id="passwordagain"
                  value={logdata.passwordagain}
                  onChange={adddata}
                />
              </div>
              <button className="signin_btn" onClick={register}>
                Continue
              </button>
              <div className="signin_info">
                <p>Already have an account?</p>
                <NavLink to="/signin">Sign in</NavLink>
              </div>
            </form>
          </div>
          <ToastContainer/>
        </div>
      </section>
    </>
  );
};

export default Signup;
