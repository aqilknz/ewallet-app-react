import React from "react";

/**
 *
 * @param {object} props
 * @param {string} props.partner
 * @returns {JSX.Element}
 */

function CardPartners({ partner }) {
  return (
    <div className="bg-red flex h-full w-full flex-col items-center justify-center gap-10 rounded-lg">
      <img src={partner} alt="Partner Logo" className="object-contain" />
    </div>
  );
}

export default CardPartners;
