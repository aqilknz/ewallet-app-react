import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPassword } from "../redux/slice/authUserSlice";
import toast from "react-hot-toast";
import InputForm from "../components/Auth/InputForm";
import ButtonSubmit from "../components/Auth/ButtonSubmit";
import { Navigate, useNavigate } from "react-router";

function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { isLoading } = useSelector((state) => state.loginUser || state.auth);

  const [formData, setFormData] = useState({
    existingPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();

    const { existingPassword, newPassword, confirmPassword } = formData;

    if (!existingPassword || !newPassword || !confirmPassword) {
      return setError("All fields are required");
    }

    if (newPassword !== confirmPassword) {
      return setError("Confirm password does not match");
    }

    if (newPassword.length < 8) {
      return setError("New password must be at least 8 characters");
    }

    const payload = {
      old_password: existingPassword,
      new_password: newPassword,
    };

    const loadingToast = toast.loading("Updating password...");

    dispatch(updateUserPassword(payload))
      .unwrap()
      .then(() => {
        toast.success("Password changed successfully!", { id: loadingToast });
        setFormData({
          existingPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      })
      .catch((err) => {
        toast.error(err || "Failed to change password", { id: loadingToast });
        setError(err || "Failed to change password");
      });
  };

  return (
    <>
      <div className="mb-6 flex items-center gap-3">
        <img src="/icons/Profile/User-blue.svg" alt="Profile" className="w-5" />
        <h2 className="text-lg font-semibold">Profile</h2>
      </div>
      <button
        onClick={() => navigate("/profile")}
        className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-primary hover:text-white"
      >
        &larr; Back to Profile
      </button>

      <section className="w-full rounded-lg border border-gray-300 p-6">
        <h3 className="mb-3 block text-lg font-semibold text-gray-900">
          Change Password
        </h3>
        <form className="flex flex-col gap-4" onSubmit={handleChangePassword}>
          <div className="flex flex-col gap-4">
            <InputForm
              text="Existing Password"
              type="password"
              placeholder="Enter your existing password"
              name="existingPassword"
              value={formData.existingPassword}
              onChange={handleInputChange}
              path="/icons/Password.svg"
              disabled={isLoading}
            />
            <InputForm
              text="New Password"
              type="password"
              placeholder="Enter your new password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              path="/icons/Password.svg"
              disabled={isLoading}
            />
            <InputForm
              text="Confirm New Password"
              type="password"
              placeholder="Re-Type your new password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              path="/icons/Password.svg"
              disabled={isLoading}
            />
          </div>
          <div className="h-2 w-full">
            {error && (
              <p className="w-full text-sm font-medium text-red-500">{error}</p>
            )}
          </div>
          <ButtonSubmit label="Submit" />
        </form>
      </section>
    </>
  );
}

export default ChangePassword;
