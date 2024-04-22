import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  resetIsUpdated,
  setTherapist,
} from "../../store/slices/bookingSlice";
import { getTherapists } from "../../store/slices/allUserSlice";

const AssignTherAndFac = () => {
  const dispatch = useDispatch();
  const [ther, setTher] = useState();
  const [therName, setTherName] = useState();
  const { loading, error, booking, isUpdated } = useSelector(
    (state) => state.booking
  );
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
      if (booking?.assignTherapist) {
        setTher(booking?.assignTherapist[0]?._id);

        if (booking?.assignTherapist) {
          setTherName(booking?.assignTherapist[0]?.name);
        }
      }
      if (!therapists) {
        dispatch(getTherapists(booking?.personal?.city));
      }
    }

    if (isUpdated) {
      dispatch(resetIsUpdated());
    }
    if (error) {
      dispatch(clearError());
    }
  }, [dispatch, booking, isUpdated, error]);

  return (
    <div className="my-[1vmax] w-full flex flex-col items-center">
      <h2 className="text-lg text-[#00286b] font-semibold">Therapist:</h2>
      <form className="flex flex-col items-center" onSubmit={submitTherapist}>
        <select
          className="bg-white p-2 border-2"
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
        <input
          className="p-1 my-[1vmax] w-3/5 mx-auto bg-[#00286b] text-white font-semibold border-2 border-[#00286b] hover:text-[#00286b] hover:bg-white"
          type="submit"
          value="Assign"
        />
      </form>
    </div>
  );
};

export default AssignTherAndFac;
