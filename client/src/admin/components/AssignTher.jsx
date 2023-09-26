import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  getBookingDetail,
  resetIsUpdated,
  setBookingStatus,
  setTherapist,
} from "../../store/slices/bookingSlice";
import { getTherapists } from "../../store/slices/allUserSlice";
import { useParams } from "react-router-dom";

const AssignTherAndFac = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [ther, setTher] = useState();
  const [therName, setTherName] = useState();
  const { loading, error, booking, isUpdated } = useSelector(
    (state) => state.booking
  );
  const { ther: thera } = useSelector((state) => state.allUsers);
  const { therapists } = useSelector((state) => state.allUsers);
  const submitTherapist = (e) => {
    e.preventDefault();
    const options = {
      bookingID: booking._id,
      userID: ther,
    };

    dispatch(setTherapist(options));
  };
  useEffect(() => {
    if (booking) {
      if (booking.assignTherapist) {
        setTher(booking.assignTherapist);

        if (thera && thera._id == booking.assignTherapist) {
          setTherName(thera.name);
        }
      }
      if (!therapists) {
        dispatch(getTherapists(booking.city));
      }
    }

    if (isUpdated) {
      dispatch(resetIsUpdated());
      dispatch(getBookingDetail(id));
    }
    if (error) {
      dispatch(clearError());
    }
  }, [dispatch, booking, thera, isUpdated, error]);

  return (
    <div className="my-[2vmax]">
      <h2 className="text-lg text-[#00286b] font-semibold">
        Assign Therapist:
      </h2>
      <form className="" onSubmit={submitTherapist}>
        <div className="flex gap-2 items-center">
          <p>Therapist: </p>
          <select
            className="bg-white px-[0.4vmax] py-[0.7vmax] border-2"
            onChange={(e) => {
              setTher(e.target.value);
            }}
          >
            <option value={ther}>{therName}</option>

            {therapists &&
              therapists.map((the) => {
                return (
                  <option key={the._id} value={the._id}>
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

export default AssignTherAndFac;
