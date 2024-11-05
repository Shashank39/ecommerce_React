import React, { useContext, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../../Assests/cart_cross_icon.png";
import { useNavigate } from "react-router-dom";

export const CartItems = () => {
  const navigate = useNavigate();
  const {
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  } = useContext(ShopContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  const coupons = [
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
  ];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCouponClick = (couponName) => {
    setPromoCode(couponName);
    closeModal();
  };

  return (
    <div className="cartItems">
      <div className="cartItems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        console.log(cartItems);
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartItems-format cartItems-format-main">
                <img src={e.image} alt="" className="cartIcon-product-icon" />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="cartItems-quantity">
                  {cartItems[e.id]}
                </button>
                <p>${e.new_price * cartItems[e.id]}</p>
                <img
                  src={remove_icon}
                  alt=""
                  className="cartItems-remove-icon"
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartItems-down">
        <div className="cartItems-total">
          <h1>Cart totals</h1>
          <div>
            <div className="cartItems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartItems-total-item">
              <p>Shipping Fee</p>
              <p>Fee</p>
            </div>
            <hr />
            <div className="cartItems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button onClick={() => navigate("/Checkout")}>
            Proceed to checkout
          </button>
        </div>
        <div className="cartItems">
          <div className="cartItems-promoCode">
            <p>If you have a promo code, Enter it here</p>
            <div className="cartItems-promobox">
              <input
                type="text"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="border p-2 rounded"
              />
              <button className="bg-blue-500 text-white p-2 rounded">
                Apply
              </button>
              <a
                onClick={openModal}
                className="text-blue-500 cursor-pointer add-coupon-link"
              >
                +Add coupon
              </a>
            </div>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-96 overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">
                  <ins>Select a Coupon</ins>
                </h2>
                <div className="table-container">
                  <table className="w-full border-collapse">
                    <thead className="sticky top-0 bg-white">
                      <tr>
                        <th className="border p-2">Coupon Name</th>
                        <th className="border p-2">Discount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coupons.map((coupon, index) => (
                        <tr
                          key={index}
                          onClick={() => handleCouponClick(coupon.name)}
                          className="cursor-pointer hover:bg-gray-200"
                        >
                          <td className="border p-2">{coupon.name}</td>
                          <td className="border p-2">{coupon.discount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  onClick={closeModal}
                  className="mt-4 bg-red-500 text-white p-2 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItems;
