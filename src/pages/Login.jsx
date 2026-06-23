import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, clearError } from "../redux/slice/authUserSlice.js";
import Joi from "joi";
import toast from "react-hot-toast";
import "../Global.css";
import ButtonSubmit from "../components/Auth/ButtonSubmit.jsx";
import ButtonSignIn from "../components/Auth/ButtonSignIn.jsx";
import InputForm from "../components/Auth/InputForm.jsx";

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email dan Password wajib diisi!",
      "string.email": "Format email tidak valid!",
      "any.required": "Email dan Password wajib diisi!",
    }),
  password: Joi.string().min(8).required().messages({
    "string.empty": "Email dan Password wajib diisi!",
    "string.min": "Password minimal harus 8 karakter!",
    "any.required": "Email dan Password wajib diisi!",
  }),
});

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated, error: reduxError, hasPin } = useSelector(
    (state) => state.auth
  );

  const [localValidationError, setLocalValidationError] = useState("");
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (isAuthenticated) {
      if (!hasPin) {
        toast.success("Login berhasil, silakan buat PIN keamanan Anda");
        navigate("/auth/enterpin");
      } else {
        toast.success("Selamat Datang Kembali!");
        navigate("/dashboard");
      }
    }
  }, [isAuthenticated, hasPin, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setLocalValidationError("");
  };
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();
    const { error: validationError } = schema.validate(FormData);

    if (validationError) {
      setLocalValidationError(validationError.details[0].message);
      return;
    }
    dispatch(
      loginUser({
        email: FormData.email,
        password: FormData.password,
      })
    );

  };
  const displayError = localValidationError || reduxError;

  return (
    <div className="md:bg-primary flex min-h-screen">
      <section className="flex flex-1 flex-col justify-center gap-2 bg-white px-8 py-8 md:rounded-r-4xl md:px-20">
        <header className="flex items-center gap-2">
          <img
            src="/icons/logo.svg"
            alt="E-Wallet Logo"
            className="h-10 w-10"
          />
          <span className="font-nunito text-primary flex items-center justify-center text-xl font-bold">
            E-Wallet
          </span>
        </header>
        <div>
          <h1 className="text-4xl font-semibold">Hello Welcome Back 👋</h1>
          <p className="my-2 text-lg text-gray-600">
            Fill out the form correctly or you can login with several options.
          </p>
        </div>
        <div className="flex w-full flex-row gap-2 md:flex-col">
          <ButtonSignIn
            text="Sign In With Google"
            path="/icons/google.svg"
            alt="Google"
            className="flex-1"
          />
          <ButtonSignIn
            text="Sign In With Facebook"
            path="/icons/facebook.svg"
            alt="Facebook"
            className="flex-1"
          />
        </div>
        <div className="flex items-center justify-center gap-20">
          <div className="h-px flex-1 bg-gray-400"></div>
          <span className="text-gray-400">Or</span>
          <div className="h-px flex-1 bg-gray-400"></div>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <InputForm
              text="Email"
              type="email"
              placeholder="Enter your email"
              name="email"
              path="/icons/email.svg"
              onChange={handleChange}
              value={FormData.email}
              disabled={isLoading}
            />
            <InputForm
              text="Password"
              type="password"
              placeholder="Enter your password"
              name="password"
              path="/icons/Password.svg"
              onChange={handleChange}
              value={FormData.password}
              disabled={isLoading}
            />
          </div>
          <div className="h-2 w-full">
            {displayError && (
              <p className="w-full text-sm font-medium text-red-500">{displayError}</p>
            )}
          </div>
          <ButtonSubmit label="Login" />
        </form>
        <p className="text-right text-sm text-gray-500">
          <Link
            to="forgotpassword"
            title="Forgot Password"
            className="hover:text-primary text-black hover:underline"
          >
            Forgot Password?
          </Link>
        </p>
        <p className="text-center text-sm text-gray-500">
          <span>Not Have An Account? </span>
          <Link to="register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </section>
      <section className="hidden md:flex md:flex-1">
        <img src="/icons/right-login.svg" alt="Illustration" />
      </section>
    </div>
  );
}

export default Login;
