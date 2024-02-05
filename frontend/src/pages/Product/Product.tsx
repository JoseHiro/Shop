import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import styles from "./Product.module.scss";

const Product = () => {
  const [product, setProduct] = useState<any | null>(null);
  const { id } = useParams();

  const fetchProduct = async () => {
    if (id) {
      await axios
        .get(`/api/v1/products/${id}`)
        .then((result) => {
          setProduct(result.data.product);
          console.log(result.data.product);
        })
        .catch((err) => {
          console.log("err: " + err);
        });
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      {product ? (
        <div className={styles.product_container}>
          <div className={styles.img_container}>
            <div className={styles.selected_img}>Img</div>
            <div className={styles.sub_img}>
              <div>img</div>
              <div>img</div>
              <div>img</div>
              <div>img</div>
            </div>
          </div>

          <div className={styles.description_container}>
            <div>
              <h2>{product.name}</h2>
              <h3>${product.price}</h3>
              <h4>Size S M L</h4>
              <p>
                DescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescription
                DescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescription
                DescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescription
              </p>
            </div>

            <div className={styles.purchase_management}>
              <button>Put in Card</button>
              <button>Purchase now</button>
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
};

export default Product;
