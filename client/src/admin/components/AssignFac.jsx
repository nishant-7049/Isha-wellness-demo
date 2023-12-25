import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  getBookingDetail,
  resetFacUpdated,
  resetIsUpdated,
  setFacilitator,
} from "../../store/slices/bookingSlice";
import {
  getFacilitators,
  getFac,
  getTher,
} from "../../store/slices/allUserSlice";
import { useParams } from "react-router-dom";

const AssignFac = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [fac, setFac] = useState();
  const [facName, setFacName] = useState();
  const { loading, error, booking, isUpdated } = useSelector(
    (state) => state.booking
  );
  const { fac: faci } = useSelector((state) => state.allUsers);
  const { facilitators } = useSelector((state) => state.allUsers);

  const submitFacilitator = (e) => {
    e.preventDefault();
    const options = {
      bookingID: booking._id,
      userID: fac,
    };
    dispatch(setFacilitator(options));
  };
  useEffect(() => {
    if (booking) {
      if (booking.assignFacilitator) {
        setFac(booking.assignFacilitator);

        if (faci && faci._id == booking.assignFacilitator) {
          setFacName(faci.name);
        }
      }
      if (!facilitators) {
        dispatch(getFacilitators(booking.personal.city));
      }
    }
    if (isUpdated) {
      dispatch(resetIsUpdated());
      dispatch(getBookingDetail(id));
    }
    if (error) {
      dispatch(clearError());
    }
  }, [dispatch, booking, faci, isUpdated, facilitators, error]);

  return (
    <div className="my-[2vmax] w-full">
      <h2 className="text-lg text-[#00286b] font-semibold">
        Assign Facilitator:
      </h2>
      <form className="" onSubmit={submitFacilitator}>
        <div className="flex gap-2 items-center">
          <p>Facilitator: </p>

          <select
            className="bg-white px-[0.4vmax] py-[0.7vmax] border-2"
            onChange={(e) => {
              setFac(e.target.value);
            }}
          >
            <option value={faci}>{facName}</option>
            {facilitators &&
              facilitators.map((the) => {
                return (
                  <option value={the._id} key={the._id}>
                    {the.name}
                  </option>
                );
              })}
          </select>
        </div>
        <input
          className="px-[1vmax] py-[0.4vmax] my-[1vmax] w-3/5 mx-auto bg-[#00286b] text-white font-semibold border-2 border-[#00286b] hover:text-[#00286b] hover:bg-white"
          type="submit"
          value="Assign"
        />
      </form>
    </div>
  );
};

export default AssignFac;
