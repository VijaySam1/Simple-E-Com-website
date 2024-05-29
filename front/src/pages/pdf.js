
import React, { useState,useEffect } from 'react';
import Natural from "../style/100.png";
import Logo from "../style/logo.png";
import { useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import {
  Document,
  Page,
  Text,
  StyleSheet,
  Image,
  View
} from '@react-pdf/renderer';


const styles = StyleSheet.create({
    section: {
        marginBottom: 10,
      },
    page: {
        backgroundColor: '#f0f0f0',
        padding: '48px',
        fontFamily: 'Helvetica',
        fontSize: '10pt',
      },
      header: {
        display: 'flex',
      flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottom:"1px solid gray",

      },
      logo: {
        width: '100px',
        height: 'auto',
      },
      companyInfo: {
        width: '40%',
        textAlign: 'center',
        fontSize: '12pt',

      },
      companyName:{
        fontWeight: 'bold',
        fontSize: '28pt',

      },
      address: {
        textAlign: 'center',
        marginTop: '5px',
      },
      customerInfo: {
        marginTop: '15px',
        marginBottom: '13px',
      },
      customerInfoTitle: {
        fontSize: '12pt',
        fontWeight: 'bold',
      },
      customerInfoDetail: {
        marginLeft: '10px',
      },
      billInfo:{
        padding:'15px 5px 10px 5px',
        display: 'flex',
      flexDirection: 'row',

        borderBottom:"1px solid gray",
        justifyContent: 'space-between',
      },
      
      table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        marginBottom: '20px',
      },
      tableHeader: {
        backgroundColor: '#d9d9d9',
        padding: '5px',
        textAlign: 'center',
        border: '1px solid #000',
      },
      
      tableTotal: {
        backgroundColor: '#d9d9d9',
        padding: '5px',
        textAlign: 'end',
        borderTop: '1px solid #000',
        borderRight: '1px solid #000',
      },
      footer: {
        textAlign: 'center',
        marginTop: '20px',
      },
      table: {
        width: '100%',
        padding: 10,
      },
    row: {
        display:'flex',
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      alignItems: 'center',
      height: 30,
    },
    cell: {
      flex: 1,
      border :"1px solid black",
      margin:'0px',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
paddingTop:"8px",
      height: '100%',
    },
    hcell: {
        flex: 1,
        backgroundColor:"#1a1c1f",
        color:"white",
        border :"1px solid black",
        margin:'0px',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
  paddingTop:"8px",
        height: '100%',
      },
    theader: {
        fontWeight: 'bold',
      },
  });

export const MyPDF = ({invoice}) => {
    
let total=0;

            invoice?.products.map((product, index) => (total+=product.price*product.quantity+(product.price*product.quantity*12/100)))
//            
  
// if(invoice){
  return(

<Document>
<Page size="A4" style={styles.page}>
<View style={styles.header}>
          <View style={styles.logo}>
            <Image src={Logo} />
          </View>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>P.R Oil Mills</Text>
            <View style={styles.companyAddress}>
              <Text>121,kullampalyam,Gopi,Tamil Nadu</Text>
            </View>
          </View>
          <View style={styles.logo}>
            <Image src={Natural} />
          </View>
        </View>
        <View>
          <View style={styles.billInfo}>
          
            <View><Text><Text style={styles.customerInfoTitle}>GST No.: </Text>5566ytyt67666</Text></View>
            <View><Text><Text style={styles.customerInfoTitle}>Bill No.: </Text>{invoice.orderNo}</Text></View>
            
          </View>
          <View style={styles.billInfo}>
            <Text><Text style={styles.customerInfoTitle}>Fassid : </Text>AE4d445d66rf66</Text>
            <Text><Text style={styles.customerInfoTitle}>Date : </Text>{new Date(invoice.date).toLocaleDateString()}</Text>

          </View>
          </View>
           <View style={styles.section}>
        <View style={styles.customerInfo}>
            <Text style={styles.customerInfoTitle}>Customer Details:</Text>
          <Text><Text style={styles.customerInfoTitle}>Customer name : </Text>{invoice.reciverName}</Text>
          <Text><Text style={styles.customerInfoTitle}>Ph.no : </Text>{invoice.reciverPhno}</Text>
          <Text><Text style={styles.customerInfoTitle}>Address : </Text>{invoice.address.street},{invoice.address.city},{invoice.address.district},{invoice.address.state}-{invoice.address.pincode}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.row}>
          <View style={styles.hcell}><Text style={styles.theader}>S. No.</Text></View>
          <View style={styles.hcell}><Text style={styles.theader}>Product Name</Text></View>
          <View style={styles.hcell}><Text style={styles.theader}>Price Per Unit</Text></View>
          <View style={styles.hcell}><Text style={styles.theader}>Quantity</Text></View>
          <View style={styles.hcell}><Text style={styles.theader}>SGST</Text></View>
          <View style={styles.hcell}><Text style={styles.theader}>CGST</Text></View>
          <View style={styles.hcell}><Text style={styles.theader}>Total Price</Text></View>
        </View>
        {invoice.products.map((product, index) => (
          <View style={styles.row} key={product.id}>
            <Text style={styles.cell}>{index + 1}</Text>
            <Text style={styles.cell}>{product.productName}</Text>
            <Text style={styles.cell}>{product.price}.00</Text>
            <Text style={styles.cell}>{product.quantity}</Text>
            <Text style={styles.cell}>{product.price * product.quantity * 6 / 100}</Text>
            <Text style={styles.cell}>{product.price * product.quantity * 6 / 100}</Text>
            <Text style={styles.cell}>{Math.floor(product.price * product.quantity + (product.price * product.quantity * 12 / 100))}.00</Text>
          </View>
        ))}
        <View style={styles.row}>
          <Text style={styles.hcell}></Text>
          <Text style={styles.hcell}></Text>
          <Text style={styles.hcell}></Text>
          <Text style={styles.hcell}></Text>
          <Text style={styles.hcell}></Text>
          <Text style={styles.hcell}>TOTAL</Text>
          <Text style={styles.hcell}>{Math.floor(total)}.00</Text>
        </View>
      </View> 
      <View style={styles.section}>
        <Text style={styles.header}>Thank you for visiting have a great day !...</Text>
      </View>
      
    </Page>
  </Document>
)  
// }
// else{
//     setTimeout(()=>console.log("wait"), 1000);
// }
}
