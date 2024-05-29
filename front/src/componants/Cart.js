import React, { useState, useEffect } from "react";
import { FaMinus,FaPlus, FaTimes } from "react-icons/fa";
import axios from "axios";

const Cart = ({productId,user,cart}) => {

    const [product,setproduct]=useState({
        productName: "",
        image: "",
        productGroup: "",
        quantity: 0,
        price: 0,
        discription: "",
      })
    const [quantity, setQuantity] = useState(0);
    const [User, setUser] = useState(user);
    const [incart, setincart] = useState(true);

    // useEffect(() => {
    //   console.log("ttttttttttttt",cart)
  
    //       setcartid(cart.id)
        
    // }, [cart]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
          .get(`http://localhost:3000/products/${productId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            setproduct({...response.data});
            setQuantity(response.data.quantity);
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);
      const updateCart = (value) => {
        const token = localStorage.getItem("token");
        const cartData={
          productName:product.productName,
          quantity:value,
          price:product.price,
          ProductId:productId,
        }
        
        axios
          .put(
            `http://localhost:3000/user/${user.id}/carts/${cart.id}`,cartData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            setincart(true)
          })
          .catch((error) => {
            console.error(error);
          });
      };
    
      const removeFromCart = () => {
        const token = localStorage.getItem("token");
        axios
          .delete(`http://localhost:3000/user/${user.id}/carts/${cart.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log(response.data);
            setincart(false)
    
          })
          .catch((error) => {
            console.error(error);
          });
      };

 if(incart){ return (
    <div className="card cartCard mb-3 m-auto" >
            <div className="row g-0">
              <div className="col-md-2">
                <img src={`data:image/png;base64,${product.image}`} className="img-fluid " alt="..." />
              </div>
              <div className="col-md-10">
                   <h3 className="card-title mx-5 mt-3 mb-0">{product.productName}</h3>
                <div className="card-body mt-1 d-flex justify-content-around">
                  <div>
                  <span className="bold">Price:{product.price}</span> 
                  </div>
                  
                  <div>
                  <span className="bold">
                    <FaMinus className="icon" onClick={() => {let value=quantity - 1;setQuantity(Math.max(value, 0));updateCart(value)}} />

                    <input
                      type="number"
                      value={quantity}
                      style={{ width: "50px", height: "20px" }}
                      onChange={(e) => {let value=parseInt(e.target.value);setQuantity(value);updateCart(value) }}
                    />
{/* {quantity&&handleChange(quantity,product.price,product.id,product.productName) } */}
                    <FaPlus className="icon" onClick={() => {let value=quantity + 1;setQuantity(value);updateCart(value)}} />

                  </span>
                  </div>
                  <div>
                  <span className="bold">total:{product.price * quantity}</span>
                  </div>
                  <div>
                    <FaTimes className="iconx"onClick={() => removeFromCart(product.id)}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
  )}
}

export default Cart

