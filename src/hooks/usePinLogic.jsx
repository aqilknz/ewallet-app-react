import { useState, useRef } from "react";

export const usePinLogic = (length = 6) => {
  const [pin, setPin] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    const newValue = value.replace(/\D/, "");
    if (newValue.length > 1) return;

    const newPin = [...pin];
    newPin[index] = newValue;
    setPin(newPin);

    if (newValue && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length).split("");
    if (pastedData.length === 0) return;

    const newPin = [...pin];
    pastedData.forEach((char, i) => {
      newPin[i] = char;
    });
    setPin(newPin);

    const focusIndex = pastedData.length < length ? pastedData.length : length - 1;
    if (inputRefs.current[focusIndex]) {
      inputRefs.current[focusIndex].focus();
    }
  };

  const resetPin = () => {
    setPin(new Array(length).fill(""));
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  };

  return {
    pin,
    inputRefs,
    handleChange,
    handleKeyDown,
    handlePaste,
    resetPin,
    pinString: pin.join(""),
  };
};