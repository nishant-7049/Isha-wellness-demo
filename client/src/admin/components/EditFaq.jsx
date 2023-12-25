import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../auth/Loader";
import ErrorAlert from "../../auth/ErrorAlert";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { SiAnswer } from "react-icons/si";
import {
  editFaq,
  getFaqDetail,
  resetIsFaqEdited,
} from "../../store/slices/EditFrontSlice";

const EditFaq = () => {
  const { loading, error, faq, isFaqEdited } = useSelector(
    (state) => state.frontpage
  );
  const dispatch = useDispatch();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const { id } = useParams();
  const submitHandler = (e) => {
    e.preventDefault();
    const options = {
      id,
      question,
      answer,
    };
    dispatch(editFaq(options));
    setQuestion("");
    setAnswer("");
  };
  useEffect(() => {
    if (!faq || id !== faq._id) {
      dispatch(getFaqDetail(id));
    }
    if (faq) {
      setQuestion(faq.question);
      setAnswer(faq.answer);
    }
    if (isFaqEdited) {
      setTimeout(() => {
        dispatch(resetIsFaqEdited());
      }, 5000);
    }
  }, [dispatch, isFaqEdited, faq]);

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
              className="flex flex-col relative top-[2vmax] gap-8 shadow-lg shadow-[#00286b] border-2 p-[2vmax] items-center w-4/5 sm:shadow-none sm:w-[95%] sm:p-[1vmax]"
            >
              <h1 className="text-2xl font-bold border-b-4 text-[#00286b] border-[#00286b] w-3/5 text-center mx-auto">
                Edit FAQ
              </h1>
              <div className="flex gap-4 items-center w-4/5 ">
                <AiOutlineQuestionCircle className="text-xl" />
                <input
                  className=" px-[1vmax] py-[0.5vmax] bg-white border-2 w-full  "
                  type="text"
                  placeholder="Enter Title of Video"
                  value={question}
                  onChange={(e) => {
                    setQuestion(e.target.value);
                  }}
                />
              </div>
              <div className="flex gap-4 items-center w-4/5 ">
                <SiAnswer className="text-xl" />
                <textarea
                  className=" px-[1vmax] py-[0.5vmax] bg-white border-2 w-full "
                  type="text"
                  cols={30}
                  rows={10}
                  placeholder="Paste Video Link"
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
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
      {error && <ErrorAlert message={error} alert={true} />}
      {isFaqEdited && (
        <ErrorAlert message={"FAQ updated successfully."} alert={false} />
      )}
    </>
  );
};

export default EditFaq;
