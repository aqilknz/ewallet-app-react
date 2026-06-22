import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { 
  forgotPasswordAPI, 
  verifyOtpAPI, 
  resetPasswordAPI 
} from "../services/apiServices";
import InputForm from "../components/Auth/InputForm";
import ButtonSubmit from "../components/Auth/ButtonSubmit";
import "../Global.css";

function ForgotPassword() {
  const navigate = useNavigate();
  
  // State(1: Email, 2: OTP, 3: Reset Password)
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Handler unutk kirim Email OTP
  const handleSendOTP = async (e) => {
    e?.preventDefault();
    if (!email) return setErrorMessage("Email wajib diisi!");
    
    setIsLoading(true);
    setErrorMessage("");
    try {
      await forgotPasswordAPI({ email });
      toast.success("Kode OTP berhasil dikirim ke email!");
      setStep(2);
      setCountdown(60);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handler untuk verifikasi OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) return setErrorMessage("OTP harus 6 digit angka!");

    setIsLoading(true);
    setErrorMessage("");
    try {
      await verifyOtpAPI({ email, otp });
      toast.success("OTP Valid! Silakan buat password baru.");
      setStep(3);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handler untuk Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 8) return setErrorMessage("Password minimal 8 karakter!");
    if (newPassword !== confirmPassword) return setErrorMessage("Konfirmasi password tidak cocok!");

    setIsLoading(true);
    setErrorMessage("");
    try {
      await resetPasswordAPI({ 
        email, 
        new_password: newPassword, 
        confirm_password: confirmPassword 
      });
      toast.success("Password berhasil diubah! Silakan login.");
      navigate("/auth");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-primary flex min-h-screen">
      <section className="flex flex-1 flex-col justify-center gap-2 bg-white px-8 py-8 md:rounded-r-4xl md:px-20">
        <header className="flex items-center gap-2 mb-8">
          <img src="/icons/logo.svg" alt="E-Wallet Logo" className="h-10 w-10" />
          <span className="font-nunito text-primary text-xl font-bold">E-Wallet</span>
        </header>

        {step === 1 && (
          <>
            <div>
              <h1 className="text-3xl font-semibold mb-2">Forgot Password</h1>
              <p className="text-gray-500 mb-8">
                Enter your registered email address and we will send you a 6-digit OTP code to reset your password.
              </p>
            </div>
            <form onSubmit={handleSendOTP} className="flex flex-col gap-4">
              <InputForm
                text="Email"
                type="email"
                placeholder="Enter your email"
                name="email"
                path="/icons/email.svg"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMessage("");
                }}
              />
              <div className="h-4">{errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}</div>
              <ButtonSubmit label={isLoading ? "Sending..." : "Send OTP"} disabled={isLoading} />
            </form>
          </>
        )}


        {step === 2 && (
          <>
            <div>
              <h1 className="text-3xl font-semibold mb-2">Verification Code</h1>
              <p className="text-gray-500 mb-8">
                We have sent a verification code to <span className="font-bold text-black">{email}</span>. Please enter it below.
              </p>
            </div>
            <form onSubmit={handleVerifyOTP} className="flex flex-col gap-4">
              <InputForm
                text="OTP Code"
                type="text"
                placeholder="Enter 6-digit OTP"
                name="otp"
                path="/icons/Lock.png"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  setErrorMessage("");
                }}
                maxLength="6"
              />
              <div className="h-4">{errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}</div>
              <ButtonSubmit label={isLoading ? "Verifying..." : "Verify OTP"} disabled={isLoading} />
            </form>
            <div className="mt-4 text-center">
              {countdown > 0 ? (
                <p className="text-gray-500">Resend OTP in <span className="font-bold text-primary">{countdown}s</span></p>
              ) : (
                <button onClick={handleSendOTP} disabled={isLoading} className="text-blue-500 hover:underline cursor-pointer font-semibold">
                  Resend OTP
                </button>
              )}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <h1 className="text-3xl font-semibold mb-2">Create New Password</h1>
              <p className="text-gray-500 mb-8">
                Your new password must be different from previous used passwords and at least 8 characters long.
              </p>
            </div>
            <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
              <InputForm
                text="New Password"
                type="password"
                placeholder="Enter new password"
                name="newPassword"
                path="/icons/Password.svg"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setErrorMessage("");
                }}
              />
              <InputForm
                text="Confirm Password"
                type="password"
                placeholder="Confirm new password"
                name="confirmPassword"
                path="/icons/Password.svg"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrorMessage("");
                }}
              />
              <div className="h-4">{errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}</div>
              <ButtonSubmit label={isLoading ? "Resetting..." : "Reset Password"} disabled={isLoading} />
            </form>
          </>
        )}

        <p className="text-center text-sm text-gray-500 mt-8">
          <span>Remembered your password? </span>
          <Link to="/auth" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </section>

      <section className="bg-primary hidden md:flex md:flex-1">
        <img src="/icons/right-register.svg" alt="Auth Banner" className="w-full h-full object-cover" />
      </section>
    </div>
  );
}

export default ForgotPassword;