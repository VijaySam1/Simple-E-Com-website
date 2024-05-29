import React, { useState } from "react";
import "../style/form.css";
import {  FaUserPlus } from "react-icons/fa";
import { useNavigate} from "react-router-dom";

function UserRegister() {
  const [User, setUser] = useState({
    userName: "",
    password: "",
    emailId: "",
    DOB: "",
    address: {
      street: "",
      city: "",
      district: "",
      state: "",
      pincode: 0,
    },
  });
  const navigate = useNavigate(); // Add this line to get the history object

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...User,
      [name]: value,
    });
  };

  const handleAddressInputChange = (event) => {
    const { name, value } = event.target;
    if(name!=='pincode'){
      setUser({
        ...User,
        address: {
          ...User.address,
          [name]: value,
        },
      });
    }else{
      setUser({
      ...User,
      address: {
        ...User.address,
        [name]: parseInt(value),
      },
    }); 
    }
   
  };
  const Register = async(user) => {
    console.log(JSON.stringify(user))

    const res= await fetch('http://localhost:3000/signUp',{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(user)
    })
    const status=res.status
    const data=await res.json()
return {data,status}
    // setUser([...tasks,data])
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const {data,status} =await Register(User) ;
      console.log(data)
      const message = data.message;
      if(message&&status===200){
        navigate('/login'); // Redirect to dashboard after successful login
      }else{
      alert("Invalid username or password"); // Show an alert message if login fails
      }
    } catch (error) {
      console.log(error);
      alert("something went wrong!!!"); // Show an alert message if login fails
    }
    
    
  };

  return (
    <form className="regForm" onSubmit={handleSubmit}>
      <h1>REGISTER</h1>
      <FaUserPlus className="loginIcon" size="150px" />

      <div className="d-flex justify-content-between m-3 mb-3">
        <label className="form-label">Username:</label>{" "}
        <input
        required
        placeholder="username"
          type="text"
          name="userName"
          value={User.userName}
          onChange={handleInputChange}
        />
      </div>
      <div className="d-flex justify-content-between m-3 mb-3">
        <label className="form-label">Password:</label>{" "}
        <input
        required
        placeholder="password"
          type="password"
          name="password"
          value={User.password}
          onChange={handleInputChange}
        />
      </div>
      <div className="d-flex justify-content-between m-3 mb-3">
        <label className="form-label">Email:</label>{" "}
        <input
        required
        placeholder="email@abc.com"
          type="email"
          name="emailId"
          value={User.emailId}
          onChange={handleInputChange}
        />
      </div>
      <div className="d-flex justify-content-between m-3 mb-3">
        <label className="form-label">Date of Birth:</label>{" "}
        <input
        required
          type="date"
          name="DOB"
          value={User.DOB}
          onChange={handleInputChange}
        />
      </div>
      <div className="d-flex justify-content-between m-3 mb-3">
      <label className="form-label ">Address:</label>{" "}

        <div className="address">
<div className="d-flex ">
        <input
        required
        placeholder="door no./street"
          type="text"
          name="street"
          value={User.address.street}
          onChange={handleAddressInputChange}
        />
        <input
        required
        placeholder="city"
          type="text"
          name="city"
          value={User.address.city}
          onChange={handleAddressInputChange}
        />
      </div>
      <div className="d-flex ">
        <input
        required
        placeholder="district"
          type="text"
          name="district"
          value={User.address.district}
          onChange={handleAddressInputChange}
        />

        <input
        required
        placeholder="state"
          type="text"
          name="state"
          value={User.address.state}
          onChange={handleAddressInputChange}
        />
        <input
        required
        placeholder="pincode"
          type="number"
          name="pincode"
          value={(User.address.pincode)}
          onChange={handleAddressInputChange}
        />
      </div>
        </div>
        
      </div>
      
      <div className="d-flex justify-content-around m-3 mb-3">
        <input
        required className="" type="submit" value="Register" />
      </div>
    </form>
  );
}

export default UserRegister;
