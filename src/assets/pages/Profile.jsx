import React, { useRef } from 'react' // 1. Tambahkan useRef
import { Link } from "react-router-dom";
import {ChangeProfile} from '../hooks/ChangeProfile.jsx';
import Header from '../components/Dashboard/Header.jsx'
import Sidebar from '../components/Dashboard/Sidebar.jsx'
import Input from '../components/Dashboard/Input.jsx'

function Profile() {
    // 2. Inisialisasi Hook
    const { preview, error, handleFileChange, handleDelete } = ChangeProfile();
    const fileInputRef = useRef(null);

    return (
        <>
            <div className='flex flex-col min-h-screen bg-gray-50'>
                <Header />
                <div className='flex flex-1 overflow-hidden'>
                    <Sidebar />
                    <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-white">
                        <div className='max-w-6xl mx-auto'>

                            <div className="flex items-center gap-4 mb-8">
                                <img src="/icons/Profile/User-blue.svg" alt="Profile" className="w-6" />
                                <h2 className="text-xl font-bold text-gray-900">Profile</h2>
                            </div>

                            <section className="flex flex-col lg:flex-row gap-2 items-start">
                                <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-2 md:p-10">
                                    <div className="mb-6 ">
                                        <h3 className="font-semibold text-lg text-gray-900 mb-3 block">
                                            Profile Picture
                                        </h3>

                                        <div className="flex items-center gap-5">
                                            <div className="w-[100px] h-[100px] bg-gray-100 border rounded-xl flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={preview}
                                                    alt="avatar"
                                                    className={preview.includes('User.svg') ? "w-16" : "w-full h-full object-cover"}
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
                                                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md bg-blue-600 text-white hover:brightness-110"
                                                >
                                                    <img src="/icons/Profile/edit.svg" alt="ganti foto profile" className="w-6" />
                                                    Change Profile
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={handleDelete}
                                                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                                >
                                                    <img src="/icons/Profile/Delete.svg" alt="delete foto proile" className="w-6" />
                                                    Delete Profile
                                                </button>

                                                {/* 7. Tampilkan error jika validasi gagal */}
                                                {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
                                            </div>
                                        </div>

                                        <p className="text-xs text-gray-500 mt-2">
                                            The profile picture must be 2MB or less
                                        </p>
                                    </div>

                                    {/* Form Input lainnya tetap sama */}
                                    <div className='my-2'>
                                        <Input
                                            name="fullname"
                                            text="Full Name"
                                            path="/icons/Profile/user-input.svg"
                                            type="text"
                                            placeholder="Enter Full Name"
                                        />
                                    </div>
                                    <div className='my-2'>
                                        <Input
                                            name="phone"
                                            text="Phone"
                                            path="/icons/Profile/Phone.svg"
                                            type="text"
                                            placeholder="Enter Phone Number"
                                        />
                                    </div>
                                    <div className='my-2'>
                                        <Input
                                            name="email"
                                            text="Email"
                                            path="/icons/Profile/mail.svg"
                                            type="text"
                                            placeholder="Enter Email Address"
                                        />
                                    </div>

                                    <div className="my-6">
                                        <div className="mb-4">
                                            <label className="block font-semibold text-sm mb-1 text-gray-700">Password</label>
                                            <Link to="/profile/changepassword" className="text-blue-600 text-sm font-medium hover:underline">
                                                Change Password
                                            </Link>
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-sm mb-1 text-gray-700">Pin</label>
                                            <Link to="/profile/changepin" className="text-blue-600 text-sm font-medium hover:underline">
                                                Change Pin
                                            </Link>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:brightness-110 shadow-md transition-all"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </section>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Profile