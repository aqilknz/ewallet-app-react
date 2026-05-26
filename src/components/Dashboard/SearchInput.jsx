import React from "react";

const SearchInput = ({ value, onChange }) => {
  return (
    <div className="relative w-full md:w-80">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Enter Number or Full Name"
        className="w-full rounded-xl border border-gray-200 bg-white py-3 pr-12 pl-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
        <img src="/icons/Search.svg" className="h-5 w-5" />
      </div>
    </div>
  );
};

export default SearchInput;
