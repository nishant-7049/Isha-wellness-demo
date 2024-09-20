import React from "react";
import { useDispatch } from "react-redux";
import { deletePackage } from "../../store/slices/packageSlice";
import { Link, useLocation } from "react-router-dom";

const PackageCard = ({ pac, role, selectedPackage, selectPackage }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  return (
    <div
      className={`shadow-lg   p-[1vmax] flex flex-col gap-2 border-2 border-[#00286b] text-[#00286b] justify-between mx-auto relative ${
        location?.pathname == "/admin/packages" ? "w-1/4 sm:w-full" : "h-full"
      }`}
    >
      {location?.pathname != "/admin/packages" && (
        <button
          className={`absolute flex justify-center items-center top-4 right-4 w-[15px] h-[15px]  rounded-full border-2 border-[#00286b]`}
          type="button"
          onClick={() => {
            selectPackage(pac._id);
          }}
        >
          {selectedPackage == pac._id && (
            <div className="bg-[#00286b] w-[8px] h-[8px] rounded-full"></div>
          )}
        </button>
      )}
      <h2 className="text-lg font-bold">{pac.name}</h2>
      <p className="text-sm text-black">{pac.description}</p>
      <p className="font-semibold text-sm">Payment Type: {pac.paymentType}</p>
      <p className="font-semibold text-sm">No. of Sessions: {pac.sessions}</p>
      <p className="font-semibold text-sm">No. of Days: {pac.days}</p>

      <h3 className="text-sm font-semibold">Price: ₹{pac.price}</h3>
      {role == "admin" && (
        <div className="flex w-full gap-4 justify-end">
          <Link
            to={`/admin/packages/edit/${pac._id}`}
            className=" font-bold px-[0.5vmax] py-[0.3vmax]  hover:underline"
          >
            Edit
          </Link>
          <button
            className="font-bold text-white bg-red-800 px-[0.5vmax] py-[0.3vmax] hover:bg-white hover:text-red-800 hover:underline"
            onClick={() => {
              dispatch(deletePackage(pac._id));
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PackageCard;
