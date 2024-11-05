import React, { useState } from "react";
import "./CSS/Loginsignup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();

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

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (emailError) {
      alert("Please fix the errors before submitting");
    } else {
      try {
        const response = await axios
          .post(
            "http://localhost:3000/api/users/forgot-password",
            { email },
            { withCredentials: true }
          )
          .then((res) => {
            console.log(res);
          });
        console.log("API Response:", response);
        alert("Password reset link sent to your email");
        // navigate("/login");
      } catch (err) {
        console.log(err);
        alert("Failed to send password reset link: " + err.message);
      }
    }
  };

  return (
    <div className="forgot-password">
      <div className="forgot-password-container">
        <h1 className="forgot-password-text">Forgot Password</h1>
        <div className="forgot-password-fields">
          <input
            type="email"
            placeholder="Email Address"
            onChange={emailHandler}
          />
          {emailError ? (
            <span className="error">Invalid email format</span>
          ) : (
            ""
          )}
        </div>
        <button type="submit" onClick={handleForgotPassword}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
