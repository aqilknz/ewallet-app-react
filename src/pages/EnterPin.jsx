import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPin } from "../redux/slice/authUserSlice";
import { usePinLogic } from "../hooks/usePinLogic";
import toast from "react-hot-toast";

import ButtonSubmit from "../components/Auth/ButtonSubmit";
import PinInput from "../components/Auth/PinInput";

function EnterPin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, token, isLoading, hasPin } = useSelector((state) => state.auth);

  const { pin, inputRefs, handleChange, handleKeyDown, pinString } =
    usePinLogic(6);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      navigate("/auth");
    }
  }, [isAuthenticated, token, navigate]);
  useEffect(() => {
    if (hasPin) {
      toast.success("PIN Berhasil disetel!");
      setTimeout(() => navigate("/dashboard"), 1000);
    }
  }, [hasPin, navigate]);
  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    if (pinString.length < 6) {
      return toast.error("Silakan isi PIN 6 digit secara lengkap");
    }

    // Tembak API createPin ke Golang
    dispatch(createPin(pinString))
      .unwrap()
      .catch((err) => {
        toast.error(err || "Gagal menyetel PIN");
      });
    };

  // const handleSubmit = (e) => {
  //   if (e) e.preventDefault();

  //   if (pinString.length < 6) {
  //     return toast.error("Silakan isi PIN 6 digit secara lengkap");
  //   }

  //   const userKey = currentUser.username || currentUser.email;
  //   dispatch(savePinToUser({ username: userKey, pin: pinString }));
  //   dispatch(loginSuccess({ ...currentUser, pin: pinString }));

  //   toast.success("PIN Berhasil disetel!");
  //   setTimeout(() => navigate("/dashboard"), 1000);
  // };

  return (
    <main className="md:bg-primary flex min-h-screen">
      <section className="flex flex-1 flex-col justify-center gap-2 bg-white px-20 py-8 md:rounded-r-4xl">
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

        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-semibold text-gray-800">
            Enter Your Pin👋
          </h1>
          <p className="my-1 text-lg text-gray-500">
            Please save your pin because this is so important
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-8">
          <PinInput
            pin={pin}
            inputRefs={inputRefs}
            handleChange={handleChange}
            handleKeyDown={handleKeyDown}
          />

          <ButtonSubmit
            label={isLoading ? "Processing..." : "Submit"}
            disabled={isLoading}
          />
        </form>

        <p className="text-center text-sm text-gray-500">
          <span>Forgot Your Pin? </span>
          <Link to=".." className="font-semibold text-blue-500 hover:underline">
            Reset
          </Link>
        </p>
      </section>

      <section className="hidden px-20 md:flex md:flex-1">
        <img
          src="/icons/right-enterpin.svg"
          alt="ilustration pin"
          className="flex h-screen items-end justify-center"
        />
      </section>
    </main>
  );
}

export default EnterPin;
