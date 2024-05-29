import React from 'react'
import {Link} from 'react-router-dom'
const Dashboard = () => {
  return (
    <div className='container'>
      <h1>Admin Dashboard</h1>
      <div className='bg-light row'>
      <Link className='col-3 m-5 nav-link'  to="/addProduct">

      <div className=' card dashcard p-5'>
        <h4 className='dLink'>Add Product</h4>
        </div></Link>
        <Link className='col-3 m-5 nav-link'  to="/purchaseList">
       
        <div className=' card dashcard p-5'>
        <h4 className='dLink'>Purchase List</h4>
        </div></Link>
        <Link className='col-3 m-5 nav-link'  to="/Admin/purchaseEntry">

        <div className=' card dashcard p-5'>
        <h4 className='dLink'>Purchase Entry</h4>
        </div></Link>
        <Link className='col-3 m-5 nav-link'  to="/invoiceList">
        <div className=' card dashcard p-5'>
        <h4 className='dLink'>Invoice</h4>
        </div></Link> <Link className='col-3 m-5 nav-link'  to="/productList">
        <div className=' card dashcard p-5'>
        
        <h4 className='dLink'>ProductList</h4>
        </div></Link>
        <Link className='col-3 m-5 nav-link'  to="/Admin/summary">
        <div className=' card dashcard p-5'>
        
        <h4 className='dLink'>Summary</h4>
        </div></Link>
      </div>
        
    </div>
  )
}

export default Dashboard
