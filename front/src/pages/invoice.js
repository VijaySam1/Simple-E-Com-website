
import React, { useState,useEffect } from 'react';
import Natural from "../style/100.png";
import Logo from "../style/logo.png";
import { useNavigate, useParams} from "react-router-dom";
import axios from 'axios';

export const Invoice = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState();

  const token = localStorage.getItem("token");
let total=0;
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
          .get(`http://localhost:3000/auths/${response.data.id}/invoices/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            
            console.log("1111", response.data);
            setInvoice(response.data)
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
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  invoice?.products.map((product, index) => (total+=Math.floor(product.price*product.quantity+(product.price*product.quantity*12/100))))

if(invoice){
  
  return (
    <div  className='bg-light' style={{ width: '210mm', height: '297mm', margin: 'auto' ,padding:'3rem'}}>
      {/* Header */}
      
      <div className=" d-flex align-items-center justify-content-between" >
      <div>
          <img className='logo' src={Logo} />
        </div>
        <div>
          <h1 className="">P.R Oil Mills</h1>
          <div className=" d-flex align-items-center justify-content-center">
        <div>121,kullampalyam,Gopi,Tamil Nadu</div>
          </div>
        </div>
        <div>
          <img className='logo' src={Natural} />
        </div>
      </div>
      <hr />
      {/* Bill Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>Bill No.: {invoice.orderNo}</div>
        <div>Date: {new Date(invoice.date).toLocaleDateString()}</div>
      </div>
      <hr />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>GST No.: 5566ytyt67666</div>
        <div>Fassid: AE4d445d66rf66</div>
      </div>
      <hr />
      {/* Customer Info */}
      <div>
        <div><b>customer name:</b>{invoice.reciverName}</div>
        <div><b>Ph.no:</b>{invoice.reciverPhno}</div>
        {/* {console.log(invoice.address)} */}
        <div><b>Address:</b>{invoice.address.street},{invoice.address.city},{invoice.address.district},{invoice.address.state}-{invoice.address.pincode}</div>
     
      </div>
      <hr />
      {/* Products */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th className='p-1 text-center'>S. No.</th>
            <th className='p-1 text-center'>Product Name</th>
            <th className='p-1 text-center'>Price Per Unit</th>
            <th className='p-1 text-center'>Quantity</th>
            <th className='p-1 text-center'>SGST</th>
            <th className='p-1 text-center'>CGST</th>
            <th className='p-1 text-center'>Total Price</th>
          </tr>
        </thead>
        <tbody>
           {invoice.products.map((product, index) => (
            
          <tr key={product.id}>
              <td className='p-1 text-center'>{index+1}</td>
              <td className='p-1 text-center'>{product.productName}</td>
              <td className='p-1 text-end'>{product.price}.00</td>
              <td className='p-1 text-center'>{product.quantity}</td>
              <td className='p-1 text-end'>{product.price*product.quantity*6/100}</td>
              <td className='p-1 text-end'>{product.price*product.quantity*6/100}</td>
              <td className='p-1 text-end'>{Math.floor(product.price*product.quantity+(product.price*product.quantity*6/100))}.00</td>
          </tr>
  

          ))} 

          </tbody> 
        <tfoot>
        <tr>
              <td className='p-1 text-center'></td>
              <td className='p-1 text-center'></td>
              <td className='p-1 text-center'></td>
              <td className='p-1 text-center'></td>
              <td className='p-1 text-center'></td>
              <td className='p-1 text-center'>TOTAL</td>
              <td className='p-1 text-end'>{total}.00</td>
            </tr>
        </tfoot>
      </table>
      <hr />

      <h5 className='d-flex justify-content-center'>Thank you for visiting have a great day !... </h5>
      {/* Totals */}
      {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>Total */}
</div>
  )
}
else{
  return <h1>empty</h1>
}
  }