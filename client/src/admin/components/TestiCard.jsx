import React from "react";
import { Link } from "react-router-dom";
import { deleteTesti } from "../../store/slices/testiSlice";
import { useDispatch } from "react-redux";

const TestiCard = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <div
      key={data.id}
      className="w-[40%] px-[2vmax] py-[1vmax] shadow-lg rounded-lg flex flex-col gap-2 sm:w-full"
    >
      <div className=" flex items-center   py-4  rounded-md sm:flex-col sm:px-4 sm:py-2">
        <div className="h-full w-20 rounded-full sm:mx-auto ">
          <img
            src={data.image.url}
            alt="/"
            className=" h-12  object-cover rounded-full sm:mx-auto"
          />
        </div>
        <div className=" flex flex-col flex-1  justify-between gap-2 text-left ">
          <h2 className=" font-extrabold text-lg sm:text-center">
            {data.name}
          </h2>
        </div>
      </div>
      <p className="overflow-y-auto  text-sm ml-4 h-20 sm:overflow-y-auto sm:h-20 ">
        {data.testimonial}
      </p>
      <div className="flex justify-end gap-2">
        <Link
          to={`/admin/testi/edit/${data._id}`}
          className="px-[1vmax] py-[0.5vmax] text-white font-semibold bg-[#00286b] hover:text-[#00286b] hover:bg-white border-2 border-[#00286b]"
        >
          Edit
        </Link>
        <button
          onClick={() => {
            dispatch(deleteTesti(data._id));
          }}
          className="px-[1vmax] py-[0.5vmax] text-white font-semibold bg-red-700 hover:text-red-700 hover:bg-white border-2 border-"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TestiCard;
