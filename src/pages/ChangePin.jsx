import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePinLogic } from "../hooks/usePinLogic";
import { updateUserPin } from "../redux/slice/loginUserSlice";
import toast from "react-hot-toast";
import ButtonSubmit from "../components/Auth/ButtonSubmit";
import PinInput from "../components/Auth/PinInput";

function ChangePin() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const {
    pin: oldPin,
    inputRefs: oldInputRefs,
    handleChange: handleOldChange,
    handleKeyDown: handleOldKeyDown,
    pinString: oldPinString,
    resetPin: resetOldPin
  } = usePinLogic(6);

  const {
    pin: newPin,
    inputRefs: newInputRefs,
    handleChange: handleNewChange,
    handleKeyDown: handleNewKeyDown,
    pinString: newPinString,
    resetPin: resetNewPin
  } = usePinLogic(6);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (oldPinString.length < 6) {
      return toast.error("Existing PIN must be 6 digits");
    }

    if (newPinString.length < 6) {
      return toast.error("New PIN must be 6 digits");
    }

    if (oldPinString === newPinString) {
      return toast.error("New PIN cannot be the same as the old PIN");
    }

    const payload = {
      old_pin: oldPinString,
      new_pin: newPinString,
    };

    const loadingToast = toast.loading("Updating PIN...");

    dispatch(updateUserPin(payload))
      .unwrap()
      .then(() => {
        toast.success("PIN changed successfully!", { id: loadingToast });
        resetOldPin();
        resetNewPin();
      })
      .catch((err) => {
        toast.error(err || "Failed to change PIN", { id: loadingToast });
      }).finally(() => {
        resetOldPin();
        resetNewPin();
      });
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
          Please save your pin because this so important.
        </p>

        <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-8">

          <div className="flex flex-col items-center">
            <label className="mb-4 text-sm font-semibold text-gray-700">Enter Existing PIN</label>
            <PinInput
              pin={oldPin}
              inputRefs={oldInputRefs}
              handleChange={handleOldChange}
              handleKeyDown={handleOldKeyDown}
            />
          </div>

          <div className="flex flex-col items-center border-t border-gray-100 pt-8">
            <label className="mb-4 text-sm font-semibold text-gray-700">Enter New PIN</label>
            <PinInput
              pin={newPin}
              inputRefs={newInputRefs}
              handleChange={handleNewChange}
              handleKeyDown={handleNewKeyDown}
            />
          </div>

          <div className="mt-4">
            <ButtonSubmit label={isLoading ? "Processing..." : "Save PIN"} disabled={isLoading} />
          </div>
        </form>
      </section>
    </>
  );
}

export default ChangePin;