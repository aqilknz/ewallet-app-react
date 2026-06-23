import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePinLogic } from "../hooks/usePinLogic";
import { updateUserPin, checkUserPin } from "../redux/slice/authUserSlice";
import toast from "react-hot-toast";
import ButtonSubmit from "../components/Auth/ButtonSubmit";
import PinInput from "../components/Auth/PinInput";

function ChangePin() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const [step, setStep] = useState(1);

  const oldPinLogic = usePinLogic(6);
  const newPinLogic = usePinLogic(6);
  const confirmPinLogic = usePinLogic(6);

  // Handler 1, pin lama
  const handleStep1 = (e) => {
    e.preventDefault();
    if (oldPinLogic.pinString.length < 6) {
      return toast.error("Existing PIN must be 6 digits");
    }
    const loadingToast = toast.loading("Verifying your PIN...");
    dispatch(checkUserPin({ pin: oldPinLogic.pinString }))
      .unwrap()
      .then(() => {
        toast.dismiss(loadingToast);
        setStep(2);
      })
      .catch((err) => {
        toast.error(err || "Incorrect Existing PIN", { id: loadingToast });
        oldPinLogic.resetPin();
      });
  };

  // Handler 2, validasi pin baru yee
  const handleStep2 = (e) => {
    e.preventDefault();
    if (newPinLogic.pinString.length < 6) {
      return toast.error("New PIN must be 6 digits");
    }
    if (oldPinLogic.pinString === newPinLogic.pinString) {
      return toast.error("New PIN cannot be the same as the old PIN");
    }
    setStep(3);
  };

  // handle 3, validasi confirm dan API
  const handleFinalSubmit = (e) => {
    e.preventDefault();

    if (confirmPinLogic.pinString.length < 6) {
      return toast.error("Confirmation PIN must be 6 digits");
    }

    if (newPinLogic.pinString !== confirmPinLogic.pinString) {
      return toast.error("New PIN and Confirmation PIN do not match!");
    }

    const payload = {
      old_pin: oldPinLogic.pinString,
      new_pin: newPinLogic.pinString,
    };

    const loadingToast = toast.loading("Updating PIN...");

    dispatch(updateUserPin(payload))
      .unwrap()
      .then(() => {
        toast.success("PIN changed successfully!", { id: loadingToast });
        oldPinLogic.resetPin();
        newPinLogic.resetPin();
        confirmPinLogic.resetPin();
        setStep(1);
      })
      .catch((err) => {
        toast.error(err || "Failed to change PIN", { id: loadingToast });
      });
  };

  const getSubtitle = () => {
    if (step === 1) return "Step 1/3: Enter your existing PIN to verify your identity.";
    if (step === 2) return "Step 2/3: Create a new 6-digit PIN.";
    if (step === 3) return "Step 3/3: Confirm your new PIN to save changes.";
  };

  return (
    <>
      <div className="mb-6 flex items-center gap-3">
        <img src="/icons/Profile/User-blue.svg" alt="Profile" className="w-5" />
        <h2 className="text-lg font-semibold">Profile</h2>
      </div>

      <section className="w-full rounded-lg border border-gray-300 p-6 md:p-10">
        <h3 className="mb-3 block text-center text-xl font-bold text-gray-900">
          Change PIN 👋
        </h3>
        <p className="mb-10 text-center text-sm text-gray-500">
          {getSubtitle()}
        </p>

        <div className="mx-auto max-w-md">
          {step === 1 && (
            <form onSubmit={handleStep1} className="flex flex-col items-center animate-fadeIn">
              <label className="mb-4 text-sm font-semibold text-gray-700">Existing PIN</label>
              <PinInput
                pin={oldPinLogic.pin}
                inputRefs={oldPinLogic.inputRefs}
                handleChange={oldPinLogic.handleChange}
                handleKeyDown={oldPinLogic.handleKeyDown}
              />
              <div className="mt-8 w-full">
                <ButtonSubmit label="Continue" />
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleStep2} className="flex flex-col items-center animate-fadeIn">
              <label className="mb-4 text-sm font-semibold text-primary">New PIN</label>
              <PinInput
                pin={newPinLogic.pin}
                inputRefs={newPinLogic.inputRefs}
                handleChange={newPinLogic.handleChange}
                handleKeyDown={newPinLogic.handleKeyDown}
              />
              <div className="mt-8 flex w-full gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 rounded-xl border border-gray-300 py-3 font-semibold text-gray-600 transition-all hover:bg-gray-50"
                >
                  Back
                </button>
                <div className="flex-1">
                  <ButtonSubmit label="Continue" />
                </div>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleFinalSubmit} className="flex flex-col items-center animate-fadeIn">
              <label className="mb-4 text-sm font-semibold text-green-600">Confirm New PIN</label>
              <PinInput
                pin={confirmPinLogic.pin}
                inputRefs={confirmPinLogic.inputRefs}
                handleChange={confirmPinLogic.handleChange}
                handleKeyDown={confirmPinLogic.handleKeyDown}
              />
              <div className="mt-8 flex w-full gap-3">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => setStep(2)}
                  className="w-1/3 rounded-xl border border-gray-300 py-3 font-semibold text-gray-600 transition-all hover:bg-gray-50 disabled:opacity-50"
                >
                  Back
                </button>
                <div className="flex-1">
                  <ButtonSubmit label={isLoading ? "Processing..." : "Save PIN"} disabled={isLoading} />
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

export default ChangePin;