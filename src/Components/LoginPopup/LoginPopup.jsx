import React, { useContext, useEffect, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { url, setToken, token } = useContext(StoreContext);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (currentState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
  const response = await axios.post(newUrl, data);
  if (response.data.success) {
    setToken(response.data.token);
    localStorage.setItem("token", response.data.token);
    setShowLogin(false);
  } else {
    alert(response.data.message);
  }
} catch (error) {
  console.error("Axios error:", error.response?.data || error.message);
  alert("Login/Register failed: " + (error.response?.data?.message || "Unknown error"));
}
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-input">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              placeholder="Your Name"
              required
            />
          )}

          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Your Email"
            required
          />
          <input
            type="password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            placeholder="Your Password"
            required
          />
        </div>
        <button type="submit">
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" />
          <p>By continuing ,i agree to the terms and conditions</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account?
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
