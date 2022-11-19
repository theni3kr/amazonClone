import React, { useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from "../context/ContextProvider";



const Option =  ({deleteprod,updatecart}) => {
  const {account, setAccount} = useContext(LoginContext)
 

  const delprod = async (id)=>{
    const res = await fetch(`/deleteprod/${id}`,{
      method:'DELETE',
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      credentials:"include"

    })
    const data = await res.json()
    if(res.status !== 201){
      console.log("error")
    }else{
      setAccount(data)
      console.log(`success delete ${id}`)
      
      toast.success("deleted", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        updatecart()
    }
  }

  return (
    <div className="add_remove_select">
      <select>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <p style={{ cursor: "pointer" }} onClick={()=>delprod(deleteprod)}>Delete</p><span>|</span>
      <p className="forremovemedia">Save Or Later</p><span>|</span>
      <p className="forremovemedia">See More like this</p>
      <ToastContainer/>
    </div>
  );
};

export default Option;
