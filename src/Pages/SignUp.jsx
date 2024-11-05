import React, { useState } from "react";
import "./CSS/Loginsignup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [shopName, setShopName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const navigate = useNavigate();

  const nameHandler = (e) => {
    const nameValue = e.target.value;
    if (nameValue.length < 3) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    setName(nameValue);
  };

  const emailHandler = (e) => {
    const emailValue = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailValue)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    setEmail(emailValue);
  };

  const passwordHandler = (e) => {
    if (e.target.value.length < 3) {
      setPassError(true);
    } else {
      setPassError(false);
    }
    setPassword(e.target.value);
  };

  const roleHandler = (e) => {
    setRole(e.target.value);
  };

  const shopNameHandler = (e) => {
    setShopName(e.target.value);
  };

  const signUp = async (e) => {
    e.preventDefault();
    if (nameError || emailError || passError) {
      alert("Please fix the errors before submitting");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/register",
          {
            name,
            email,
            password,
            role,
            shopName: role === "admin" ? shopName : undefined,
          }
        );
        console.log("API Response:", response);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user._id);
        localStorage.setItem("userName", response.data.user.name);
        localStorage.setItem("userRole", response.data.user.role);
        alert("Sign Up Successful");
        navigate("/login");
      } catch (err) {
        console.log(err);
        alert("Sign Up Failed: " + err.message);
      }
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1> Sign Up</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder="Enter Name" onChange={nameHandler} />
          {nameError ? (
            <span style={{ color: "red" }}>Invalid name format</span>
          ) : (
            ""
          )}
          <input
            type="email"
            placeholder="Email Address"
            onChange={emailHandler}
          />
          {emailError ? (
            <span style={{ color: "red" }}>Invalid email format</span>
          ) : (
            ""
          )}
          <input
            type="password"
            placeholder="Password"
            onChange={passwordHandler}
          />
          {passError ? (
            <span style={{ color: "red" }}>Password not valid</span>
          ) : (
            ""
          )}
          {/* <input
            type="text"
            placeholder="Address"
            onChange={(e) => setAddresses(e.target.value)}
          />
          <input
            type="text"
            placeholder="Pincode"
            onChange={(e) => setPincode(e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
          /> */}
          {/*   <select onChange={roleHandler} value={role}> */}
          <select
            onChange={roleHandler}
            value={role}
            class="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 select-box"
          >
            <option value="select">Select the Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          {role === "admin" && (
            <input
              type="text"
              placeholder="Shop Name"
              onChange={shopNameHandler}
            />
          )}
        </div>
        <button type="submit" onClick={signUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignIn;
