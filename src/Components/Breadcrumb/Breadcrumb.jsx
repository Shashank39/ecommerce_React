import React from "react";
import "./Breadcrumb.css";
/* import arrow_icon from "../Assests/arrow.png"; */
import arrow_icon from "../../Assests/arrow.png";

export const Breadcrumb = (props) => {
  console.log(props);
  const { product } = props;
  return (
    <div className="breadcrumb">
      HOME
      <img src={arrow_icon} alt="" />
      SHOP <img src={arrow_icon} alt="" />
      {product.category}
      <img src={arrow_icon} alt="" />
      {product.name}
    </div>
  );
};
