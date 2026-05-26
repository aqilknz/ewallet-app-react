import React from "react";

/**
 *
 * @param {object} props
 * @param {string} props.icons
 * @param {string} props.title
 * @param {string} props.description
 * @returns {JSX.Element}
 */

function FeatureItem({ icon, title, description }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl p-2">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white">
        <img src={icon} alt={title} className="h-7 w-7 object-contain" />
      </div>
      <div>
        <h4 className="mb-1 text-lg font-bold text-white">{title}</h4>
        <p className="text-sm leading-relaxed font-light text-white">
          {description}
        </p>
      </div>
    </div>
  );
}

export default FeatureItem;
