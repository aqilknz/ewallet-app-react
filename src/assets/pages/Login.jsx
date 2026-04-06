
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../Global.css'
import ButtonSubmit from '../components/Auth/ButtonSubmit.jsx'
import ButtonSignIn from '../components/Auth/ButtonSignIn.jsx'
import InputForm from '../components/Auth/InputForm.jsx'

function Login() {
    const navigate = useNavigate()
    const [error, setError] =useState('')
    const [FormData, setFormData] =useState({
        email:'',
        password:''
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
        if (error) setError('')
    }
    const handleLogin = (e) => {
        e.preventDefault()
        const user = JSON.parse(localStorage.getItem('userAccount'))
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!FormData.email || !FormData.password) {
            setError('Email dan Password wajib diisi!');
            return;
        }
        if (!emailRegex.test(FormData.email)) {
            setError('Format email tidak valid!');
            return;
        }
        if (FormData.password.length < 8) {
            setError('Password minimal harus 8 karakter!');
            return;
        }
        if(!user){
            setError('Akun tidak ditemukan, silahkan Register terlebih dahulu!')
            return
        }
        if(FormData.email === user.email && FormData.password === user.password) {
            alert("Login Berhasil!");
            navigate('/dashboard');
        } else{
            setError('Email dan Password salah!')
        }
    }

    return (
        <div className='flex min-h-screen md:bg-primary '>
            <section className='flex flex-1 bg-white justify-center flex-col px-20 py-8 md:rounded-r-4xl gap-2'>
                <header className='flex justify-centeritems-center gap-2'>
                    <img src='/icons/logo.svg' alt='E-Wallet Logo' className='w-10 h-10' />
                    <span className='flex justify-center items-center font-bold font-nunito text-xl text-primary'>E-Wallet</span>
                </header>
                <div>
                    <h1 className='text-4xl font-semibold'>Hello Welcome Back 👋</h1>
                    <p className='text-lg my-2'>Fill out the form correctly or you can login with several options.</p>
                </div>
                <div>
                    <ButtonSignIn text="Sign In With Google" path="/icons/google.svg" alt="Google" />
                    <ButtonSignIn text="Sign In With Facebook" path="/icons/facebook.svg" alt="Facebook" />
                </div>
                <div className='flex items-center gap-20 justify-center'>
                    <div className="flex-1 h-px bg-gray-400"></div>
                    <span className='text-gray-400'>Or</span>
                    <div className="flex-1 h-px bg-gray-400"></div>
                </div>
                <form onSubmit={handleLogin} className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <InputForm text="Email" type="email" placeholder="Enter your email" name="email" path="/icons/email.svg" onChange={handleChange} value={FormData.email} />
                        <InputForm text="Password" type="password" placeholder="Enter your password" name="password" path="/icons/Password.svg" onChange={handleChange} value={FormData.password} />
                    </div>
                    <div className='w-full h-2'>
                        {error && (
                            <p className='w-full text-red-500 font-medium text-sm'>{error}</p>
                        )}
                    </div>
                    <ButtonSubmit label="Login" />
                </form>
                <p className='text-center text-gray-500 text-sm'>
                    <span>Not Have An Account? </span>
                    <a href="/register" className='text-blue-500 hover:underline'>Register</a>
                </p>
            </section>
            <section className='hidden md:flex md:flex-1'>
                <img src='/icons/right-login.svg' alt='Google' />
            </section>
        </div>
    )
}

export default Login