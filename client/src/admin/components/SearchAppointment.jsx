import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

const SearchAppointment = ({ keyword, setKeyword, submitHandler }) => {
  const handleFocus = (event) => {
    event.target.style.border = "none";
    event.target.style.boxShadow = "none";
    event.target.style.outline = "none";
  };
  return (
    <div className="flex w-[90%] mx-auto gap-4 items-center sm:justify-center">
      <Link
        to="/book/personalform"
        className="px-2 py-1 border-[1px] border-[#00286b] bg-[#00286b] text-white font-semibold hover:text-[#00286b] hover:bg-white "
      >
        Add
      </Link>
      <div className="flex items-center border-2">
        <input
          type="text"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          className="py-1 bg-white border-0"
          onFocus={handleFocus}
          placeholder="Search by patient's name"
        />
        <button
          className="bg-[#00286b] text-white p-2 text-lg"
          onClick={submitHandler}
        >
          <BiSearchAlt />
        </button>
      </div>
    </div>
  );
};

export default SearchAppointment;
