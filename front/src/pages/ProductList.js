import React, { useState, useEffect } from "react";
import '../style/product.css';
import Product from '../componants/product';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ProductList = () => {
const [products, setproducts] = useState([]);

  const [role, setRole] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [User, setUser] = useState({
    cart: []
  });
  const[cart,setcart]=useState([])
  const navigate = useNavigate(); // Add this line to get the history object

  useEffect(() => {
    const token = localStorage.getItem("token");
    token?setIsLoggedin(true):navigate("/login")
    const Role=localStorage.getItem("Role")
    Role==="Admin"?setRole(0):Role==="User"&&setRole(1)

  }, []);

 
  useEffect(() => {
    const token = localStorage.getItem("token");
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
        .get(`http://localhost:3000/user/${response.data.id}/carts`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("dssdsdsds",response.data)
setcart(response.data) 
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:3000/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setproducts(response.data);
        console.log(response.data);

      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  // const Allproducts = () => {
   
  //   // Send product data to the server if user is admin
  //   if (isAdmin) {
  //     const token = localStorage.getItem("token");
  //     axios
  //       .get(`http://localhost:3000/products`,{
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       })
  //       .then((response) => {
  //         setproducts(response.data)
  //         console.log(response.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // };

  if (!isLoggedin) {
    return <h1>All Product</h1>; // Don't render the component if user is not admin
  }
{}
  return (
    <div className='container'>
      <div className='row row-cols-4'>
        {products.map((product) => (
          <Product product={product} key={product.id} user={User} cart={cart} role={role}/>
        ))}
      </div>
    </div>
  );
};

export default ProductList;


// import React, { useState, useEffect } from "react";
// import '../style/product.css';
// import Product from '../componants/product';
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [role, setRole] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState({ cart: [] });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     token ? setIsLoggedIn(true) : navigate("/login");
//     const role = localStorage.getItem("Role");
//     role === "Admin" ? setRole(0) : role === "User" && setRole(1);
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     axios
//       .get(`http://localhost:3000/user`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })
//       .then((response) => {
//         console.log(response.data);
//         setUser(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     axios
//       .get(`http://localhost:3000/products`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })
//       .then((response) => {
//         setProducts(response.data);
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   const handleAddToCart = (productId) => {
//     const updatedCart = [...user.cart];
//     const existingCartItem = updatedCart.find(
//       (item) => item.ProductId === productId
//     );
//     if (existingCartItem) {
//       existingCartItem.quantity += 1;
//     } else {
//       updatedCart.push({
//         id: Math.floor(Math.random() * 1000), // Generate unique id for cart item
//         productName: products.find((product) => product.id === productId)
//           .productName,
//         price: products.find((product) => product.id === productId).price,
//         quantity: 1,
//         authId: user.authId,
//         ProductId: productId,
//       });
//     }
//     const token = localStorage.getItem("token");
//     axios
//       .put(
//         `http://localhost:3000/user/${user.id}`,
//         { cart: updatedCart },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       )
//       .then((response) => {
//         console.log(response.data);
//         setUser({ ...user, cart: updatedCart });
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const handleRemoveFromCart = (productId) => {
//     const updatedCart = [...user.cart];
//     const existingCartItemIndex = updatedCart.findIndex(
//       (item) => item.ProductId === productId
//     );
//     const existingCartItem = updatedCart[existingCartItemIndex];
//     if (existingCartItem.quantity === 1) {
//       updatedCart.splice(existingCartItemIndex, 1);
//     } else {
//       existingCartItem.quantity -= 1;
//     }
//     const token = localStorage.getItem("token");
//     axios
//       .put(
//         `http://localhost:3000/user/${user.id}`,
//           {
//             cart: updatedCart,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         )
//         .then((response) => {
//           console.log(response.data);
//           setUser({ ...user, cart: updatedCart });
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     };
    
//     return (
//     <div className="product-list-container">
//     <h1>Product List</h1>
//     <div className="products-container">
//     {products.map((product) => (
//     <Product
//     key={product._id}
//     product={product}
//     handleAddToCart={handleAddToCart}
//     handleRemoveFromCart={handleRemoveFromCart}
//     cartItem={
//     user.cart.find((item) => item.ProductId === product._id) || null
//     }
//     role={role}
//     />
//     ))}
//     </div>
//     </div>
//     );
//     };
    
//     export default ProductList;