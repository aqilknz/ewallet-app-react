import React from 'react';

const PinInput = ({ pin = [], inputRefs, handleChange, handleKeyDown }) => {
    return (
        <div className="flex justify-center gap-2 md:gap-4 my-10">
            {pin.map((digit, i) => (
                <input
                    key={i}
                    ref={(el) => {
                        if (inputRefs && inputRefs.current) {
                            inputRefs.current[i] = el;
                        }
                    }}
                    type="password"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    className="w-10 h-12 md:w-14 md:h-16 border-b-2 border-gray-300 focus:border-primary 
                               focus:outline-none text-2xl font-bold text-center transition-all bg-transparent"
                />
            ))}
        </div>
    );
};

export default PinInput;