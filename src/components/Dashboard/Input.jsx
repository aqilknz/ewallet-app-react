import React from "react";

function Input({
  name,
  text,
  path,
  type,
  value,
  onChange,
  placeholder,
  disabled,
  readOnly,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-2xl">
        {text}
      </label>
      <div className="relative flex items-center">
        <img
          src={path}
          alt={text}
          className="absolute left-4 h-5 w-5 opacity-70"
        />

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          className="w-full rounded-sm border border-gray-300 bg-transparent px-2 py-2 pr-10 pl-10 autofill:shadow-[inset_0_0_0px_1000px_white] focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
    </div>
  );
}

export default Input;
