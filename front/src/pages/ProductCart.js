import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/cart.css";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import Cart from "../componants/Cart";
function PurchaseCart() {
  const [formData, setformData] = useState({
    reciverName: "",
    reciverPhno: "",
    address: {
      street: "",
      city: "",
      district: "",
      state: "",
      pincode: 0,
    },
  });
  const [User, setUser] = useState();

  const [cart, setcart] = useState([]);
  const [totals, settotals] = useState(0);

  const token = localStorage.getItem("token");
const navigate=useNavigate()
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   token?setIsLoggedin(true):navigate("/login")
  //   const Role=localStorage.getItem("Role")
  //   Role==="Admin"?setRole(0):Role==="User"&&setRole(1)

  // }, []);
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
          .get(`http://localhost:3000/user/${response.data.id}/carts`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log("dssdsdsds", response.data);
            let total = 0;
            response.data.map((data) => {
              total += data.price * data.quantity;
            });
            settotals(total);
            setcart(response.data);
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };
  const handleAddressInputChange = (event) => {
    const { name, value } = event.target;
    if (name !== "pincode") {
      setformData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value,
        },
      });
    } else {
      setformData({
        ...formData,
        address: {
          ...formData.address,
          [name]: parseInt(value),
        },
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`http://localhost:3000/user/${User.id}/carts`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log("dssdsdsds", response.data);
        let total = 0;
        response.data.map((data) => {
          total += data.price * data.quantity;
        });
        settotals(total);
        setcart(response.data);

        const data = {
          ...formData,
          products: response.data,
          totalPrice: total,
        };
        console.log(data);
        axios
          .post(`http://localhost:3000/user/${User.id}/invoice`,data, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            axios
            .delete(`http://localhost:3000/user/${User.id}/carts`, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
           navigate("/success")
            })
          console.log(response.data)
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });

    // console.log("hgghghghghgh",formData)
    // Here, you can send the purchaseEntries data to a server or a database using fetch or axios.
  };

  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     event.preventDefault();
  //     event.returnValue = "";
  //   };
  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  return (
    <div className="container cartSEC mt-5 mb-5 shadow">
      <div className="row">
        <div className="col-8 cart overflow-auto">
          <h1 className="sticky-top bg-dark text-light rounded-pill">CART</h1>
          {cart.map((cart) => (
            <Cart
              key={cart.id}
              productId={cart.ProductId}
              user={User}
              cart={cart}
            />
          ))}
          {/* <h2 className="sticky-buttom bg-dark text-light rounded-pill">Total:{totals}</h2> */}
        </div>

        <div className="col-4 Daddres">
          <h1>Delevery Details</h1>
          <form onSubmit={handleSubmit} className="container">
            <div>
              <div className=" d-flex-end justify-content-between m-3 mb-3">
                <label className="form-label ">Recever name:</label>{" "}
                <div className=" d-flex name">
                  <input
                    required
                    onChange={handleInputChange}
                    placeholder="name"
                    type="text"
                    value={formData.reciverName}
                    name="reciverName"
                  />
                </div>
              </div>
              <div className=" d-flex-end justify-content-between m-3 mb-3">
                <label className="form-label ">Recever Ph.no:</label>{" "}
                <div className=" d-flex name">
                  <input
                    required
                    onChange={handleInputChange}
                    placeholder="ph.no"
                    type="text"
                    value={formData.reciverPhno}
                    name="reciverPhno"
                  />
                </div>
              </div>
            </div>

            <div className="d-flex-end justify-content-between m-3 mb-3">
              <label className="form-label ">Address:</label>{" "}
              <div className="address">
                <div className=" d-flex street">
                  <input
                    required
                    placeholder="door no./street"
                    type="text"
                    name="street"
                    value={formData.address.street}
                    onChange={handleAddressInputChange}
                  />
                </div>
                <div className="d-flex ">
                  <input
                    required
                    placeholder="city"
                    type="text"
                    name="city"
                    value={formData.address.city}
                    onChange={handleAddressInputChange}
                  />
                  <input
                    required
                    placeholder="district"
                    type="text"
                    name="district"
                    value={formData.address.district}
                    onChange={handleAddressInputChange}
                  />
                </div>
                <div className="d-flex ">
                  <input
                    required
                    placeholder="state"
                    type="text"
                    name="state"
                    value={formData.address.state}
                    onChange={handleAddressInputChange}
                  />
                  <input
                    required
                    placeholder="pincode"
                    type="number"
                    name="pincode"
                    value={formData.address.pincode}
                    onChange={handleAddressInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-around m-3 mt-5 mb-3">
              <input required type="submit" value="Place Order" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default PurchaseCart;
