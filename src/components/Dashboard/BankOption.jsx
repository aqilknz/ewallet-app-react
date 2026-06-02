import React from "react";
/**
 *
 * @param {Object} props
 * @param {string|number} props.id
 * @param {string} props.name
 * @param {string} props.icon
 * @param {boolean} props.isChecked
 * @param {function} props.onChange
 * @returns {JSX.Element}
 */

const BankOption = ({ id, name, icon, isChecked, onChange }) => {
  return (
    <label
      className={`flex cursor-pointer items-center rounded-xl border-2 p-4 transition-all ${isChecked
        ? "border-blue-600 bg-blue-50"
        : "border-transparent bg-gray-50 hover:bg-gray-100"
        }`}
    >
      <input
        type="radio"
        name="payment"
        className="hidden"
        checked={isChecked}
        onChange={() => onChange(id)}
      />

      <div
        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 bg-white transition-colors ${isChecked ? "border-blue-600" : "border-gray-300"
          }`}
      >
        {isChecked && <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />}
      </div>

      <div className="ml-4 flex items-center gap-5">
        <img src={icon} alt={name} className="h-8 w-12 object-contain" />
        <span
          className={`text-sm ${isChecked ? "font-medium text-gray-900" : "font-normal text-gray-500"
            }`}
        >
          {name}
        </span>
      </div>
    </label>
  );
};

export default BankOption;