import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useChangeProfile } from "../hooks/useChangeProfile.jsx";
import { updateUserProfile } from "../redux/slice/registerSlice.js";
import { loginSuccess } from "../redux/slice/authSlice.js";
import toast from "react-hot-toast";
import Input from "../components/Dashboard/Input.jsx";

function Profile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const { preview, error, handleFileChange, handleDelete } = useChangeProfile();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || "",
    phone: currentUser?.phone || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    const isImageDeleted = preview === "/icons/Profile/User.svg";
    const finalAvatar = isImageDeleted ? "" : preview || currentUser.avatar;

    const updatedData = {
      username: currentUser.email,
      fullName: formData.fullName,
      phone: formData.phone,
      avatar: preview || currentUser.avatar,
    };

    dispatch(updateUserProfile(updatedData));
    dispatch(
      loginSuccess({
        ...currentUser,
        ...updatedData,
      }),
    );

    toast.success("Profile updated successfully!");

    // setFormData({
    //     username: currentUser.email,
    //     fullName: updatedData.fullName,
    //     phone: updatedData.phone,
    //     email: currentUser.email
    // });
  };
  // const handledelete = () => {
  //     handleDelete();

  //     dispatch(loginSuccess({
  //         ...currentUser,
  //         avatar: ""
  //     }));

  //     dispatch(loginSuccess(resetData));
  //     toast.success("Profile picture removed");
  // };
  return (
    <>
      <div className="mb-8 flex items-center gap-4">
        <img src="/icons/Profile/User-blue.svg" alt="Profile" className="w-6" />
        <h2 className="text-xl font-bold text-gray-900">Profile</h2>
      </div>

      <section className="flex flex-col items-start gap-2 lg:flex-row">
        <form
          onSubmit={handleUpdateProfile}
          className="flex w-full flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-10"
        >
          <div className="mb-6">
            <h3 className="mb-3 block text-lg font-semibold text-gray-900">
              Profile Picture
            </h3>

            <div className="flex items-center gap-5">
              <div className="flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-xl border bg-gray-100">
                <img
                  src={preview || currentUser?.avatar}
                  alt="avatar"
                  className={
                    !preview && !currentUser?.avatar
                      ? "w-16"
                      : "h-full w-full object-cover"
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
                >
                  <img
                    src="/icons/Profile/edit.svg"
                    alt="ganti foto profile"
                    className="w-6"
                  />
                  Change Profile
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex items-center gap-2 rounded-md border border-red-500 px-4 py-2 text-sm font-semibold text-red-500 transition-all hover:bg-red-500 hover:text-white"
                >
                  <img
                    src="/icons/Profile/Delete.svg"
                    alt="delete foto proile"
                    className="w-6"
                  />
                  Delete Profile
                </button>

                {error && (
                  <p className="text-xs font-medium text-red-500">{error}</p>
                )}
              </div>
            </div>

            <p className="mt-2 text-xs text-gray-500">
              The profile picture must be 2MB or less
            </p>
          </div>

          <div className="my-2">
            <Input
              name="fullName"
              text="Full Name"
              path="/icons/Profile/user-input.svg"
              type="text"
              placeholder="Enter Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-2">
            <Input
              name="phone"
              text="Phone"
              path="/icons/Profile/Phone.svg"
              type="text"
              placeholder="Enter Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-2">
            <Input
              name="email"
              text="Email"
              path="/icons/Profile/mail.svg"
              type="text"
              placeholder="Enter Email Address"
              value={currentUser?.email || ""}
              disabled={true}
              readOnly={true}
            />
          </div>

          <div className="my-6">
            <div className="mb-4">
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Password
              </label>
              <Link
                to="/profile/changepassword"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Change Password
              </Link>
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Pin
              </label>
              <Link
                to="/profile/changepin"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Change Pin
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-md transition-all hover:brightness-110"
          >
            Submit
          </button>
        </form>
      </section>
    </>
  );
}

export default Profile;
