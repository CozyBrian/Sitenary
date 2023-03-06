import axios, { AxiosError } from "axios";
import cn from "classnames";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { action } from "../../redux";
import { BACKEND_URL } from "../../utils/constants";
import "./styles.scss";

interface FormInput {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone: string;
}

const Auth = () => {
  const { isAuthenticated } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const [authMode, setAuthMode] = useState<"LOGIN" | "REGISTER">("LOGIN");
  const [isRequestSent, setIsRequestSent] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormInput>();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    setIsRequestSent(true);
    axios
      .post(
        `${BACKEND_URL}${
          authMode === "REGISTER" ? "/v1/auth/signup" : "/v1/auth/login"
        }`,
        {
          ...data,
        }
      )
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("accessToken", res.data.accessToken);
        dispatch(action.app.setIsAuthenticated(true));
        window.location.reload();
      })
      .catch((err: AxiosError) => {
        const { error } = err.response?.data as { error: string };
        console.log(error);
        if (error) {
          switch (error) {
            case "User not found":
              setError("email", {
                type: "manual",
                message: "Invalid email or password",
              });
              setError("password", {
                type: "manual",
                message: "Invalid email or password",
              });
              break;
            case "WRONG_PASSWORD":
              setError("password", {
                type: "manual",
                message: "wrong password",
              });
              break;

            default:
              break;
          }

          if (authMode === "REGISTER") {
            if (error === "Email already exists") {
              setError("email", {
                type: "manual",
                message: "Email already exists",
              });
            } else if (error === "Username already exists") {
              setError("username", {
                type: "manual",
                message: "Username already exists",
              });
            }
          }
        }
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
            <div className="error-box">
              <label htmlFor="email">Email</label>
              <p>{errors.email?.message}</p>
            </div>
            <input
              type="email"
              {...register("email", {
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              })}
              className={cn({
                error: errors.email,
              })}
            />
          </div>
          <div className="input-container">
            <div className="div error-box">
              <label htmlFor="password">Password</label>
              <p>{errors.password?.message}</p>
            </div>
            <input
              {...register("password", { required: true })}
              type="password"
              className={cn({
                error: errors.password,
              })}
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
                <input {...register("phone", { required: true })} type="text" />
              </div>
            </>
          )}
          <button type="submit" className="submit-button">
            {isRequestSent ? (
              <Oval
                color="#737373"
                secondaryColor="#D7D7D7"
                width={18}
                height={18}
                strokeWidth={4}
              />
            ) : authMode === "LOGIN" ? (
              "Login"
            ) : (
              "Register"
            )}
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
