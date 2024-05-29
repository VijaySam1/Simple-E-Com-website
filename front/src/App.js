import './App.css';
import Navbar from './componants/Navbar';
import { Routes,Route } from 'react-router-dom';
import Login from './pages/Login';
import UserRegister from './pages/userReg';
import Home from './pages/home';
import AdminRegister from './pages/AdminReg';
import Addproduct from './pages/NewProduct';
import ProductList from './pages/ProductList';
import { PurchaseEntryPage } from './pages/purchase';
import ProductCart from './pages/ProductCart';
import InvoiceList from './pages/invioceList';
import PurchaseList from './pages/purchaseList';
import SummaryPage from './pages/summary';

import Dashboard from './pages/Dashboard'
import EditProduct from './pages/EditProduct';
import Success from './pages/success';
import { Invoice } from './pages/invoice';
import { MyPDF } from './pages/pdf';
function App() {
  return (
    <div className="App">
      <Navbar/>
    <Routes>
    <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      
      <Route path='/register' element={<UserRegister/>}/>
      <Route path='/adminReg' element={<AdminRegister/>}/>
      <Route path='/addProduct' element={<Addproduct/>}/>
      <Route path='/productList' element={<ProductList/>}/>
      <Route path='/invoiceList' element={<InvoiceList/>}/>
      <Route path='/invoice/:id' element={<Invoice/>}/>
      <Route path='/purchaseList' element={<PurchaseList/>}/>
      <Route path='/cart' element={<ProductCart/>}/>
      <Route path='/Admin/purchaseEntry' element={<PurchaseEntryPage/>}/>
      <Route path='/Admin' element={<Dashboard/>}/>
      <Route path='/Admin/summary' element={<SummaryPage/>}/>
      <Route path='/success' element={<Success/>}/>
      <Route path='/pdf' element={<MyPDF/>}/>
      <Route path='/product/edit/:id' element={<EditProduct/>}/>


    </Routes>
    </div>
    
  );
}

export default App;

// i want to design an react component in a4 size for invoice that invoice should contain company name logo ,billNo,gstNo,fassid,in next div customer name, ph number, address in next div table of products table headers should be sno, product name,quantity ,price per unit ,sgst 9%,cgst9%, total price,at the end of the table add the,totalgst total price for all products
