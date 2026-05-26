import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Modal } from "./Modal.jsx";
import { useSelector, useDispatch } from "react-redux";
import ButtonSubmit from "../Auth/ButtonSubmit.jsx";
import InputForm from "../Auth/InputForm.jsx";
import PinInput from "../Auth/PinInput.jsx";
import { usePinLogic } from "../../hooks/usePinLogic.jsx";
import { addTransaction } from "../../redux/slice/transactionSlice.js";
import { loginSuccess } from "../../redux/slice/authSlice.js";
import { updateTransfer } from "../../redux/slice/registerSlice.js";
import toast from "react-hot-toast";

function DetailTransfer({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { pin, inputRefs, handleChange, handleKeyDown, resetPin, pinString } =
    usePinLogic(6);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("input");
  const [amount, setAmount] = useState("");
  const handleOpenModal = (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      return toast.error("Silakan masukkan nominal transfer!");
    }
    setIsModalOpen(true);
    setStatus("input");
  };

  const handleConfirmPin = () => {
    if (pinString === currentUser.pin) {
      const nominal = Number(amount);
      if (currentUser.balance < nominal) {
        setStatus("input");
        resetPin();
        return toast.error("Saldo Anda tidak mencukupi!");
      }
      setStatus("success");

      const formattedAmount = new Intl.NumberFormat("id-ID").format(amount);
      dispatch(
        addTransaction({
          name: user?.name || "Unknown User",
          type: "Transfer",
          amount: `-Rp${formattedAmount}`,
          img: user?.path || "/images/Customer.svg",
        }),
      );
      dispatch(
        updateTransfer({
          username: currentUser.email,
          amount: nominal,
        }),
      );
      dispatch(
        loginSuccess({
          ...currentUser,
          balance: (currentUser.balance || 0) - nominal,
          expense: (currentUser.expense || 0) + nominal,
        }),
      );
    } else {
      setStatus("failed");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetPin();
  };

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <form onSubmit={handleOpenModal}>
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-bold">People Information</h3>

          <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-[#E8E8E84D] p-4">
            <img
              src={user?.path || "/images/Customer.svg"}
              alt="photo-profile"
              className="h-16 w-16 rounded-md object-cover"
            />
            <div className="flex-1">
              <p className="text-md font-bold">
                {user?.name || "Unknown User"}
              </p>
              <p className="mb-1 text-sm text-gray-500">{user?.telp || "-"}</p>
              <div className="flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-3 py-1 text-xs text-white">
                <img
                  src="/icons/verified.svg"
                  alt="verified"
                  className="h-4 w-4"
                />
                <span>Verified</span>
              </div>
            </div>
            <button className="cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-200">
              <img
                src="/icons/Star.svg"
                alt="favorite"
                className="h-6 w-6 opacity-40"
              />
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-md font-bold">Amount</h3>
          <p className="mb-4 text-sm text-gray-500">
            Type the amount you want to transfer and then press continue to the
            next steps.
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
          <p className="mb-4 text-sm text-gray-500">
            You can add some notes for this transfer such as payment coffee or
            something
          </p>
          <textarea
            placeholder="Enter Some Notes"
            className="w-full resize-none rounded-md border border-gray-200 bg-white p-4 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows="3"
          ></textarea>
        </div>
        <ButtonSubmit label="Submit & Transfer" />
      </form>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        inner="max-w-lg md:w-full"
      >
        <div className="sticky justify-self-center rounded-2xl bg-white p-6">
          <p className="mb-6 border-b pb-4 text-xs font-bold tracking-widest text-gray-400 uppercase">
            Transfer to {user?.name}
          </p>

          {/* input pin */}
          {status === "input" && (
            <div className="text-center">
              <h2 className="mb-2 text-xl font-bold md:text-2xl">
                Enter Your Pin 👋
              </h2>
              <p className="md:textlg mb-6 text-sm text-gray-500">
                Enter Your Pin For Transaction
              </p>
              <PinInput
                pin={pin}
                inputRefs={inputRefs}
                handleChange={handleChange}
                handleKeyDown={handleKeyDown}
              />
              <button
                onClick={handleConfirmPin}
                className="mt-4 w-full rounded-xl bg-blue-600 py-4 font-bold text-white"
              >
                Next
              </button>
              <p className="mt-4 text-sm text-gray-500">
                Forgot Your Pin?
                <span className="cursor-pointer text-blue-600">
                  {" "}
                  <Link to="/profile/changepin">Reset</Link>
                </span>
              </p>
            </div>
          )}

          {/* success */}
          {status === "success" && (
            <div className="py-4 text-center">
              <img
                src="/icons/modal/modal-success.svg"
                alt="success"
                className="mx-auto mb-6 w-48"
              />
              <h2 className="mb-2 text-2xl font-bold">
                Yeay Transfer <span className="text-green-500">Success</span>
              </h2>
              <p className="mb-8 px-10 text-gray-500">
                Thank you for using this application for your financial
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white"
                >
                  Done
                </button>
                <button
                  onClick={closeModal}
                  className="w-full rounded-xl border border-blue-600 py-3 font-bold text-blue-600"
                >
                  Transfer Again
                </button>
              </div>
            </div>
          )}

          {/* failed */}
          {status === "failed" && (
            <div className="py-4 text-center">
              <img
                src="/icons/modal/modal-failed.svg"
                alt="failed"
                className="mx-auto mb-6 w-48"
              />
              <h2 className="mb-2 text-2xl font-bold">
                Oops Transfer <span className="text-red-500">Failed</span>
              </h2>
              <p className="mb-8 px-10 text-gray-500">
                Sorry Theres is an issue for your transfer, try again later!
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setStatus("input");
                    resetPin();
                  }}
                  className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white"
                >
                  Try Again
                </button>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full rounded-xl border border-blue-600 py-3 font-bold text-blue-600"
                >
                  Back To Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </section>
  );
}

export default DetailTransfer;
