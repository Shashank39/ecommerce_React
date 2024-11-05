import React, { useState } from "react";
import "./CSS/Loginsignup.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();
  const passwordHandler = (e) => {
    const passwordValue = e.target.value;
    if (passwordValue.length < 3) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    setPassword(passwordValue);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (passwordError) {
      alert("Please fix the errors before submitting");
    } else {
      try {
        const response = await axios
          .post(
            `http://localhost:3000/api/users/reset-password/${token}`,
            { password },
            { withCredentials: true }
          )
          .then((res) => {
            console.log(res);
          });
        console.log("API Response:", response);
        alert("Password has been reset successfully");
        navigate("/login");
      } catch (err) {
        console.log(err);
        alert("Failed to reset password: " + err.message);
      }
    }
  };

  return (
    <div className="reset-password">
      <div className="reset-password-container">
        <h1 className="reset-password-text">Reset Password</h1>
        <div className="reset-password-fields">
          <input
            type="password"
            placeholder="New Password"
            onChange={passwordHandler}
          />
          {passwordError ? (
            <span className="error">
              Password must be at least 3 characters
            </span>
          ) : (
            ""
          )}
        </div>
        <button type="submit" onClick={handleResetPassword}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
