import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./Products.module.scss";

type Product = {
  id: number;
  name: string;
  price: number;
  amount: number;
};

const Products = () => {
  const [products, setProducts] = useState<Product[] | []>([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>();

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

  const handleAddNewProduct = async (data: Product) => {
    const { name, price, amount } = data;
    if (name && price > 0 && amount > 0) {
      await axios
        .post("/api/v1/products", {
          name,
          price,
          amount,
        })
        .then((result) => {
          console.log("Successful");
          fetchProducts();
          reset();
        })
        .catch((err) => {
          console.log("err: ", err);
        });
    }
  };

  return (
    <div>
      <nav>Navbar</nav>
      {products.length > 0 ? (
        <div className={styles.products_list}>
          {products.map((data, index) => {
            return (
              <div key={index} onClick={() => navigate(`/product/${data.id}`)}>
                <h3>{data.name}</h3>
                <h3>{data.price}</h3>
                <h3>{data.amount}</h3>
              </div>
            );
          })}
        </div>
      ) : (
        <h3>Loading...</h3>
      )}

      <form
        onSubmit={handleSubmit(handleAddNewProduct)}
        className={styles.general_form}
      >
        <div>
          <label>Product name</label>
          <input
            id="name"
            {...register("name", {
              required: "This is required",
              minLength: {
                value: 5,
                message: "It has to be more than 5 letters",
              },
            })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label>Price</label>
          <input
            id="price"
            type="number"
            {...register("price", {
              required: "Amount is required",
              min: {
                value: 0,
                message: "Amount must be greater than or equal to 0",
              },
            })}
          />
          {errors.price && <p>{errors.price.message}</p>}
        </div>
        <div>
          <label>Amount</label>
          <input
            id="amount"
            type="number"
            {...register("amount", {
              required: "Amount is required",
              min: {
                value: 0,
                message: "Amount must be greater than or equal to 0",
              },
            })}
          />
          {errors.amount && <p>{errors.amount.message}</p>}
        </div>
        <input
          className={styles.general_form__button}
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default Products;
