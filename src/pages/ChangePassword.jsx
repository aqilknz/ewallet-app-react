import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUserPassword } from "../redux/slice/registerSlice";
import { loginSuccess } from "../redux/slice/authSlice";
import toast from "react-hot-toast";
import Header from "../components/Dashboard/Header";
import Sidebar from "../components/Dashboard/Sidebar";
import InputForm from "../components/Auth/InputForm";
import ButtonSubmit from "../components/Auth/ButtonSubmit";

function ChangePassword() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

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

    if (existingPassword !== currentUser.password) {
      return setError("Existing password does not match");
    }

    if (newPassword !== confirmPassword) {
      return setError("Confirm password does not match");
    }

    const userKey = currentUser.email || currentUser.username;

    dispatch(
      changeUserPassword({
        username: userKey,
        newPassword: newPassword,
      }),
    );

    dispatch(
      loginSuccess({
        ...currentUser,
        password: newPassword,
      }),
    );

    toast.success("Password changed successfully!");

    setFormData({
      existingPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <div className="mb-6 flex items-center gap-3">
        <img src="/icons/Profile/User-blue.svg" alt="Profile" className="w-5" />
        <h2 className="text-lg font-semibold">Profile</h2>
      </div>

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
            />
            <InputForm
              text="New Password"
              type="password"
              placeholder="Enter your new password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              path="/icons/Password.svg"
            />
            <InputForm
              text="Confirm New Password"
              type="password"
              placeholder="Re-Type your new password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              path="/icons/Password.svg"
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
