import "./App.css";
import { Navbar } from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Shop from "./Pages/Shop";
import { ShopCategory } from "./Pages/ShopCategory";
import { Product } from "./Pages/Product";
import { Cart } from "./Pages/Cart";
import { LoginSignUp } from "./Pages/LoginSignUp";
import { Footer } from "./Components/Footer/Footer";
import men_banner from "../src/Assests/banner_mens.png";
import women_banner from "../src/Assests/banner_women.png";
import kid_banner from "../src/Assests/banner_kids.png";
import { SignIn } from "./Pages/SignUp";
import Checkout from "./Pages/Checkout";
import UserProfile from "./Pages/UserProfile";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import { About } from "./Pages/About";
import { AddProduct } from "./Pages/AddProduct";
import { AddCoupons } from "./Pages/AddCoupons";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/coupon" element={<AddCoupons />} />
        <Route path="/" element={<Shop />} />
        <Route
          path="/mens"
          element={<ShopCategory banner={men_banner} category="mens" />}
        />
        <Route
          path="/womens"
          element={<ShopCategory banner={women_banner} category="womens" />}
        />
        <Route
          path="/kids"
          element={<ShopCategory banner={kid_banner} category="kids" />}
        />
        <Route path="/product" element={<Product />}>
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
