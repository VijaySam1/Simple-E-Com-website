import React, { useState, useEffect } from "react";
import "../style/purchase.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function PurchaseEntryPage() {
  const [formData, setFormData] = useState({
    productName: "",
    boughtFrom: "",
    date: "",
    price: "",
    quantity: "",
  });

  const [purchaseEntries, setPurchaseEntries] = useState([]);
const navigate=useNavigate()
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    if(name==='price'||name==="quantity"){
      setFormData({
        ...formData,
        [name]:parseInt(value) ,
      })
    }

    else{
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddEntry = (event) => {
    event.preventDefault();
    let { date,...form }=formData ;
    date=new Date(date).toISOString()
    setPurchaseEntries([...purchaseEntries, { date,...form }]);
    setFormData({
      purchaseNo:Math.floor(Math.random()),
      productName: "",
      boughtFrom: "",
      date: "",
      price: 0,
      quantity: 0,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    purchaseEntries.map((data)=>{
  const token = localStorage.getItem("token");

      axios
      .post(`http://localhost:3000/purchases`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate('/purchaseList')
      })
      .catch((error) => {
        console.error(error);
      });
      
    })
    // Here, you can send the purchaseEntries data to a server or a database using fetch or axios.
    console.log("Purchase Entries:", purchaseEntries);
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const totalPrice = purchaseEntries.reduce((acc, entry) => acc + parseInt(entry.price* parseInt(entry.quantity)),0 );


  return (
    <div>
      <div className="purchaseTBL p-2">

      <form className="container" onSubmit={handleAddEntry}>
      <h1>Purchase Entry</h1>

        <div className="row ">
          <div className="d-flex justify-content-between col-4 mb-3 mt-3">
            <label className="mt-3">Product Name:</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
            />
          </div>
          <div className="d-flex justify-content-between col-4 mb-3 mt-3">
            <label className="mt-3">Bought From:</label>
            <input
              type="text"
              name="boughtFrom"
              value={formData.boughtFrom}
              onChange={handleInputChange}
            />
          </div>
          <div className="d-flex justify-content-between col-4 mb-3 mt-3">
            <label className="mt-3">Purchase Date:</label>
            <input
              type="date"
              name="date"
              value={(formData.date)}
              onChange={handleInputChange}
            />
          </div>
          <div className="d-flex justify-content-between col-4 mb-3 mt-3">
            <label className="mt-3">Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="d-flex justify-content-between col-4 mb-3 mt-3">
            <label className="mt-3">Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-1 mb-3 mt-3"></div>

          <div className="col-2 mb-3 mt-3">
            <button className="btn btn-success m-2 px-5" type="submit">
              Add
            </button>
          </div>
          <div className="col-1 mb-3 mt-3"></div>

        </div>
      </form>
      <br></br>
        <table className="table table-striped mb-0">
          <thead className="">
            <tr>
              <th>Product Name</th>
              <th>Bought From</th>
              <th>Date</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {purchaseEntries.map((entry, index) => (
              <tr key={index}>
                <td >{entry.productName}</td>
                <td >{entry.boughtFrom}</td>
                <td >{new Date(entry.date).toLocaleDateString()}</td>
                <td >{entry.quantity}/kg</td>
                <td >{entry.price}</td>
                <td >{entry.price*entry.quantity}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="">
            <tr>

              <td colSpan="4"></td>
            <td>Total Price:</td>
            <td>{totalPrice}</td>
            </tr>
          </tfoot>
        </table>
        <div className="d-flex justify-content-center"> 
          <button
            className="btn btn-success m-2 px-5 py-2 "
            onClick={handleSubmit}
          >
            Submit
          </button>
      </div>
        </div>
        
    </div>
  );
}

export { PurchaseEntryPage };
