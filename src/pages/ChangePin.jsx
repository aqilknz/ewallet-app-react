import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savePinToUser } from '../redux/slice/registerSlice'
import { usePinLogic } from '../hooks/usePinLogic'
import { loginSuccess } from '../redux/slice/authSlice'
import toast from 'react-hot-toast'
import Header from '../components/Dashboard/Header'
import Sidebar from '../components/Dashboard/Sidebar'
import ButtonSubmit from '../components/Auth/ButtonSubmit'
import PinInput from '../components/Auth/PinInput'

function ChangePin() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.auth);
    const { pin, inputRefs, handleChange, handleKeyDown, pinString, resetPin } = usePinLogic(6);

    const handlePinComplete = (pin) => {
        setFinalPin(pin);
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();

        if (pinString.length < 6) {
            return toast.error("Please enter a 6-digit PIN");
        }

        const userKey = currentUser.email || currentUser.username;

        dispatch(savePinToUser({
            username: userKey,
            pin: pinString
        }));

        dispatch(loginSuccess({
            ...currentUser,
            pin: pinString
        }));

        toast.success("PIN changed successfully!");
        resetPin()
    };

    return (
        <>
            <div className="flex items-center gap-3 mb-6">
                <img src="/icons/Profile/User-blue.svg" alt="Profile" className="w-5" />
                <h2 className="text-lg font-semibold">Profile</h2>
            </div>

            <section className="border border-gray-300 rounded-lg p-6 w-full">
                <h3 className='font-semibold text-lg text-gray-900 mb-3 block text-center'>
                    Change Pin 👋
                </h3>
                <p className='text-center text-gray-500 mb-6'>
                    Please save your pin because this so important.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <PinInput pin={pin}
                        inputRefs={inputRefs}
                        handleChange={handleChange}
                        handleKeyDown={handleKeyDown} />
                    <ButtonSubmit label='Submit' />
                </form>

            </section>
        </>
    )
}

export default ChangePin