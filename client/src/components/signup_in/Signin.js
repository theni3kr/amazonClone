import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './sign.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { LoginContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";


const Signin = () => {

    const { account, setAccount } = useContext(LoginContext);
    const navigate = useNavigate();


    const [logdata, setdata] = useState({
        email:"",
        password:"",
    })
    console.log(logdata)
    const adddata = (e)=>{
        const {name,value} = e.target
        
        setdata((prev)=>(
            {
                ...prev,[name]:value
            }
        ))
    }

    const login = async (e)=>{
        e.preventDefault()
        const {email,password} = logdata
        const res = await fetch('/signin',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,password
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

            setdata({...logdata,email:"",password:""})
            toast.success("valid user", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            
                navigate("/");
                setAccount(data);

        }
    }

  return (
    <>
        <section>
            <div className='sign_container'>
                <div className='sign_header'>
                    <img src='./blacklogoamazon.png' alt='amazonlogo'/>
                </div>
                <div className='sign_form'>
                    <form method='POST'>
                        <h1>Sign In</h1>
                        <div className='from_data'>
                            <label htmlFor='email'>Email</label>
                            <input type='text' name='email' id='email' value={logdata.email} onChange={adddata}/>
                        </div>
                        <div className='from_data'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' placeholder='At least 6 characters' name='password' id='password' value={logdata.password} onChange={adddata}/>
                        </div>
                        <button className='signin_btn' onClick={login}>Continue</button>
                    </form>
                    
                </div>
                <div className='create_accountinfo'>
                    <p>New To Amazon</p>
                    <NavLink to='/signup'><button>Create Your Account</button></NavLink>
                </div>
            </div>
            <ToastContainer/>
        </section>
    </>
  )
}

export default Signin