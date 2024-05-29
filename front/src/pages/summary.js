import React, { useState } from "react";
import axios from "axios";
const SummaryPage = () => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [totalPurchases, setTotalPurchases] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [profit, setProfit] = useState(0);
  const token = localStorage.getItem("token");

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
    // Calculate total purchases, total sales, and profit/loss for the selected date range
    // const purchases = 1000; // replace with your logic to get total purchases
    // const sales = 2000; // replace with your logic to get total sales
    // const profit = sales - purchases;
    // setTotalPurchases(purchases);
    // setTotalSales(sales);
    // setProfit(profit);
  };
const submit=(from,to)=>{
  axios
  .get(`http://localhost:3000/summary?from=${from}&to=${to}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    const purchases = response.data.purchaseTotal; // replace with your logic to get total purchases
    const sales = response.data.salesTotal; // replace with your logic to get total sales
    const profit = sales - purchases;
    setTotalPurchases(purchases);
    setTotalSales(sales);
    setProfit(profit);
   
  })
  .catch((error) => {
    console.error(error);
  });
}
  const handleToDateChange = (event) => {
    setToDate(event.target.value);
    // Calculate total purchases, total sales, and profit/loss for the selected date range
    
  };

  return (
    <div className="container">
      <h1>Summary</h1>
      <div className="row justify-content-center">
        <div className="form-group col-4">
          <label htmlFor="from-date">From Date:</label>
          <input
            type="date"
            className="form-control"
            id="from-date"
            value={fromDate}
            onChange={handleFromDateChange}
            required
          />
        </div>
        <div className="form-group col-4">
          <label htmlFor="to-date">To Date:</label>
          <input
            type="date"
            className="form-control"
            id="to-date"
            value={toDate}
            onChange={handleToDateChange}
            required
          />
        </div>
        <div className="form-group col-2 m-4">
          <button onClick={()=>submit(fromDate,toDate)} className="btn btn-success">submit</button>
        </div>
      </div>

      <div className="row justify-content-center ">
        <div className="col-4 total m-5 ">
          <h1>Purchases</h1> <h1>Rs:{totalPurchases}</h1>
        </div>
        <div className="col-4 total m-5">
          <h1>Sales</h1> <h1>Rs:{totalSales}</h1>
        </div>
        <div className={`col-4 total m-5 ${totalPurchases < totalSales ? "success" : "danger"}`}>
        <h1>
          {totalPurchases < totalSales ? "Profit" : "Loss"} </h1><h1>Rs:{profit}
        </h1>
      </div>
      </div>
      
    </div>
  );
};
export default SummaryPage;