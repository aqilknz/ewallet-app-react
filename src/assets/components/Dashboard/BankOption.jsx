import React from 'react';
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
            className={`flex items-center p-4 rounded-xl cursor-pointer transition-all border-2 ${isChecked
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-transparent bg-gray-50 hover:bg-gray-100'
                }`}
        >
            <input
                type="radio"
                name="payment"
                className="hidden"
                checked={isChecked}
                onChange={() => onChange(id)}
            />

            {/* Custom Radio Circle */}
            <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center flex-shrink-0 bg-white transition-colors ${isChecked ? 'border-blue-600' : 'border-gray-300'
                }`}>
                {isChecked && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
            </div>

            <div className="flex items-center gap-5 ml-4">
                <img
                    src={icon}
                    alt={name}
                    className="h-8 w-12 object-contain"
                />
                <span className={`text-sm ${isChecked ? 'text-gray-900 font-medium' : 'text-gray-500 font-normal'}`}>
                    {name}
                </span>
            </div>
        </label>
    );
};

export default BankOption;