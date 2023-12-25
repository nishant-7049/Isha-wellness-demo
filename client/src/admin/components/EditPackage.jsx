import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Loader from "../../auth/Loader";
import { useSelector, useDispatch } from "react-redux";
import { editPackage, getPackageDetail } from "../../store/slices/packageSlice";
import { useParams } from "react-router-dom";

const EditPackage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, pac } = useSelector((state) => state.package);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pay, setPay] = useState("");
  const [price, setPrice] = useState();
  const [sessions, setSessions] = useState();
  const [days, setDays] = useState();
  const submitHandler = (e) => {
    e.preventDefault();
    const options = {
      id,
      data: {
        name,
        description,
        paymentType: pay,
        price,
        days,
        sessions,
      },
    };
    dispatch(editPackage(options));
  };
  useEffect(() => {
    if (!pac || pac._id != id) {
      dispatch(getPackageDetail(id));
    }
    if (pac) {
      setName(pac.name);
      setDescription(pac.description);
      setPay(pac.paymentType);
      setPrice(pac.price);
      setDays(pac.days);
      setSessions(pac.sessions);
    }
  }, [dispatch, pac]);
  return (
    <>
      <div className="flex sm:flex-col">
        <Sidebar />
        {loading ? (
          <Loader />
        ) : (
          <div className="w-full h-[100vh] flex justify-center items-center ">
            <form
              onSubmit={submitHandler}
              className="flex flex-col relative top-[2vmax] gap-8 shadow-lg shadow-[#00286b] border-2 p-[2vmax] items-center w-3/5 sm:shadow-none sm:w-[95%] sm:p-[1vmax]"
            >
              <h1 className="text-2xl font-bold border-b-4 text-[#00286b] border-[#00286b] w-3/5 text-center mx-auto">
                Edit Package
              </h1>
              <div className="w-full flex gap-4 items-center justify-center">
                <label className="text-[#00286b] font-semibold">Name:</label>
                <input
                  className=" px-[1vmax] py-[0.5vmax] bg-white border-2 "
                  type="text"
                  placeholder="Enter Package Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="w-full flex gap-4 items-center justify-center">
                <label className="text-[#00286b] font-semibold">
                  Description:
                </label>
                <textarea
                  className=" px-[1vmax] py-[0.5vmax] bg-white border-2 \"
                  type="text"
                  placeholder="Enter Package Description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className="w-full flex gap-4 items-center justify-center">
                <label className="text-[#00286b] font-semibold">
                  Payment type:
                </label>
                <select
                  className=" px-[1vmax] py-[0.5vmax] bg-white border-2 "
                  value={pay}
                  onChange={(e) => {
                    setPay(e.target.value);
                  }}
                >
                  <option value="">Choose</option>
                  <option value="Online">Online</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
              <div className="w-full flex gap-4 items-center justify-center">
                <label className="text-[#00286b] font-semibold">
                  No. of sessions:
                </label>
                <input
                  className=" px-[1vmax] py-[0.5vmax] bg-white border-2"
                  type="number"
                  min={0}
                  value={sessions}
                  onChange={(e) => {
                    setSessions(e.target.value);
                  }}
                />
              </div>
              <div className="w-full flex gap-4 items-center justify-center">
                <label className="text-[#00286b] font-semibold">
                  No. of Days:
                </label>
                <input
                  className=" px-[1vmax] py-[0.5vmax] bg-white border-2"
                  type="number"
                  min={0}
                  value={days}
                  onChange={(e) => {
                    setDays(e.target.value);
                  }}
                />
              </div>
              <div className="w-full flex gap-4 items-center justify-center">
                <label className="text-[#00286b] font-semibold">
                  Price of Package (in Rs.):
                </label>
                <input
                  className=" px-[1vmax] py-[0.5vmax] bg-white border-2"
                  type="number"
                  min={0}
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>

              <input
                type="submit"
                className="py-[0.8vmax] bg-[#00286b] w-3/5 text-white font-semibold cursor-pointer"
              />
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default EditPackage;
