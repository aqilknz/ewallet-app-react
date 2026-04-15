import React from 'react'
import InputForm from '../components/Auth/InputForm'
import ButtonSubmit from '../components/Auth/ButtonSubmit'

function ForgotPassword() {
    return (
        <main className='bg-primary min-w-full min-h-screen flex items-center justify-center'>
            <article className='bg-white rounded-xl min-w-1/2 min-h-full flex flex-col place-self-center px-10 py-15 gap-5'>
                <header className='flex items-center gap-2'>
                    <img src='/icons/logo.svg' alt='E-Wallet Logo' className='w-10 h-10' />
                    <span className='flex justify-center items-center font-bold font-nunito text-xl text-primary'>E-Wallet</span>
                </header>
                <div className='flex flex-col gap-5'>
                    <h1 className='text-3xl font-semibold'>Fill Out Form Correctly 👋</h1>
                    <p className='text-lg my-1'>We will send new password to your email</p>
                </div>
                <div className='flex flex-col gap-1'>
                    <InputForm text="Email" type="email" placeholder="Enter your email" name="email" path="/icons/email.svg" />
                </div>
                <ButtonSubmit label='Submit'/>
            </article>
        </main>
    )
}

export default ForgotPassword