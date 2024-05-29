import tick from "../style/tick.jpg";
import React, {  useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate=useNavigate()

  // useEffect(() => {
    const load=()=>{
      
      setTimeout(()=>navigate("/productList"), 3000);

    }

  // },[])

  return (
    <div className='bg-light tick mt-5 m-auto 'onLoad={load}>
      <div>
        <img className='mx-5' src={tick}></img>
      <h1 className='m-4'>Order Placed Successfully</h1>
      </div>
        
    </div>
  )
}

export default Success
