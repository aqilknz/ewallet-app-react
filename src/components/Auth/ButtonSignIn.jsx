import React from "react";

/**
 *
 * @param {object} props
 * @param {string} props.path
 * @param {string} props.alt
 * @param {string} props.text
 * @returns {JSX.Element}
 */

function ButtonSignIn({ path, alt, text }) {
  return (
    <button className="font-monserrat border-secondary my-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border bg-white px-4 py-2 font-bold text-black hover:bg-blue-500 hover:text-white">
      <img src={path} alt={alt} />
      <span className="hidden md:block">{text}</span>
    </button>
  );
}

export default ButtonSignIn;
