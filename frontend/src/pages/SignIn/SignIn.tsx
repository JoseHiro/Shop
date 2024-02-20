import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import styles from "./Signin.module.scss";

type Form = {
  email: string;
  password: string;
};
const SignIn = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Form>();

  const handleSignIn = async (data: Form) => {
    const { email, password } = data;
    if (email && password) {
      await axios
        .post("/api/v1/users", {
          user: { email, password },
        })
        .then((result) => {
          console.log("success");
          reset();
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
        onSubmit={handleSubmit(handleSignIn)}
      >
        <h3>Create account</h3>
        <input
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
          id="password"
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

export default SignIn;
