import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Navbar.module.scss";

const Navbar = () => {

  const navigate = useNavigate();
  return (
    <div className={styles.navbar_container}>
      <h2>Shop</h2>
      <ul>
        <li onClick={() => navigate('/login')}>Login</li>
        <li onClick={() => navigate('/signin')}>Sign In</li>
        <li>Products</li>
      </ul>
    </div>
  );
};

export default Navbar;
