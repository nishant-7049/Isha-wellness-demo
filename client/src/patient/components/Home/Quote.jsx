import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuote } from "../../../store/slices/EditFrontSlice";

const Quote = () => {
  const dispatch = useDispatch();
  const { quote } = useSelector((state) => state.frontpage);
  useEffect(() => {
    dispatch(getQuote());
  }, [dispatch]);

  return (
    <div className="text-center pt-8 ">
      <h2 className="text-3xl text-center mx-0 pb-4  font-bold text-[#00286b]">
        Quote
      </h2>
      <p className=" pb-8 text-lg text-[#635858] m-auto tracking-wide leading-7 sm:text-sm sm:w-full sm:px-8">
        {quote && quote.quote}
      </p>

      <hr />
    </div>
  );
};

export default Quote;
