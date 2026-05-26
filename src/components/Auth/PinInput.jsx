import React from "react";

const PinInput = ({ pin = [], inputRefs, handleChange, handleKeyDown }) => {
  return (
    <div className="my-10 flex justify-center gap-2 md:gap-4">
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
          className="focus:border-primary h-12 w-10 border-b-2 border-gray-300 bg-transparent text-center text-2xl font-bold transition-all focus:outline-none md:h-16 md:w-14"
        />
      ))}
    </div>
  );
};

export default PinInput;
