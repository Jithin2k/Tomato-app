import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id]) {
        let itemInfo = { ...item };
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 10,
    };
    let response = await axios.post(`${url}/api/orders/place`, orderData, {
      headers: { token: token },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            onChange={onChangeHandler}
            type="text"
            name="firstName"
            value={data.firstName}
            placeholder="First Name"
            required
          />
          <input
            onChange={onChangeHandler}
            type="text"
            name="lastName"
            value={data.lastName}
            placeholder="Last Name"
            required
          />
        </div>
        <input
          type="email"
          onChange={onChangeHandler}
          name="email"
          value={data.email}
          placeholder="Email"
          required
        />
        <input
          type="street"
          onChange={onChangeHandler}
          name="street"
          value={data.street}
          placeholder="street"
          required
        />
        <div className="multi-fields">
          <input
            type="text"
            onChange={onChangeHandler}
            name="city"
            value={data.city}
            placeholder="City"
            required
          />
          <input
            type="text"
            onChange={onChangeHandler}
            name="state"
            value={data.state}
            placeholder="State"
            required
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            onChange={onChangeHandler}
            name="zipcode"
            value={data.zipcode}
            placeholder="Zipcode"
            required
          />
          <input
            type="text"
            onChange={onChangeHandler}
            name="country"
            value={data.country}
            placeholder="Country"
            required
          />
        </div>
        <input
          type="text"
          onChange={onChangeHandler}
          name="phone"
          value={data.phone}
          placeholder="Phone"
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub Total</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fees</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 10}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}
              </b>
            </div>
            <button type="submit">Proceed To Payment</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
