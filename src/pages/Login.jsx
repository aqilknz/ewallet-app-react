import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loginSuccess } from '../redux/slice/authSlice.js'
import Joi from 'joi'
import toast from 'react-hot-toast';
import '../Global.css'
import ButtonSubmit from '../components/Auth/ButtonSubmit.jsx'
import ButtonSignIn from '../components/Auth/ButtonSignIn.jsx'
import InputForm from '../components/Auth/InputForm.jsx'

const schema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.empty': 'Email dan Password wajib diisi!',
            'string.email': 'Format email tidak valid!',
            'any.required': 'Email dan Password wajib diisi!'
        }),
    password: Joi.string()
        .min(8)
        .required()
        .messages({
            'string.empty': 'Email dan Password wajib diisi!',
            'string.min': 'Password minimal harus 8 karakter!',
            'any.required': 'Email dan Password wajib diisi!'
        })
})

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const users = useSelector((state) => state.user.users)
    const [error, setError] = useState('')
    const [FormData, setFormData] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        if (error) {
            const { error: validationError } = schema.validate(FormData);
            if (!validationError) {
                setError('');
            }
        }
    }, [FormData]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleLogin = (e) => {
        e.preventDefault()

        const { error: validationError } = schema.validate(FormData);

        if (validationError) {
            setError(validationError.details[0].message);
            return;
        }

        const foundUser = users.find(
            (user) =>
                user.email === FormData.email &&
                user.password === FormData.password
        )
        if (!foundUser) {
            setError('Email dan Password salah!')
            return
        }

        dispatch(loginSuccess(foundUser))
        toast.success(`Login Berhasil`);
        setTimeout(() => {
            navigate('/dashboard');
        }, 1000);
        
    }

    return (
        <div className='flex min-h-screen md:bg-primary '>
            <section className='flex flex-1 bg-white justify-center flex-col px-20 py-8 md:rounded-r-4xl gap-2'>
                <header className='flex items-center gap-2'>
                    <img src='/icons/logo.svg' alt='E-Wallet Logo' className='w-10 h-10' />
                    <span className='flex justify-center items-center font-bold font-nunito text-xl text-primary'>E-Wallet</span>
                </header>
                <div>
                    <h1 className='text-4xl font-semibold'>Hello Welcome Back 👋</h1>
                    <p className='text-lg my-2'>Fill out the form correctly or you can login with several options.</p>
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
                <p className='text-right text-gray-500 text-sm'>
                    <Link to="forgotpassword" className="text-black hover:text-primary hover:underline">
                        Forgot Password?
                    </Link>
                </p>
                <p className='text-center text-gray-500 text-sm'>
                    <span>Not Have An Account? </span>
                    <Link to="register" className="text-blue-500 hover:underline">
                        Register
                    </Link>
                </p>
            </section>
            <section className='hidden md:flex md:flex-1'>
                <img src='/icons/right-login.svg' alt='Google' />
            </section>
        </div>
    )
}

export default Login