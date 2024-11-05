import React, { useState } from "react";
import "./CSS/Loginsignup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const LoginSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    if (emailError || passError || email.length < 3 || password.length < 3) {
      alert("Invalid Email or Password");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/login",
          {
            email: email,
            password: password,
          }
        );
        console.log("API Response:", response);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("userRole", response.data.user.role);
        localStorage.setItem("userName", response.data.user.name);
        if (response.status === 200) {
          console.log("Response Data:", response.data);
          alert("Login Successful");
          if (response.data.user.role === "admin") {
            navigate("/about");
          } else {
            navigate("/");
          }
        }
      } catch (err) {
        alert("Invalid Email or Password");
      }
    }
  };
  const checkboxHandler = (e) => {
    setIsChecked(e.target.checked);
  };
  const passwordHandler = (e) => {
    if (e.target.value.length < 3) {
      setPassError(true);
    } else {
      setPassError(false);
    }
    setPassword(e.target.value);
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

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1> Login</h1>
        <div className="loginsignup-fields">
          <input
            type="email"
            placeholder="Email Address"
            onChange={emailHandler}
          />
          {emailError ? <span>Invalid email format</span> : ""}
          <input
            type="password"
            placeholder="Password"
            onChange={passwordHandler}
          />
          {passError ? <span>Password not valid</span> : ""}
          <Link to="/forgotPassword" className="forgot-password-link">
            Forgot Password?
          </Link>
        </div>
        <p className="loginsignup-login">
          New to website?
          <Link to="/signIn">
            <span>Sign In</span>
          </Link>
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" onChange={checkboxHandler} />
          <p>By continuing , I agree to the terms of use & privacy policy</p>
        </div>
        <button type="submit" onClick={login} disabled={!isChecked}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default LoginSignUp;
