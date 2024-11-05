import React from "react";
import Hero from "../Components/Hero/Hero";
import "./CSS/About.css";
export const About = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <Hero />
      <h1 className="titleHeading">
        <b>About Us</b>
      </h1>
      <p>
        Welcome to <strong>Your Store's Name</strong> — where shopping meets
        convenience and quality! Established with a passion for delivering the
        best products right to your door, we are a team dedicated to
        transforming your online shopping experience. Our mission is to bring
        you a diverse range of products that suit every taste and budget.
      </p>

      <h2 className="titleHeading">
        <b>Our Story</b>
      </h2>
      <p>
        Born from a desire to create a one-stop shopping destination,{" "}
        <strong>Your Store's Name</strong> was founded on values of quality,
        reliability, and customer satisfaction. We’ve grown from a small online
        store to a full-fledged platform, thanks to our loyal customers who
        trust us with their needs.
      </p>

      <h2 className="titleHeading">
        <b>What We Offer</b>
      </h2>
      <p>
        We provide an extensive selection of products including{" "}
        <em>electronics, fashion, home goods</em>, and more, ensuring that
        there’s something for everyone. With curated collections and quality
        standards in place, we aim to make your shopping experience simple,
        enjoyable, and secure.
      </p>

      <h2 className="titleHeading">
        <b>Why Choose Us?</b>
      </h2>
      <ul>
        <li>
          <strong>Quality Products:</strong> We partner with trusted brands and
          suppliers to bring you high-quality, reliable products.
        </li>
        <li>
          <>Customer-Centric Service:</> Your satisfaction is our priority. Our
          dedicated customer support team is here to assist you at every step.
        </li>
        <li>
          <strong>Seamless Shopping:</strong> With a user-friendly platform,
          secure payment options, and reliable delivery, we ensure a hassle-free
          shopping journey.
        </li>
      </ul>

      <h2 className="titleHeading">
        <b>Our Commitment</b>
      </h2>
      <p>
        At <strong>Your Store's Name</strong>, we believe in building
        relationships based on trust. We’re always listening to feedback to
        improve and grow. Every product and service we offer is crafted with
        care to provide you with the best shopping experience possible.
      </p>

      <p>
        Thank you for choosing <strong>Your Store's Name</strong>. We’re excited
        to be part of your shopping journey!
      </p>
    </div>
  );
};
