import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/AddProduct.css";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

export const AddProduct = () => {
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    manufacturer: "",
    price: "",
    stock: "",
    expirationDate: "",
    image: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:3000/api/medicines");
      setProducts(response.data);
    };
    fetchProducts();
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const response = await axios.put(
          `http://localhost:3000/api/medicines/${currentProductId}`,
          formData,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        setProducts(
          products.map((product) =>
            product._id === currentProductId ? response.data : product
          )
        );
        setIsEditing(false);
        setCurrentProductId(null);
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/medicines",
          formData,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        setProducts([...products, response.data]);
      }
      setShowPopup(false);
      setFormData({
        name: "",
        manufacturer: "",
        price: "",
        stock: "",
        expirationDate: "",
        image: "",
      });
    } catch (error) {
      console.error("Error adding/updating product:", error);
    }
  };

  const handleEditProduct = (product) => {
    setFormData({
      name: product.name,
      manufacturer: product.manufacturer,
      price: product.price,
      stock: product.stock,
      expirationDate: product.expirationDate.split("T")[0],
      image: product.image,
    });
    setCurrentProductId(product._id);
    setIsEditing(true);
    setShowPopup(true);
  };

  const handleDeleteProduct = async (productId) => {
    debugger;
    try {
      await axios.delete(`http://localhost:3000/api/medicines/${productId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="add-product-page">
      <div className="add-product-header">
        <button onClick={() => setShowPopup(true)}>+ Add Product</button>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Expiration Date</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.manufacturer}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{new Date(product.expirationDate).toLocaleDateString()}</td>
              <td>
                <img src={product.image} alt={product.name} width="50" />
              </td>
              <td>
                <div className="flex me-2">
                  <FaEdit
                    className=""
                    onClick={() => handleEditProduct(product)}
                  />
                  <FaDeleteLeft
                    onClick={() => handleDeleteProduct(product._id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h1>
              <b>{isEditing ? "Edit Product" : "Add Product"}</b>
            </h1>
            <form onSubmit={handleAddProduct}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Manufacturer:
                <input
                  type="text"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Price:
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Stock:
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Expiration Date:
                <input
                  type="date"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Image URL:
                <input
                  type="text"
                  name="image"
                  value={formData.image}
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

export default AddProduct;
