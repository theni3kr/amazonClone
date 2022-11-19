import { React, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "../context/ContextProvider";
import { NavLink } from "react-router-dom";
import { Divider } from "@mui/material";
import './rightheader.css'





const Rightheader = ({onClick, userlogout}) => {
  const { account, setAccount } = useContext(LoginContext);

  return (
    <>
      <div className="rightheader">
        <div className="right_nav">
          {account ? (
            <Avatar className="avtar2">{account.name[0].toUpperCase()}</Avatar>
          ) : (
            <Avatar className="avtar" />
          )}
          {
            account? <h3>Hello, {account.name.toUpperCase()}</h3>:<NavLink to='signin'><h3>Sign in</h3></NavLink>
          }
        </div>
        <div className="nav_btn" onClick={()=>onClick}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/">Shop By Category</NavLink>
          <Divider style={{width:"100%", marginLeft:"-20px"}}/>
          <NavLink to="/">today's Deal</NavLink>
          {account ? (
            <NavLink to="/buynow">Your orders</NavLink>
          ) : (
            <NavLink to="/signin">Your orders</NavLink>
          )}

          <Divider style={{width:"100%", marginLeft:"-20px"}}/>

          <div className="flag">
            <NavLink to="/">Settings</NavLink>
            <img src="" alt=""/>
          </div>
          {
            account?<NavLink to='/' onClick={userlogout}>Logout</NavLink>: ""
          }
          
        </div>
      </div>
    </>
  );
};

export default Rightheader;
