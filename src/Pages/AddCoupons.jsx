import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/AddCoupon.css";
import { FaEdit } from "react-icons/fa";

export const AddCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCouponId, setCurrentCouponId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    discountPercentage: "",
    expireDate: "",
  });

  useEffect(() => {
    const fetchCoupons = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/coupons/viewCoupon"
      );
      setCoupons(
        Array.isArray(response.data.coupons) ? response.data.coupons : []
      );
    };
    fetchCoupons();
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const response = await axios.put(
          `http://localhost:3000/api/coupons/updateCoupons/${currentCouponId}`,
          formData
        );
        setCoupons(
          coupons.map((coupon) =>
            coupon._id === currentCouponId ? response.data.coupon : coupon
          )
        );
        setIsEditing(false);
        setCurrentCouponId(null);
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/coupons/create",
          formData
        );
        setCoupons([...coupons, response.data.coupon]);
      }
      setShowPopup(false);
      setFormData({
        name: "",
        discountPercentage: "",
        expireDate: "",
      });
    } catch (error) {
      console.error("Error adding/updating coupon:", error);
    }
  };

  const handleEditCoupon = (coupon) => {
    setFormData({
      name: coupon.name,
      discountPercentage: coupon.discountPercentage,
      expireDate: coupon.expireDate.split("T")[0],
    });
    setCurrentCouponId(coupon._id);
    setIsEditing(true);
    setShowPopup(true);
  };
  const handleToggleCoupon = async (couponId, isActive) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/coupons/changeStatus/${couponId}`,
        { isActive: !isActive }
      );
      setCoupons(
        coupons.map((coupon) =>
          coupon._id === couponId ? response.data.coupon : coupon
        )
      );
    } catch (error) {
      console.error("Error toggling coupon:", error);
    }
  };

  return (
    <div className="add-coupons-page">
      <div className="add-coupons-header">
        <h1>Coupons</h1>
        <button onClick={() => setShowPopup(true)}>+ Add Coupon</button>
      </div>

      <table className="coupons-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Discount Percentage</th>
            <th>Expire Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon._id}>
              <td>{coupon.name}</td>
              <td>{coupon.discountPercentage}%</td>
              <td>{new Date(coupon.expireDate).toLocaleDateString()}</td>
              <td>
                <div className="flex me-2">
                  <FaEdit onClick={() => handleEditCoupon(coupon)} />

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={coupon.isActive}
                        className="sr-only peer"
                        onChange={() =>
                          handleToggleCoupon(coupon._id, coupon.isActive)
                        }
                      />
                      <div className="relative w-10 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>{isEditing ? "Edit Coupon" : "Add Coupon"}</h2>
            <form onSubmit={handleAddCoupon}>
              <label>
                Coupon Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Discount Percentage:
                <input
                  type="number"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Expiration Date:
                <input
                  type="date"
                  name="expireDate"
                  value={formData.expireDate}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <button type="submit">{isEditing ? "Update" : "Submit"}</button>
              <button type="button" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCoupons;
