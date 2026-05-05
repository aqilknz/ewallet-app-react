import React, { useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePinToUser } from '../redux/slice/registerSlice';
import { loginSuccess } from '../redux/slice/authSlice';
import { usePinLogic } from '../hooks/usePinLogic';
import toast from "react-hot-toast";

import ButtonSubmit from '../components/Auth/ButtonSubmit';
import PinInput from '../components/Auth/PinInput';

function EnterPin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.auth);
    const { pendingTransaction } = useSelector((state) => state.transaction);

    const { pin, inputRefs, handleChange, handleKeyDown, pinString } = usePinLogic(6);

    useEffect(() => {
        if (!currentUser) navigate("/auth");
    }, [currentUser, navigate]);

    const handleSubmit = (e) => {
        if (e) e.preventDefault();

        if (pinString.length < 6) {
            return toast.error("Silakan isi PIN 6 digit secara lengkap");
        }

        const userKey = currentUser.username || currentUser.email;
        dispatch(savePinToUser({ username: userKey, pin: pinString }));
        dispatch(loginSuccess({ ...currentUser, pin: pinString }));

        toast.success("PIN Berhasil disetel!");
        setTimeout(() => navigate("/dashboard"), 1000);
    };

    return (
        <main className='flex min-h-screen md:bg-primary '>
            <section className='flex flex-1 bg-white justify-center flex-col px-20 py-8 md:rounded-r-4xl gap-2'>

                <header className='flex items-center gap-2'>
                    <img src='/icons/logo.svg' alt='E-Wallet Logo' className='w-10 h-10 ' />
                    <span className='flex justify-center items-center font-bold font-nunito text-xl text-primary'>E-Wallet</span>
                </header>

                <div className='flex flex-col gap-5'>
                    <h1 className='text-3xl font-semibold text-gray-800'>
                        Enter Your Pin👋
                    </h1>
                    <p className='text-lg my-1 text-gray-500'>
                        Please save your pin because this is so important
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-4">
                    <PinInput 
                        pin={pin} 
                        inputRefs={inputRefs} 
                        handleChange={handleChange} 
                        handleKeyDown={handleKeyDown} 
                    />

                    <ButtonSubmit label={pendingTransaction ? 'Confirm Payment' : 'Submit'} />
                </form>

                <p className='text-center text-gray-500 text-sm'>
                    <span>Forgot Your Pin? </span>
                    <Link to=".." className="text-blue-500 hover:underline font-semibold">Reset</Link>
                </p>
            </section>
            
            <section className='hidden md:flex md:flex-1 px-20'>
                <img src='/icons/right-enterpin.svg' alt='ilustration pin' className='h-screen flex justify-center items-end'/>
            </section>
        </main>
    );
}

export default EnterPin;