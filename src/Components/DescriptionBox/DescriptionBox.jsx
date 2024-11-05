import React from "react";
import "./DescriptionBox.css";
export const DescriptionBox = () => {
  return (
    <div className="descriptionBox">
      <div className="descriptionBox-navigator">
        <div className="decriptionBox-nav-box">Description</div>
        <div className="decriptionBox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionBox-description">
        <p>
          {" "}
          An eccomerce website is an online platform that facilitate facilitate
          the buying and selling process in a convenient and efficient manner.
          These websites typically include various features and functionalities
          such as product catalogs, search filters, shopping carts, secure
          payment gateways, and order management systems.
        </p>
        <p>
          Electronic commerce (e-commerce) refers to companies and individuals
          that buy and sell goods and services over the internet. E-commerce
          operates in different types of market segments and can be conducted
          over computers, tablets, smartphones, and other smart devices.
        </p>
      </div>
    </div>
  );
};
