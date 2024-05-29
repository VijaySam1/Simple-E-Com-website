import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Product = ({ product, role, cart, user }) => {
  const navigate = useNavigate(); // Add this line to get the history object
  const [User, setUser] = useState(user);
  const [incart, setincart] = useState(false);
  const[cartid,setcartid]=useState('')

  const edit = () => {
    navigate(`/product/edit/${product.id}`);
  };

  useEffect(() => {
    // console.log("trueeeeee",cart)

    cart.map((data) => {
      // console.log("trueeeeee",data)

      if (data.ProductId === product.id) {
        setcartid(data.id)
        setincart(data.ProductId === product.id);
        // console.log("trueeeeee")
      }
    });
  }, [cart]);
  const deleteProduct = () => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:3000/products/${product.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addToCart = () => {
    const token = localStorage.getItem("token");
    const cartData={
      productName:product.productName,
      quantity:1,
      price:product.price
    }
    
    axios
      .post(
        `http://localhost:3000/user/${user.id}/product/${product.id}/carts`,cartData,
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
      .delete(`http://localhost:3000/user/${user.id}/carts/${cartid}`, {
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

  // check if product is already in the cart
  // const isInCart = User.cart.includes(product.id);

  return (
    <div className="card p-2 m-5">
      {console.log(cart)}

      <img
        src={`data:image/png;base64,${product.image}`}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title title">{product.productName}</h5>

        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between">
            {" "}
            <span>
              <b>price:</b>
            </span>
            <span>{product.price}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>
              <b>group:</b>
            </span>
            <span>{product.productGroup}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>
              <b>quantity:</b>
            </span>
            <span>{product.quantity}</span>
          </li>
          <li className="list-group-item ">
            <label>description:</label>
            <p className="card-text">{product.discription}</p>
          </li>
        </ul>
        {role === 0 ? (
          <div>
            <button className="btn btn-info m-2" onClick={edit}>
              Edit
            </button>
            <button className="btn btn-danger m-2" onClick={deleteProduct}>
              Delete
            </button>
          </div>
        ) : (
          <div >
            {incart ? (
              <button
                className="btn btn-warning"
                onClick={() => removeFromCart(product.id)}
                style={{ marginLeft: "4rem" }}
              >
                Remove from Cart
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => addToCart(product.id)}
                style={{ marginLeft: "5rem" }}
              >
                Add to Cart
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;

// import React from "react";
// import "../style/product.css";

// const Product = ({
// product,
// handleAddToCart,
// handleRemoveFromCart,
// cartItem,
// role,
// }) => {
// return (
// <div className="product-card">
// <img src={product.image} alt="product" />
// <div className="product-details">
// <h3>{product.productName}</h3>
// <p>Price: {product.price}</p>
// {cartItem ? (
// <div className="cart-quantity">
// <button
// className="quantity-btn"
// onClick={() => handleRemoveFromCart(product._id)}
// >
// -
// </button>
// <p>{cartItem.quantity}</p>
// <button
// className="quantity-btn"
// onClick={() => handleAddToCart(product._id)}
// >
// +
// </button>
// </div>
// ) : (
// <button
// className="add-to-cart-btn"
// onClick={() => handleAddToCart(product._id)}
// >
// Add to Cart
// </button>
// )}
// {role === 0 && (
// <button className="delete-btn" onClick={() => console.log("Delete")}>
// Delete
// </button>
// )}
// </div>
// </div>
// );
// };

// export default Product;

// const { password, cart, ...rest } = response.data;
//         let newCart=[]
// if(cart[0]===''){
//   newCart = [ product.id]; // add the new product ID to the cart array

// }else{
//   newCart = [ ...cart,product.id]; // add the new product ID to the cart array

// }
//         setUser({ ...rest, cart: newCart }); // update the User state with the new cart value
//         axios.put(`http://localhost:3000/user`, { ...rest, cart: newCart }, { // pass the updated User state as the second argument to the axios.put call
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         })
//         .then((response) => {
//           console.log(response.data);

//         })
//         .catch((error) => {
//           console.error(error);
//         });

// const { password, cart, ...rest } = response.data;
//         let newCart=[]
// if(cart[0]===''){
//   newCart = [ product.id]; // add the new product ID to the cart array

// }else{
//   newCart = [ ...cart,product.id]; // add the new product ID to the cart array

// }
//         setUser({ ...rest, cart: newCart }); // update the User state with the new cart value
//         axios.put(`http://localhost:3000/user`, { ...rest, cart: newCart }, { // pass the updated User state as the second argument to the axios.put call
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         })
//         .then((response) => {
//           console.log(response.data);

//         })
//         .catch((error) => {
//           console.error(error);
//         });
