import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ButtonSubmit from '../components/Auth/ButtonSubmit'
import PinInput from '../components/Auth/PinInput'

function EnterPin() {
    const handlePinComplete = (pin) => {
        setFinalPin(pin);
        console.log("Pin terisi:", pin);
    };
    return (
        <main className='bg-primary min-w-full min-h-screen flex items-center justify-center'>
            <article className='bg-white rounded-xl min-w-1/2 min-h-full flex flex-col place-self-center px-10 py-15 gap-5'>
                <header className='flex items-center gap-2'>
                    <img src='/icons/logo.svg' alt='E-Wallet Logo' className='w-10 h-10' />
                    <span className='flex justify-center items-center font-bold font-nunito text-xl text-primary'>E-Wallet</span>
                </header>
                <div className='flex flex-col gap-5'>
                    <h1 className='text-3xl font-semibold'>Enter Your Pin👋</h1>
                    <p className='text-lg my-1'>Please save your pin because this so important.</p>
                </div>
                <PinInput length={6} onComplete={handlePinComplete} />
                <ButtonSubmit label='Submit' />
                <p className='text-center text-gray-500 text-sm'>
                    <span>Forgot Your Pin? </span>
                    <Link to=".." className="text-blue-500 hover:underline">Reset</Link>
                </p>
            </article>
        </main>
    )
}

export default EnterPin