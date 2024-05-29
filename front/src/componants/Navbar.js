import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingCart ,FaList,FaPowerOff} from "react-icons/fa";
import { IoIosHome} from "react-icons/io";
import{BiAddToQueue}from"react-icons/bi"

const Navbar = () => {
  const navigate=useNavigate()
  const[isLoggedin,setIsLoggedin]=useState(false)
const[Role,setRole]=useState(null)
const token = localStorage.getItem("token");

  useEffect(() => {
    token?setIsLoggedin(true):navigate("/login")
    const Role=localStorage.getItem("Role")
    Role==="Admin"?setRole(0):Role==="User"&&setRole(1)

  }, [token]);

const logout=()=>{
  localStorage.setItem("token","")
  isLoggedin(false)
  navigate("/login")
}

if(!isLoggedin){
  return (
    
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
<div className="container-fluid">
  <Link className="navbar-brand" to="/">Home <IoIosHome size="20px" className='carticon'/></Link>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarScroll">
    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{'--bs-scroll-height': '100px'}}>
      <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to="/login">login</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">register</Link>
      </li>
      
    
    </ul>
    
  </div>
</div>
</nav>
  
)
}else if(Role===0){
  return (
   
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
<div className="container-fluid">
  <Link className="navbar-brand" to="/Admin">Admin <IoIosHome size="20px" className='carticon'/></Link>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button> 
  <div className="collapse navbar-collapse position-relative" id="navbarScroll">
    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll " style={{'--bs-scroll-height': '100px'}}>
      
      <li className="nav-item">
        <Link className="nav-link" to="/addProduct">Add Product <BiAddToQueue size="20px" className='carticon' /></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/productList">Product List <FaList size="18px" className='carticon'/></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/purchaseList">purchase List <FaList size="18px" className='carticon'/></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/invoiceList">invoice List <FaList size="18px" className='carticon'/></Link>
      </li>
      {/* <li>
        <PDFDownloadLink document={<MyPDF/>} fileName="example.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download now!'
      }
    </PDFDownloadLink>
      </li> */}
      
      <li className="nav-item position-absolute top-0 end-0 px-3">
        <Link className="nav-link" onClick={logout}>LogOut <FaPowerOff size="18px" className='carticon'/></Link>
      </li>
    </ul>
    
  </div>
</div>
</nav>
  
)
}else{
 return (
    
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Home <IoIosHome size="20px" className='carticon'/></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse position-relative" id="navbarScroll">
      <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{'--bs-scroll-height': '100px'}}>
        
        <li className="nav-item">
          <Link className="nav-link" to="/productList">Product List <FaList size="18px" className='carticon'/></Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cart">Cart <FaShoppingCart size="18px" className='carticon'/></Link>
        </li>
        <li className="nav-item position-absolute top-0 end-0 px-3">
        <Link className="nav-link" onClick={logout}>LogOut <FaPowerOff size="18px" className='carticon'/></Link>
      </li>
      </ul>
      
    </div>
  </div>
</nav>
    
  ) 
}
  
}

export default Navbar
