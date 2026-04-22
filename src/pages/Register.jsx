import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Joi from 'joi'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { registerStart, registerSuccess, registerFailed } from '../redux/slice/registerSlice.js'

import '../Global.css'
import ButtonSubmit from '../components/Auth/ButtonSubmit.jsx'
import ButtonSignIn from '../components/Auth/ButtonSignIn.jsx'
import InputForm from '../components/Auth/InputForm.jsx'

function Register() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState('')
    const { users, isLoading } = useSelector((state) => state.register);
    const [FormData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const schema = Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required()
            .messages({
                'string.empty': 'Semua data wajib diisi!',
                'string.email': 'Format email tidak valid!',
                'any.required': 'Semua data wajib diisi!'
            }),
        password: Joi.string()
            .min(8)
            .required()
            .messages({
                'string.empty': 'Semua data wajib diisi!',
                'string.min': 'Password minimal harus 8 karakter!',
                'any.required': 'Semua data wajib diisi!'
            }),
        confirmPassword: Joi.any()
            .equal(Joi.ref('password'))
            .required()
            .messages({
                'any.only': 'Konfirmasi password tidak sesuai!',
                'any.required': 'Semua data wajib diisi!'
            })
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRegister = (e) => {
        e.preventDefault()
        dispatch(registerStart());

        const { error: validationError } = schema.validate(FormData);
        const isUserExist = users.find(
            (user) => user.email === FormData.email
        )

        if (validationError) {
            setError(validationError.details[0].message);
            dispatch(registerFailed(validationError.details[0].message));
            return;
        }
        if (isUserExist) {
            setError('Email sudah terdaftar!')
            dispatch(registerFailed('Email sudah terdaftar!'));
            return
        }

        dispatch(registerSuccess({
            username: FormData.email,
            email: FormData.email,
            password: FormData.password,
        }));

        toast.success(`Register Berhasil`);
        setTimeout(() => {
            navigate('/auth');
        }, 1000);
    }

    return (
        <div className='flex min-h-screen bg-primary '>
            <section className='flex flex-1 bg-white justify-center flex-col px-8 md:px-20 py-20 md:rounded-r-4xl gap-2'>
                <header className='flex items-center gap-2'>
                    <img src='/icons/logo.svg' alt='E-Wallet Logo' className='w-10 h-10' />
                    <span className='flex justify-center items-center font-bold font-nunito text-xl text-primary'>E-Wallet</span>
                </header>
                <div>
                    <h1 className='text-3xl font-semibold'>Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</h1>
                    <p className='text-lg my-1'>Transfering money is eassier than ever, you can access Zwallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</p>
                </div>
                <div className="w-full flex flex-row md:flex-col gap-2">
                    <ButtonSignIn
                        text="Sign In With Google"
                        path="/icons/google.svg"
                        alt="Google"
                        className="flex-1"
                    />
                    <ButtonSignIn
                        text="Sign In With Facebook"
                        path="/icons/facebook.svg"
                        alt="Facebook"
                        className="flex-1"
                    />
                </div>
                <div className='flex items-center gap-20 justify-center'>
                    <div className="flex-1 h-px bg-gray-400"></div>
                    <span className='text-gray-400'>Or</span>
                    <div className="flex-1 h-px bg-gray-400"></div>
                </div>
                <form className='flex flex-col gap-4' onSubmit={handleRegister}>
                    <div className='flex flex-col gap-1'>
                        <InputForm text="Email" type="email" placeholder="Enter your email" name="email" path="/icons/email.svg" onChange={handleChange} value={FormData.email} />
                        <InputForm text="Password" type="password" placeholder="Enter your password" name="password" path="/icons/Password.svg" onChange={handleChange} value={FormData.password} />
                        <InputForm text="Confirm Password" type="password" placeholder="Confirm your password" name="confirmPassword" path="/icons/Password.svg" onChange={handleChange} value={FormData.confirmPassword} />
                    </div>
                    <div className='w-full h-2'>
                        {error && (
                            <p className='w-full text-red-500 font-medium text-sm'>{error}</p>
                        )}
                    </div>
                    <ButtonSubmit label="Register" />
                </form>
                <p className='text-center text-gray-500 text-sm'>
                    <span>Have An Account? </span>
                    <Link to=".." className="text-blue-500 hover:underline">Login</Link>
                </p>
            </section>
            <section className='bg-primary hidden md:flex md:flex-1'>
                <img src='/icons/right-register.svg' alt='Google' />
            </section>
        </div>
    )
}

export default Register