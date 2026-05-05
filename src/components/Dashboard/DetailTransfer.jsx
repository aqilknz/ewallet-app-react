import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router'
import { Modal } from './Modal.jsx'
import { useSelector, useDispatch } from 'react-redux'
import ButtonSubmit from '../Auth/ButtonSubmit.jsx'
import InputForm from '../Auth/InputForm.jsx'
import PinInput from '../Auth/PinInput.jsx'
import { usePinLogic } from '../../hooks/usePinLogic.jsx'
import { addTransaction } from '../../redux/slice/transactionSlice.js'
import { loginSuccess } from '../../redux/slice/authSlice.js'
import { updateTransfer } from '../../redux/slice/registerSlice.js'
import toast from 'react-hot-toast'

function DetailTransfer({ user }) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { currentUser } = useSelector((state) => state.auth);
    const { pin, inputRefs, handleChange, handleKeyDown, resetPin, pinString } = usePinLogic(6);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState('input');
    const [amount, setAmount] = useState("");
    const handleOpenModal = (e) => {
        e.preventDefault();
        if (!amount || amount <= 0) {
            return toast.error("Silakan masukkan nominal transfer!");
        }
        setIsModalOpen(true);
        setStatus('input');
    };

    const handleConfirmPin = () => {
        if (pinString === currentUser.pin) {
            const nominal = Number(amount);
            if (currentUser.balance < nominal) {
                setStatus('input');
                resetPin();
                return toast.error("Saldo Anda tidak mencukupi!");
            }
            setStatus('success');
            
            const formattedAmount = new Intl.NumberFormat('id-ID').format(amount);
            dispatch(addTransaction({
                name: user?.name || "Unknown User",
                type: "Transfer",
                amount: `-Rp${formattedAmount}`,
                img: user?.path || "/images/Customer.svg"
            }));
            dispatch(updateTransfer({
                username: currentUser.email,
                amount: nominal
            }));
            dispatch(loginSuccess({
                ...currentUser,
                balance: (currentUser.balance || 0) - nominal,
                expense: (currentUser.expense || 0) + nominal
            }));
        } else {
            setStatus('failed');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        resetPin()
    };

    return (
        <section className=" bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <form onSubmit={handleOpenModal}>

                <div className="mb-8">
                    <h3 className="text-lg font-bold mb-4">People Information</h3>

                    <div className="flex items-center gap-4 bg-[#E8E8E84D] p-4 border border-gray-100 rounded-xl">
                        <img
                            src={user?.path || "/images/Customer.svg"}
                            alt="photo-profile"
                            className="w-16 h-16 rounded-md object-cover"
                        />
                        <div className="flex-1">
                            <p className="font-bold text-md">{user?.name || "Unknown User"}</p>
                            <p className="text-sm text-gray-500 mb-1">{user?.telp || "-"}</p>
                            <div className="flex items-center gap-2 bg-blue-600 text-white text-xs px-3 py-1 rounded-lg w-fit">
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
                        <InputForm
                            type="text"
                            placeholder="Enter Nominal Transfer"
                            name="money"
                            path="/icons/moneytf.svg"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mb-10">
                    <h3 className="text-md font-bold">Notes</h3>
                    <p className="text-sm text-gray-500 mb-4">
                        You can add some notes for this transfer such as payment coffee or something
                    </p>
                    <textarea
                        placeholder="Enter Some Notes"
                        className="w-full p-4 bg-white border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none placeholder:text-gray-400"
                        rows="3"
                    ></textarea>
                </div>
                <ButtonSubmit label="Submit & Transfer" />
            </form>
            <Modal isOpen={isModalOpen} onClose={closeModal} inner="max-w-lg md:w-full">
                <div className="p-6 bg-white rounded-2xl sticky justify-self-center">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest border-b pb-4 mb-6">
                        Transfer to {user?.name}
                    </p>

                    {/* input pin */}
                    {status === 'input' && (
                        <div className="text-center">
                            <h2 className="text-xl md:text-2xl font-bold mb-2">Enter Your Pin 👋</h2>
                            <p className="text-sm md:textlg text-gray-500 mb-6">Enter Your Pin For Transaction</p>
                            <PinInput pin={pin} inputRefs={inputRefs} handleChange={handleChange} handleKeyDown={handleKeyDown} />
                            <button
                                onClick={handleConfirmPin}
                                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold mt-4"
                            >
                                Next
                            </button>
                            <p className="mt-4 text-sm text-gray-500">Forgot Your Pin?<span className="text-blue-600 cursor-pointer"> <Link to="/profile/changepin">Reset</Link></span></p>
                        </div>
                    )}

                    {/* success */}
                    {status === 'success' && (
                        <div className="text-center py-4">
                            <img src="/icons/modal/modal-success.svg" alt="success" className="mx-auto w-48 mb-6" />
                            <h2 className="text-2xl font-bold mb-2">Yeay Transfer <span className="text-green-500">Success</span></h2> 
                            <p className="text-gray-500 mb-8 px-10">Thank you for using this application for your financial</p>
                            <div className="flex flex-col gap-3">
                                <button onClick={() => navigate('/dashboard')} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">Done</button>
                                <button onClick={closeModal} className="w-full border border-blue-600 text-blue-600 py-3 rounded-xl font-bold">Transfer Again</button>
                            </div>
                        </div>
                    )}

                    {/* failed */}
                    {status === 'failed' && (
                        <div className="text-center py-4">
                            <img src="/icons/modal/modal-failed.svg" alt="failed" className="mx-auto w-48 mb-6" />
                            <h2 className="text-2xl font-bold mb-2">Oops Transfer <span className="text-red-500">Failed</span></h2>
                            <p className="text-gray-500 mb-8 px-10">Sorry Theres is an issue for your transfer, try again later!</p>
                            <div className="flex flex-col gap-3">
                                <button onClick={() => {setStatus('input'); resetPin()}} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">Try Again</button>
                                <button onClick={() => navigate('/dashboard')} className="w-full border border-blue-600 text-blue-600 py-3 rounded-xl font-bold">Back To Dashboard</button>
                            </div>
                        </div>
                    )}
                </div>
            </Modal>

        </section>
    )
}

export default DetailTransfer