import React, { useContext, useState } from "react";
import "./ProductDisplay.css";
import star_icon from "../../Assests/star_icon.png";
import star_dull_icon from "../../Assests/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

export const ProductDisplay = (props) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt=""></img>
          <img src={product.image} alt=""></img>
          <img src={product.image} alt=""></img>
          <img src={product.image} alt=""></img>
        </div>
        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img"
            src={product.image}
            alt=""
          ></img>
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>120</p>
        </div>
        <div className="productdisplay-right-price">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit
          quod porro ducimus aperiam, sequi hic sunt magni, modi non tempore,
          numquam a. Delectus itaque reiciendis numquam non accusantium ipsa nam
          praesentium earum.
        </div>
        <div className="productdisplay-right-size">
          <h1>Select size</h1>
          <div className="productdisplay-right-sizes">
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <div
                key={size}
                className={`size-option ${
                  selectedSize === size ? "selected" : ""
                }`}
                onClick={() => handleSizeClick(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => {
            addToCart(product.id);
          }}
        >
          Add to Cart
        </button>
        <p className="productdisplay-right-category">
          <span>Category:</span>Women , T-Shirt, Crop Top
        </p>
        <p className="productdisplay-right-category">
          <span>Tags:</span>Modern , Latest
        </p>
      </div>
    </div>
  );
};
