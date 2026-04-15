import React from 'react'
import ButtonSubmit from '../Auth/ButtonSubmit.jsx'
import InputForm from '../Auth/InputForm'

function DetailTransfer() {
    return (
        <>
            <section className="bg-white rounded-2xl p-6  border border-gray-100 ">
                <div className="mb-8">
                    <h3 className="text-lg font-bold mb-4">People Information</h3>

                    <div className="flex items-center gap-4 bg-[#E8E8E84D] p-4  border border-gray-100">
                        <img
                            src="/images/Customer.svg"
                            alt="photo-profile"
                            className="w-16 h-16 rounded-md object-cover"
                        />
                        <div className="flex-1">
                            <p className="font-bold text-md">Ghaluh 1</p>
                            <p className="text-sm text-gray-500 mb-1">(239) 555-0108</p>
                            <div className="flex items-center gap-2 bg-primary text-white text-xs px-3 py-1 rounded-lg w-fit">
                                <img src="/icons/verified.svg" alt="verified" className="w-4 h-4" />
                                <span>Verified</span>
                            </div>
                        </div>
                        <button className="p-2 hover:bg-gray-200 rounded-full transition-colors cursor-pointer">
                            <img src="/icons/Star.svg" alt="favorite" className="w-6 h-6 opacity-40" />
                        </button>
                    </div>
                </div>


                <div className="mb-8">
                    <h3 className="text-md font-bold">Amount</h3>
                    <p className="text-sm text-gray-500 mb-4">
                        Type the amount you want to transfer and then press continue to the next steps.
                    </p>
                    <div>
                        <InputForm type="number" placeholder="Enter Nominal Transfer" name="money" path="/icons/moneytf.svg"/>
                    </div>
                </div>


                <div className="mb-10">
                    <h3 className="text-md font-bold">Notes</h3>
                    <p className="text-sm text-gray-500 mb-4">
                        You can add some notes for this transfer such as payment coffee or something
                    </p>
                    <textarea
                        placeholder="Enter Some Notes"
                        className="w-full p-4 bg-white border border-gray-200 rounded-md text-sm focus:outline-none resize-none placeholder:text-gray-400"
                    ></textarea>
                </div>


                <ButtonSubmit label="Submit & Transfer" />

            </section>
        </>
    )
}

export default DetailTransfer
