import React, { useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePinToUser } from '../redux/slice/registerSlice';
import { loginSuccess } from '../redux/slice/authSlice';
import { usePinLogic } from '../hooks/usePinLogic';
import toast from "react-hot-toast";

import ButtonSubmit from '../components/Auth/ButtonSubmit';

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
        <main className='bg-primary min-w-full min-h-screen flex items-center justify-center'>
            <article className='bg-white rounded-xl min-w-full md:min-w-1/2 min-h-full flex flex-col place-self-center px-10 py-15 gap-5 shadow-2xl'>

                <header className='flex items-center gap-2'>
                    <img src='/icons/logo.svg' alt='E-Wallet Logo' className='w-10 h-10' />
                    <span className='flex justify-center items-center font-bold font-nunito text-xl text-primary'>E-Wallet</span>
                </header>

                <div className='flex flex-col gap-5'>
                    <h1 className='text-3xl font-semibold text-gray-800'>
                        {pendingTransaction ? "Confirm Transaction PIN 👋" : "Enter Your Pin👋"}
                    </h1>
                    <p className='text-lg my-1 text-gray-500'>
                        {pendingTransaction ? "Please enter your PIN to complete the payment." : "Please save your pin because this is so important."}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-4">
                    <div className="flex gap-2 md:gap-4 justify-center">
                        {pin.map((digit, i) => (
                            <input
                                key={i}
                                ref={(el) => (inputRefs.current[i] = el)}
                                type="password"
                                inputMode="numeric"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(e.target.value, i)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                className="w-10 h-12 md:w-14 md:h-16 border-b-2 border-gray-300 focus:border-primary 
                                         focus:outline-none text-2xl font-bold text-center transition-all bg-transparent"
                            />
                        ))}
                    </div>

                    <ButtonSubmit label={pendingTransaction ? 'Confirm Payment' : 'Submit'} />
                </form>

                <p className='text-center text-gray-500 text-sm'>
                    <span>Forgot Your Pin? </span>
                    <Link to=".." className="text-blue-500 hover:underline font-semibold">Reset</Link>
                </p>
            </article>
        </main>
    );
}

export default EnterPin;