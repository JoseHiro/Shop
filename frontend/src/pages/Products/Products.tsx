import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

import styles from "./Products.module.scss";

type Product = {
  name: string;
  price: number;
  amount: number;
};

const Products = () => {
  const [products, setProducts] = useState<Product[] | []>([]);

  const fetchProducts = async () => {
    await axios
      .get("/api/v1/products")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((err) => {
        console.log(`failed fetching ${err}`);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      {products.length > 0 ? (
        <div>
          {products.map((data, index) => {
            return (
              <Fragment>
                <h3>{data.name}</h3>
                <h3>{data.price}</h3>
                <h3>{data.amount}</h3>
                <hr></hr>
              </Fragment>
            );
          })}
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
};

export default Products;
