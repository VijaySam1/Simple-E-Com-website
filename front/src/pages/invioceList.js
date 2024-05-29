import React, { useState,useEffect } from 'react';
import {FaEye}from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "../style/list.css";
import axios from 'axios';
import { MyPDF } from './pdf';
import { BlobProvider, PDFDownloadLink } from '@react-pdf/renderer';
const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
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
          .get(`http://localhost:3000/auths/${response.data.id}/invoices`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log("dssdsdsds", response.data);
            setInvoices(response.data)
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
 

 

  return (
    <div className='container ' >
      <h1>Invoice List</h1>
      <div className='d-flex justify-content-center'>
      <table className='listTable '>
        <thead>
          <tr>
          <th>SNo</th>
          <th>Date</th>
            <th>Order No</th>
            <th>Buyer Name</th>
            <th>Total Amount</th>
            <th>View</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice,index) => (
            <tr key={invoice.orderNo}>
              <td>{index+1}</td>
              <td>{(invoice.date).substring(0, 10)}</td>
              <td>{invoice.orderNo}</td>
              <td>{invoice.reciverName}</td>
              <td>{Math.floor(invoice.totalPrice+invoice.totalPrice/100*12)}</td>
              <td>
                {/* <Link to={`/invoice/${invoice.id}`} onClick={() => handleViewBill(invoice.orderNo)}>
                <FaEye className='iconv' size="30px"/>
                </Link> */}
                 <BlobProvider document={<MyPDF invoice={invoice} />}>
          {({ url }) => (
            <a href={url} target="_blank" rel="noopener noreferrer">
              <FaEye className='iconv' size="30px"/>
            </a>
          )}
        </BlobProvider>
                </td>
                <td>
                  
                
        <PDFDownloadLink document={<MyPDF invoice={invoice}/>} fileName={`${invoice.orderNo}.pdf`}>
      {({ blob, url, loading, error }) =><button className='btn btn-success' >
        {loading ? 'Loading document...' : 'Download'}</button>
      }
    </PDFDownloadLink>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
     
    </div>
  );
};

export default InvoiceList;
