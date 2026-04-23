import React, { useState, useRef } from 'react';

const PinInput = ({ length = 6, onComplete }) => {
    const [pin, setPin] = useState(new Array(length).fill(""));
    const inputRefs = useRef([]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        const newPin = [...pin];
        newPin[index] = element.value;
        setPin(newPin);

        if (element.value !== "" && index < length - 1) {
            inputRefs.current[index + 1].focus();
        }

        if (newPin.every(v => v !== "")) {
            onComplete(newPin.join(""));
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !pin[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <div className="flex justify-center gap-2 md:gap-4 my-10">
            {pin.map((data, index) => (
                <input
                    key={index}
                    type="password"
                    inputMode="numeric"
                    maxLength="1"
                    ref={(el) => (inputRefs.current[index] = el)}
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-10 h-12 md:w-14 md:h-16 border-b-2 border-gray-300 text-center text-2xl font-bold focus:border-blue-600 focus:outline-none transition-all"
                />
            ))}
        </div>
    );
};

export default PinInput;