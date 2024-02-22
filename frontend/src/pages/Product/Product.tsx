import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import styles from "./Product.module.scss";

type Image = {
  img_url: string;
};
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
            {product.images.length > 0 ? (
              <Fragment>
                <img
                  className={styles.selected_img}
                  alt=""
                  src={product.images[0].img_url}
                />
                <div className={styles.sub_img}>
                  {product.images.map((data: Image, index: any) => {
                    return (
                      <img
                        className={styles.selected_img}
                        alt=""
                        src={data.img_url}
                      />
                    );
                  })}
                </div>
              </Fragment>
            ) : (
              <img
                alt=""
                src={
                  "https://sesupport.edumall.jp/hc/article_attachments/900009570963/noImage.jpg"
                }
              />
            )}
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
