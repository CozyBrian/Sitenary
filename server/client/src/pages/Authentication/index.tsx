import axios, { AxiosError } from "axios";
import cn from "classnames";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { BACKEND_URL } from "../../constants";

interface FormInput {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone_number: string;
}

const Auth = () => {
  const [authMode, setAuthMode] = useState<"LOGIN" | "REGISTER">("LOGIN");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_isRequestSent, setIsRequestSent] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const BACKEND_URL = "http://localhost:3000";

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    setIsRequestSent(true);

    axios
      .post(
        `${BACKEND_URL}${
          authMode === "REGISTER" ? "/api/v1/users" : "/api/v1/auth/tokens"
        }`,
        {
          ...data,
          station_id: 1,
          role_id: 1,
        }
      )
      .then((res) => {
        console.log(res.data);
        if (authMode === "REGISTER") {
          setAuthMode("LOGIN");
          navigate("/login");
        } else {
          navigate("/");
        }
      })
      .catch((err: AxiosError) => {
        console.log(err.response?.data);
      })
      .finally(() => {
        setIsRequestSent(false);
      });
  };

  return (
    <div className="auth-page-container">
      <div className="auth-container">
        <p className="form-title">
          {authMode === "LOGIN" ? "Login" : "Register"}
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              {...register("email", {
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              })}
              className={cn("border border-slate-800 p-2", {
                "outline outline-red-500 border-red-400": errors.email,
              })}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              {...register("password", { required: true })}
              type="password"
            />
          </div>
          {authMode === "REGISTER" && (
            <>
              <div className="input-container">
                <label htmlFor="password_confirmation">Password Confirm</label>
                <input
                  {...register("password_confirmation", { required: true })}
                  type="password"
                />
              </div>
              <div className="input-container">
                <label htmlFor="username">Username</label>
                <input
                  {...register("username", { required: true })}
                  type="text"
                />
              </div>
              <div className="input-container">
                <label htmlFor="phone_number">Phone Number</label>
                <input
                  {...register("phone_number", { required: true })}
                  type="text"
                />
              </div>
            </>
          )}
          <button type="submit" className="submit-button">
            {authMode === "LOGIN" ? "Login" : "Register"}
          </button>
          <p
            onClick={() =>
              setAuthMode(authMode === "LOGIN" ? "REGISTER" : "LOGIN")
            }
            className="mode-switch-text"
          >
            switch to {authMode === "LOGIN" ? "register" : "login"}!
          </p>
        </form>
      </div>
    </div>
  );
};

export default Auth;
