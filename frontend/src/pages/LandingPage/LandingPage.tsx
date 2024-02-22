import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Products from "../Products/Products";

import styles from "./LandingPage.module.scss";

interface Product {
  id: number;
  name: string;
  price: number;
  amount: number;
  images: Image[];
}

type Image = {
  img_url: string;
};

const LandingPage = () => {
  return (
    <div>
      {/* header */}
      <div></div>
      {/* body */}
      <div></div>
      <Products />
    </div>
  );
};

export default LandingPage;
