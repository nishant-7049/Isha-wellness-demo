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
      if (booking?.assignFacilitator && booking?.assignFacilitator[0]) {
        setFac(booking?.assignFacilitator[0]._id);

        if (booking?.assignFacilitator) {
          setFacName(booking?.assignFacilitator[0]?.name);
        }
      }
      if (!facilitators) {
        dispatch(getFacilitators(booking?.personal?.city));
      }
    }
    if (isUpdated) {
      dispatch(resetIsUpdated());
      dispatch(getBookingDetail(id));
    }
    if (error) {
      dispatch(clearError());
    }
  }, [dispatch, booking, isUpdated, facilitators, error]);

  return (
    <div className="my-[1vmax] w-full flex flex-col items-center">
      <h2 className="text-lg text-[#00286b] font-semibold">Facilitator:</h2>
      <form
        className=" flex flex-col items-center"
        onSubmit={submitFacilitator}
      >
        <select
          className="bg-white p-2 border-2"
          onChange={(e) => {
            setFac(e.target.value);
          }}
        >
          <option value={fac}>{facName}</option>
          {facilitators &&
            facilitators.map((the) => {
              return (
                <option value={the._id} key={the._id}>
                  {the.name}
                </option>
              );
            })}
        </select>
        <input
          className="p-1 my-[1vmax] w-3/5 mx-auto bg-[#00286b] text-white font-semibold border-2 border-[#00286b] hover:text-[#00286b] hover:bg-white"
          type="submit"
          value="Assign"
        />
      </form>
    </div>
  );
};

export default AssignFac;
