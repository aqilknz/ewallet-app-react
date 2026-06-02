import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUserProfile } from "../redux/slice/loginUserSlice.js";
import toast from "react-hot-toast";
import Input from "../components/Dashboard/Input.jsx";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:9000/ewallet";

function Profile() {
  const dispatch = useDispatch();
  const { currentUser, isLoading } = useSelector((state) => state.auth);

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || currentUser?.full_name || "User",
    phone: currentUser?.phone || "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isPictureDeleted, setIsPictureDeleted] = useState(false);

  if (!currentUser) {
    return <div className="p-10 text-center text-gray-500">Memuat data profil...</div>;
  }

  const getCurrentProfileImage = () => {
    if (preview) return preview;

    const photo = currentUser?.photo || currentUser?.avatar;
    if (!photo || isPictureDeleted) return "/icons/Profile/User.svg";
    if (photo.startsWith("http")) return photo;

    let fileName = photo;
    if (fileName.includes("/")) {
      const parts = fileName.split("/");
      fileName = parts[parts.length - 1];
    }

    return `${API_BASE_URL}/img/profiles/${fileName}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Ukuran file maksimal 2MB!");
        return;
      }
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setIsPictureDeleted(false);
    }
  };

  const handleDeletePreview = () => {
    setSelectedFile(null);
    setPreview("/icons/Profile/User.svg");
    setIsPictureDeleted(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    const dataToSubmit = new FormData();
    dataToSubmit.append("fullname", formData.fullName);
    dataToSubmit.append("phone", formData.phone);

    if (selectedFile) {
      dataToSubmit.append("picture", selectedFile);
    } else if (isPictureDeleted) {
      dataToSubmit.append("delete_picture", "true");
    }

    const loadingToast = toast.loading("Menyimpan profil...");

    dispatch(editUserProfile(dataToSubmit))
      .unwrap()
      .then(() => {
        toast.success("Profil berhasil diperbarui!", { id: loadingToast });
        setSelectedFile(null);
        setPreview(null);
        setIsPictureDeleted(false);
      })
      .catch((err) => {
        toast.error(err || "Gagal memperbarui profil", { id: loadingToast });
      });
  };

  return (
    <>
      <div className="mb-8 flex items-center gap-4">
        <img src="/icons/Profile/User-blue.svg" alt="Profile" className="w-6" />
        <h2 className="text-xl font-bold text-gray-900">Profile</h2>
      </div>

      <section className="flex flex-col items-start gap-2 lg:flex-row">
        <form
          key={currentUser?.id || currentUser?.email}
          onSubmit={handleUpdateProfile}
          className="flex w-full flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-10"
        >
          <div className="mb-6">
            <h3 className="mb-3 block text-lg font-semibold text-gray-900">
              Profile Picture
            </h3>

            <div className="flex items-center gap-5">
              <div className="flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-50">
                <img
                  src={getCurrentProfileImage()}
                  alt="avatar"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src = "/icons/Profile/User.svg";
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".jpg, .jpeg, .png"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
                >
                  <img
                    src="/icons/Profile/edit.svg"
                    alt="ganti foto profile"
                    className="w-5"
                  />
                  Change Profile
                </button>

                <button
                  type="button"
                  onClick={handleDeletePreview}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 rounded-md border border-red-500 px-4 py-2 text-sm font-semibold text-red-500 transition-all hover:bg-red-50 disabled:opacity-50"
                >
                  <img
                    src="/icons/Profile/Delete.svg"
                    alt="delete foto proile"
                    className="w-5"
                  />
                  Delete Profile
                </button>
              </div>
            </div>

            <p className="mt-2 text-xs text-gray-500">
              Format didukung: JPG, JPEG, PNG. Maksimal 2MB.
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
                Transaction PIN
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
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-md transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </form>
      </section>
    </>
  );
}

export default Profile;