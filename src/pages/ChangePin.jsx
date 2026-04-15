import React, { useState } from 'react'
import Header from '../components/Dashboard/Header'
import Sidebar from '../components/Dashboard/Sidebar'
import ButtonSubmit from '../components/Auth/ButtonSubmit'
import PinInput from '../components/Auth/PinInput'

function ChangePin() {
    const [finalPin, setFinalPin] = useState("");

    const handlePinComplete = (pin) => {
        setFinalPin(pin);
        console.log("Pin terisi:", pin);
    };
    return (
        <>
            <div className='flex flex-col min-h-full bg-white'>
                <Header />
                <div className='flex flex-1 overflow-hidden'>
                    <Sidebar />
                    <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-white">
                        <div className='max-w-6xl mx-auto'>

                            {/* Title */}
                            <div className="flex items-center gap-3 mb-6">
                                <img src="/icons/Profile/User-blue.svg" alt="Profile" className="w-5" />
                                <h2 className="text-lg font-semibold">Profile</h2>
                            </div>

                            {/* Card */}
                            <section className="border border-gray-300 rounded-lg p-6 w-full">
                                <h3 className='font-semibold text-lg text-gray-900 mb-3 block text-center'>
                                    Change Pin 👋
                                </h3>
                                <p className='text-center'>
                                    Please save your pin because this so important.
                                </p>
                                <PinInput length={6} onComplete={handlePinComplete} />
                                <ButtonSubmit label='Submit' />

                            </section>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default ChangePin