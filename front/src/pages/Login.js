import React, { useEffect, useState } from "react";
import "../style/form.css";
import { FaUserCheck} from "react-icons/fa";
import { useNavigate} from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [User, setUser] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate(); // Add this line to get the history object

  useEffect(()=>{

  },[])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...User,
      [name]: value,
    });
    console.log(value)
  };

  const login = async (user) => {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const status=res.status
    const data = await res.json();
    return {data,status};
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {data,status} = await login(User);
      console.log(data)
      const token = data.token;
      localStorage.setItem("token", token); 
      axios
      .get(`http://localhost:3000/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.permissions.length===2) {
          localStorage.setItem("Role", 'Admin'); 
          navigate('/Admin');
        }else if(response.data.permissions.length===1){
          localStorage.setItem("Role", 'User'); 
 if(token&&status===200){
        navigate('/productList'); // Redirect to dashboard after successful login
      }
        }
          // Allproducts()
       else{
      alert("Invalid username or password"); // Show an alert message if login fails
      }
      })
      .catch((error) => {
        console.error(error);
      });// Save token to local storage
      
    } catch (error) {
      console.log(error);
      alert("Invalid username or password"); // Show an alert message if login fails
    }
  };

  return (
    <form className="regForm" onSubmit={handleSubmit}>
      <h1>Login</h1>
      <FaUserCheck className="loginIcon" size="150px" />
      <div className="d-flex justify-content-between m-3 mb-3">
        <label className="form-lable">Username:</label>
        <input
          type="text"
          name="userName"
          value={User.userName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="d-flex justify-content-between m-3 mb-3">
        <label className="form-lable">Password:</label>{" "}
        <input
          type="password"
          name="password"
          value={User.password}
          onChange={handleInputChange}
          required
        />
      </div>
        <input type="submit" value="Login" />
    </form>
  );
};

export default Login;
