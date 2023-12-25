import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setOutcomeReasonForFacilitator,
  setOutcomeReasonForThearpist,
} from "../../store/slices/sessionSlice";

const OutcomeFormTherapist = () => {
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const { user } = useSelector((state) => state.user);
  const submitOutcomeForm = (e) => {
    e.preventDefault();
    const options = {
      sessionId,
      data: {
        outcomeReason: reason == "Other Reason" ? otherReason : reason,
      },
    };
    user.role == "therapist" && dispatch(setOutcomeReasonForThearpist(options));
    user.role == "facilitator" &&
      dispatch(setOutcomeReasonForFacilitator(options));
    user.role == "therapist" && navigate("/therapist/orders");
    user.role == "facilitator" && navigate("/facilitator/orders");
  };
  return (
    <div className="w-full h-[90vh] mt-20 flex justify-center items-center bg-gray-200">
      <form
        className="bg-white px-8 py-8 flex flex-col gap-8"
        onSubmit={submitOutcomeForm}
      >
        <h1 className="text-[#00286b] font-bold text-2xl text-center border-b-2 border-[#00286b] w-fit mx-auto">
          Outcome Form
        </h1>
        <div className="flex flex-col gap-1">
          <label className="text-[#00286b] font-semibold">
            Reason of not attending sessions:
          </label>
          <select
            className="bg-white px-4 py-2 border-2"
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
            }}
            required
          >
            <option value="">Choose</option>
            <option value="Cured">Cured</option>
            <option value="Other Reason">Other Reason</option>
          </select>
        </div>
        {reason == "Other Reason" && (
          <div className="flex flex-col gap-1">
            <label className="text-[#00286b] font-semibold">
              Other Reason:
            </label>
            <input
              className="bg-white px-4 py-2 border-2"
              type="text"
              value={otherReason}
              placeholder="Enter Other reason of Dropout."
              onChange={(e) => {
                setOtherReason(e.target.value);
              }}
              required
              maxLength={200}
            />
          </div>
        )}
        <input
          type="submit"
          className="px-1 py-2 border-2 border-[#00286b] bg-[#00286b] text-white font-semibold hover:bg-white hover:text-[#00286b]"
        />
      </form>
    </div>
  );
};

export default OutcomeFormTherapist;
