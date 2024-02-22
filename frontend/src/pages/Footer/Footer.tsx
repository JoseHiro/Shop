import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer_container}>
      <div>
        <ul>
          <li>Home</li>
          <li>How To Use</li>
          <li>Contact</li>
        </ul>
        <ul>
          <li>Instagram</li>
          <li>Shipping</li>
        </ul>
      </div>
      <div>
        <h1>SHOP NAME</h1>
      </div>
    </div>
  );
};

export default Footer;
