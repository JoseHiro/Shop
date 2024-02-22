import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./Login.module.scss";

type Form = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Form>();

  const handleLogIn = async (data: Form) => {
    const { email, password } = data;
    if (email && password) {
      await axios
        .post("/api/v1/login", {
          user: { email, password },
        })
        .then((result) => {
          console.log("success");
          navigate("/cart");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={styles.form_container}>
      <form
        className={styles.general_form}
        onSubmit={handleSubmit(handleLogIn)}
      >
        <h3>Login to account</h3>
        <input
          placeholder="Email"
          id="email"
          {...register("email", {
            required: { value: true, message: "This filed is required" },
          })}
        />
        {errors.email && (
          <div className={styles.errors_container}>
            <p>{errors.email.message}</p>
          </div>
        )}

        <input
          placeholder="Password"
          id="password"
          type="password"
          {...register("password", {
            required: { value: true, message: "This filed is required" },
          })}
        />

        {errors.password && (
          <div>
            <p>{errors.password.message}</p>
          </div>
        )}

        <input
          className={styles.general_form__button}
          type="submit"
          value="Sign in"
        />
      </form>
    </div>
  );
};

export default Login;
