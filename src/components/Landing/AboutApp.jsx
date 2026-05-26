import React from "react";

/**
 *
 * @param {object} props
 * @param {string} props.image
 * @param {string} props.name
 * @param {string} prop.description
 * @returns {JSX.Element}
 */

function AboutApp({ image, name, description }) {
  return (
    <div className="bg-primary flex h-auto w-full flex-col items-center gap-5 rounded-2xl px-6 py-10 text-white shadow-lg">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white p-3">
        <img src={image} alt={name} className="h-full w-full object-contain" />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-center text-lg font-bold md:text-2xl">{name}</h3>
        <p className="text-center text-base leading-relaxed opacity-90 md:text-lg">
          {description}
        </p>
      </div>
    </div>
  );
}

export default AboutApp;
