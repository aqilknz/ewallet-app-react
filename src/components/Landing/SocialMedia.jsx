import React from "react";

/**
 *
 * @param {object} props
 * @param {string} props.sosmed
 * @param {string} props.alt
 * @returns {JSX.Element}
 */

function SocialMedia({ sosmed, alt }) {
  return (
    <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white">
      <img src={sosmed} alt={alt} className="object-contain" />
    </button>
  );
}

export default SocialMedia;
