import React, { useState ,useEffect} from 'react';
import "../style/list.css";
import axios from"axios"
const PurchaseList = () => {
  
let total=0
  const [purchase, setpurchase] = useState([]);
  const [User, setUser] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        const { password, ...rest } = response.data;
        axios
          .get(`http://localhost:3000/purchases`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log("dssdsdsds", response.data);
            setpurchase(response.data)
            // let total = 0;
            // response.data.map((data) => {
            //   total += data.price * data.quantity;
            // });
            // settotals(total);
            // setcart(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
        setUser({ ...rest });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  purchase.map((purchase) => 
    total+=(purchase.quantity*purchase.price)
  )



  // const handleViewBill = (orderNo) => {
  //   // Handle logic to view bill for the selected order
  //   console.log(`View bill for order ${orderNo}`);
  // };

  // const handleDownloadBill = (orderNo) => {
  //   // Handle logic to download bill for the selected order
  //   console.log(`Download bill for order ${orderNo}`);
  // };

  return (
    <div className='container ' >
      <h1>Purchase List</h1>
      <div className='d-flex justify-content-center'>
      <table className='listTable '>
        <thead>
          <tr>
          <th>SNo</th>
          <th>Date</th>
            <th>Purchase No</th>
            <th>Buyer Name</th>
            <th>Product</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          
          {purchase.map((purchase,index) => (
            <tr key={purchase.id}>
              <td className='py-2'>{index+1}</td>
           
              <td className='py-2'>{new Date(purchase.date).toLocaleDateString()}</td>
              <td className='py-2'>{purchase.purchaseNo}</td>
              <td className='py-2'>{purchase.boughtFrom}</td>
              <td className='py-2'>{purchase.productName}</td>
              <td className='text-end px-3'>{Math.floor(purchase.quantity*purchase.price)}.00</td>
              
            </tr>
          ))}
        </tbody>
        <tfoot>
        <tr>
<td colSpan="4"></td>
<td className='text-end px-3'>Total Price:</td>
<td className='text-end px-3'>{Math.floor(total)}.00</td>
</tr>
        </tfoot>
      </table>
      </div>
     
    </div>
  );
};

export default PurchaseList;
