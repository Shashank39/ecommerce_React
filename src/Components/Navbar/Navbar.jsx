import React, { useContext, useState } from "react";
import "./Navbar.css";
import logo from "../../Assests/logo.png";
import cart_icon from "../../Assests/cart_icon.png";
import user_profile from "../../Assests/user-profule.png";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

export const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>Shopify</p>
      </div>
      {token ? (
        <>
          <ul className="nav-menu">
            {userRole === "admin" ? (
              <>
                <li>
                  <Link style={{ textDecoration: "none" }} to="/about">
                    About
                  </Link>
                </li>

                <li>
                  <Link style={{ textDecoration: "none" }} to="/add-product">
                    Product
                  </Link>
                </li>

                <li>
                  <Link style={{ textDecoration: "none" }} to="/coupon">
                    Coupon
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li
                  onClick={() => {
                    setMenu("shop");
                  }}
                >
                  <Link to="/" style={{ textDecoration: "none" }}>
                    Shop
                  </Link>
                  {menu === "shop" ? <hr /> : <></>}
                </li>
                <li
                  onClick={() => {
                    setMenu("mens");
                  }}
                >
                  <Link to="/mens" style={{ textDecoration: "none" }}>
                    Men
                  </Link>
                  {menu === "mens" ? <hr /> : <></>}
                </li>
                <li
                  onClick={() => {
                    setMenu("womens");
                  }}
                >
                  <Link to="/womens" style={{ textDecoration: "none" }}>
                    Women
                  </Link>
                  {menu === "womens" ? <hr /> : <></>}
                </li>
                <li
                  onClick={() => {
                    setMenu("kids");
                  }}
                >
                  <Link to="/kids" style={{ textDecoration: "none" }}>
                    Kids
                  </Link>
                  {menu === "kids" ? <hr /> : <></>}
                </li>
              </>
            )}
          </ul>

          <div className="nav-login-cart">
            {token ? (
              <>
                <p>Welcome, {localStorage.getItem("userName")}</p>
                <Link
                  to="/login"
                  onClick={handleLogout}
                  style={{ textDecoration: "none" }}
                >
                  <button>Logout</button>
                </Link>
              </>
            ) : (
              <Link to="/login" style={{ textDecoration: "none" }}>
                <button>Login</button>
              </Link>
            )}
            {userRole === "user" ? (
              <>
                <Link to="/cart" style={{ textDecoration: "none" }}>
                  <img src={cart_icon} alt="" />
                </Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
                <Link to="/user-profile" style={{ textDecoration: "none" }}>
                  <img
                    src={user_profile}
                    alt="User Profile"
                    className="user-profile"
                  />
                </Link>
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
