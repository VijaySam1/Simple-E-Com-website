import React from "react";
import Natural from "../style/100.png";
import Logo from "../style/logo.png";
import { Link } from "react-router-dom";
import "../style/home.css"

const Home = () => {
  return (
    <div className="info d-flex align-items-center justify-content-center">
      <div className="content d-flex align-items-center justify-content-center" >
      <div>
          <img src={Logo} />
        </div>
        <div>
          <h1 className="coname">P.R Oil Mills</h1>
          <h1>Wood pressed Checku Oil</h1>
          <div className=" d-flex align-items-center justify-content-center">
          <Link className="nav-link" to="/login">
            <button className="btn btn-dark mx-3" >Login</button>
          </Link>

          <Link className="nav-link" to="/register">
          <button className="btn btn-dark mx-3">Register</button>

          </Link>
            
          </div>
        </div>
        <div>
          <img src={Natural} />
        </div>
      </div>
      
    </div>
  );
};

export default Home;
