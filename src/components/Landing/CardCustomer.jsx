import React from "react";

/**
 *
 * @param {object} props
 * @param {string} props.path
 * @param {string} props.name
 * @param {string} props.rating
 * @param {string} props.review
 * @returns {JSX.Element}
 */

function CardCustomer({ path, name, rating, review }) {
  return (
    <div className="flex flex-col items-center justify-center bg-white">
      <div className="bg-secondary mx-10 my-5 flex w-fit flex-col items-center justify-center gap-5 rounded-xl px-5 py-15 text-center">
        <img src={path} alt={name} />
        <h3 className="text-2xl font-bold">{name}</h3>
        <img src={rating} className="w-1/2" />
        <p className="text-5xl font-extrabold">“</p>
        <p className="w-full text-center text-lg">{review}</p>
      </div>
    </div>
  );
}

export default CardCustomer;
