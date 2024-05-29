// import Image from "../componants/image";
import React, { useState, useEffect } from "react";
import "../style/form.css";
import { FaUpload, FaEdit } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Addproduct() {
  const [formData, setFormData] = useState({
    productName: "",
    image: "",
    productGroup: "",
    quantity: 0,
    price: 0,
    discription: "",
  });
  const [base64Image, setBase64Image] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate(); // Add this line to get the history object

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:3000/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.permissions.length ===2) {
          setIsAdmin(true);
        } else {
          alert("You are not authorized to access this page!");
          // navigate("/login")
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = e.target.result.split(",")[1];
        setBase64Image(image);
        setFormData({ ...formData, image: image });
        // onImageSelect((e.target.result).split(',')[1]); // pass base64 data to parent component
      };
      reader.readAsDataURL(img);
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
   if(name==='price'||name==='quantity'){ setFormData({
      ...formData,
       [name]: parseInt(value),
    });}else{
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send product data to the server if user is admin
    if (isAdmin) {
      const token = localStorage.getItem("token");
      axios
        .post(`http://localhost:3000/products`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data);
          navigate('/productList')
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  if (!isAdmin) {
    return <h1>Add Product</h1>; // Don't render the component if user is not admin
  }

  return (
    <form className="regForm" onSubmit={handleSubmit}>
      <h1>Add Product</h1>
      <div>
        <div>
          {base64Image === null ? (
            <label htmlFor="image" className="imgUpload">
              <FaUpload className="uploadIcon" size="200px" />
            </label>
          ) : (
            <div>
              <img
                src={`data:image/png;base64,${base64Image}`}
                style={{ width: "300px", height: "200px" }}
              />
              <label htmlFor="image" className="imgUpload">
                <FaEdit className="editIcon" size="50px" />
              </label>
            </div>
          )}

          <input
          required
            id="image"

            className="d-none"
            type="file"
            name="image"
            onChange={onImageChange}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between m-3 mb-3">
        <label className="form-label">Product name:</label>{" "}
        <input
        required
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleInputChange}
        />
      </div>
      <div className="d-flex justify-content-between m-3 mb-3">
        <label className="form-label">Product group:</label>{" "}
        <input
        required
          type="text"
          name="productGroup"
          value={formData.productGroup}
          onChange={handleInputChange}
        />
      </div>
      <div className="d-flex justify-content-between m-3 mb-3">
        <label className="form-label">Quantity:</label>{" "}
        <input
        required
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
        />
      </div>
      <div className="d-flex justify-content-between m-3 mb-3">
        <label className="form-label">Price:</label>{" "}
        <input
        required
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />
      </div>
      <div className="d-flex justify-content-between m-3 mb-3">
        <label className="form-label">discription:</label>{" "}
        <textarea
          name="discription"
          value={formData.discription}
          onChange={handleInputChange}
        />
      </div>

      <div className="d-flex justify-content-around m-3 mb-3">
        <input
        required type="submit" value="Submit" />
      </div>
    </form>
  );
}

export default Addproduct;
