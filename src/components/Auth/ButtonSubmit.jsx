import React from "react";
import "../../Global.css";

/**
 *
 * @param {object} props
 * @param {string} props.label
 * @returns {JSX.Element}
 */

function ButtonSubmit({ label }) {
  return (
    <div className="w-full">
      <button
        type="submit"
        className="bg-primary font-monserrat my-2 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg px-4 py-2 font-bold text-white hover:bg-blue-800"
      >
        {label}
      </button>
    </div>
  );
}

export default ButtonSubmit;
