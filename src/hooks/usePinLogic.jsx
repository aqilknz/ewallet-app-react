import { useState, useRef } from "react";

export const usePinLogic = (length = 6) => {
    const [pin, setPin] = useState(Array(length).fill(""));
    const inputRefs = useRef([]);

    const handleChange = (value, index) => {
        const newValue = value.replace(/\D/, ""); // Hanya angka
        if (newValue.length > 1) return;

        const newPin = [...pin];
        newPin[index] = newValue;
        setPin(newPin);

        // Pindah ke kotak selanjutnya jika diisi
        if (newValue && index < length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !pin[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };
    const resetPin = () => {
        setPin(new Array(6).fill(""));
    };

    return { pin, inputRefs, handleChange, handleKeyDown, resetPin, pinString: pin.join("") };
};