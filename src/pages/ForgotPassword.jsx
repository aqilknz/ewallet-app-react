import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { changeUserPassword } from '../redux/slice/registerSlice' 
import InputForm from '../components/Auth/InputForm'
import ButtonSubmit from '../components/Auth/ButtonSubmit'

function ForgotPassword() {
    const [step, setStep] = useState(1);
    
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { users } = useSelector((state) => state.register);

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        
        if (!email) return toast.error("Email wajib diisi!");

        const isExist = users.some(u => u.email === email);
        if (!isExist) return toast.error("Email tidak ditemukan!");

        setStep(2);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();

        if (!newPassword || !confirmPassword) {
            return toast.error("Isi semua form password!");
        }

        if (newPassword !== confirmPassword) {
            return toast.error("Password tidak cocok!");
        }

        dispatch(changeUserPassword({
            username: email,
            newPassword: newPassword
        }));

        toast.success("Password berhasil diubah!");
        setTimeout(() => navigate('/auth'), 1000); 
    };

    return (
        <main className='bg-primary min-w-full min-h-screen flex items-center justify-center'>
            <article className='bg-white rounded-xl min-w-1/2 min-h-full flex flex-col place-self-center px-10 py-15 gap-5'>
                <header className='flex items-center gap-2'>
                    <img src='/icons/logo.svg' alt='E-Wallet Logo' className='w-10 h-10' />
                    <span className='flex justify-center items-center font-bold font-nunito text-xl text-primary'>E-Wallet</span>
                </header>

                {step === 1 ? (
                    <form onSubmit={handleEmailSubmit} className='flex flex-col gap-5'>
                        <div className='flex flex-col gap-5'>
                            <h1 className='text-3xl font-semibold'>Fill Out Form Correctly 👋</h1>
                            <p className='text-lg my-1'>We will send new password to your email</p>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <InputForm 
                                text="Email" 
                                type="email" 
                                placeholder="Enter your email" 
                                name="email" 
                                path="/icons/email.svg" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <ButtonSubmit label='Submit'/>
                    </form>
                ) : (
                    <form onSubmit={handlePasswordSubmit} className='flex flex-col gap-5'>
                        <div className='flex flex-col gap-5'>
                            <h1 className='text-3xl font-semibold'>Create New Password</h1>
                            <p className='text-lg my-1'>Please enter your new password below</p>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <InputForm 
                                text="New Password" 
                                type="password" 
                                placeholder="Enter new password" 
                                name="newPassword" 
                                path="/icons/Password.svg" 
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <div className='mt-3'></div>
                            <InputForm 
                                text="Confirm Password" 
                                type="password" 
                                placeholder="Confirm new password" 
                                name="confirmPassword" 
                                path="/icons/Password.svg" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <ButtonSubmit label='Submit'/>
                    </form>
                )}
            </article>
        </main>
    )
}

export default ForgotPassword