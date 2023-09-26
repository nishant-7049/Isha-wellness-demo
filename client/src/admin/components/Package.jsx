import React, { useEffect, useState } from "react";
import PackageCard from "./PackageCard";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  createPackage,
  getAllPackages,
  resetIsCreated,
  resetIsDeleted,
  resetPac,
} from "../../store/slices/packageSlice";
import { RiCloseCircleFill } from "react-icons/ri";

const Package = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState("close");
  const { loading, error, packages, isDeleted, isCreated, pac } = useSelector(
    (state) => state.package
  );
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [pay, setPay] = useState("");
  const [price, setPrice] = useState(0);
  const submitHandler = (e) => {
    e.preventDefault();
    setToggle("close");
    const options = {
      name,
      description: des,
      paymentType: pay,
      price,
    };
    dispatch(createPackage(options));
  };
  useEffect(() => {
    dispatch(getAllPackages());
    if (isDeleted) {
      dispatch(resetIsDeleted());
    }
    if (isCreated) {
      dispatch(resetIsCreated());
    }
  }, [dispatch, isDeleted, isCreated]);
  useEffect(() => {
    if (pac) {
      dispatch(resetPac());
    }
  }, []);

  return (
    <div className="flex ">
      <Sidebar />
      <div className="w-full mt-[6vmax] flex flex-col gap-4 items-center">
        <h1 className="text-3xl border-b-4 border-[#00286b] text-[#00286b] pb-2 font-bold w-fit text-center mx-auto sm:text-2xl sm:w-4/5">
          Packages
        </h1>
        <button
          onClick={() => {
            setToggle("open");
          }}
          className="border-2 border-[#00286b] bg-[#00286b] text-white font-semibold px-[1vmax] py-[0.5vmax] hover:bg-white hover:text-[#00286b]"
        >
          Create Package
        </button>
        {toggle == "open" && (
          <div className="fixed w-full h-[100vh] bg-black bg-opacity-60 top-0 left-0 flex justify-center items-center">
            <form
              className="relative w-1/3 flex flex-col gap-4 items-center bg-white p-[2vmax]"
              onSubmit={submitHandler}
            >
              <h1 className="text-center mx-auto text-2xl font-semibold text-[#00286b] border-b-2 border-[#00286b] pb-4 w-1/2">
                Create Package
              </h1>
              <button
                onClick={() => {
                  setToggle("close");
                }}
                className="absolute top-[2vmax] right-[2vmax]"
              >
                <RiCloseCircleFill className=" text-[2vmax] font-bold text-[#00286b]" />
              </button>
              <input
                className=" bg-white px-[1.5vmax] py-[1vmax] border-2 "
                type="text"
                value={name}
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter Package Name"
              />
              <textarea
                className=" bg-white px-[1.5vmax] py-[1vmax] border-2 "
                type="description"
                value={des}
                required
                onChange={(e) => {
                  setDes(e.target.value);
                }}
                placeholder="Enter Package Description"
              />
              <select
                className=" bg-white px-[1.5vmax] py-[1vmax] border-2 "
                value={pay}
                required
                onChange={(e) => {
                  setPay(e.target.value);
                }}
              >
                <option value="">Choose</option>
                <option value="Online">Online</option>
                <option value="Pay After Treatment">Pay After Treatment</option>
              </select>
              <input
                className=" bg-white px-[1.5vmax] py-[1vmax] border-2 "
                type="number"
                value={price}
                required
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                placeholder="Enter Package Price "
              />
              <input
                type="submit"
                className="mx-auto py-[1vmax] px-[1.5vmax] bg-[#00286b] w-4/5 hover:bg-[white] border-2 border-[#00286b] hover:text-[#00286b]  text-white cursor-pointer"
              />
            </form>
          </div>
        )}
        <div className="w-4/5 flex gap-4 flex-wrap">
          {packages &&
            packages.map((pac) => {
              return <PackageCard pac={pac} role={"admin"} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Package;
