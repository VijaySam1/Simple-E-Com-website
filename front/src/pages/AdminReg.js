import React, { useState } from "react";
import "../style/form.css";
import { FaUserCircle, FaUserAstronaut } from "react-icons/fa";

function AdminRegister() {
  const [formData, setFormData] = useState({
    companyName: "",
    GSTno: "",
    fssaiId: "",
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddressInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value,
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send registration data to the server or perform any additional actions here
    console.log(formData);
  };

  return (
    <form  className="regForm" onSubmit={handleSubmit}>
      <h1>Admin Register</h1>
      <FaUserAstronaut className="loginIcon" size="150px" />
      <div className="d-flex justify-content-between m-3 mb-3">
        <label className="form-label">Company Name:</label>{" "}
        <input
        placeholder="company name "
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
        />
      </div>
      <div className="d-flex justify-content-between m-3 mb-3">
        <label className="form-label">GST No:</label>{" "}
        <input
        placeholder="gst number"
          type="text"
          name="GSTno"
          value={formData.GSTno}
          onChange={handleInputChange}
        />
      </div>
      <div className="d-flex justify-content-between m-3 mb-3">
        <label className="form-label">FSSAI ID:</label>{" "}
        <input
        placeholder="fssai id"
          type="text"
          name="fssaiId"
          value={formData.fssaiId}
          onChange={handleInputChange}
        />
      </div>
      <div className="d-flex justify-content-between m-3 mb-3">
        <label className="form-label">Username:</label>{" "}
        <input
          placeholder="username"
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
        />
      </div>
      <div className="d-flex justify-content-between m-3 mb-3">
        <label className="form-label">Password:</label>{" "}
        <input
          placeholder="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <div className="d-flex justify-content-between m-3 mb-3">
        <label className="form-label">Email:</label>{" "}
        <input
          placeholder="email@abc.com"
          type="email"
          name="emailId"
          value={formData.emailId}
          onChange={handleInputChange}
        />
      </div>
      <div className="d-flex justify-content-between m-3 mb-3">
        <label className="form-label">Date of Birth:</label>{" "}
        <input
          type="date"
          name="DOB"
          value={formData.DOB}
          onChange={handleInputChange}
        />
      </div>
      <div className="d-flex justify-content-between m-3 mb-3">
        <label className="form-label ">Address:</label>{" "}
        <div className="address">
          <div className="d-flex ">
            <input
              placeholder="street"
              type="text"
              name="street"
              value={formData.address.street}
              onChange={handleAddressInputChange}
            />
            <input
              placeholder="city"
              type="text"
              name="city"
              value={formData.address.city}
              onChange={handleAddressInputChange}
            />
          </div>
          <div className="d-flex ">
            <input
              placeholder="district"
              type="text"
              name="district"
              value={formData.address.district}
              onChange={handleAddressInputChange}
            />

            <input
              placeholder="state"
              type="text"
              name="state"
              value={formData.address.state}
              onChange={handleAddressInputChange}
            />
            <input
              placeholder="pincode"
              type="number"
              name="pincode"
              value={formData.address.pincode}
              onChange={handleAddressInputChange}
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-around m-3 mb-3">
        <input type="submit" value="Register" />
      </div>
    </form>
  );
}

export default AdminRegister;
