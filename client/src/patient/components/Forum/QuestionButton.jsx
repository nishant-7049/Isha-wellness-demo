import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { useNavigate } from "react-router-dom";
import {
  createQuestion,
  getAllQuestions,
} from "../../../store/slices/forumSlice";

const QuestionButton = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [questionState, setQuestionState] = useState("");
  const close = <AiFillCloseSquare className="text-2xl text-[#00286b]" />;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isQuestionCreated } = useSelector((state) => state.forum);

  const [ques, setQues] = useState("");
  const submitQuestion = (e) => {
    e.preventDefault();
    const options = {
      question: ques,
    };
    dispatch(createQuestion(options));
  };
  return (
    <>
      <button
        className="shadow-lg bg-[#00286b] flex items-center  justify-center gap-2 py-3 p-1 rounded-full text-white  h-fit w-[10rem] fixed right-8 bottom-8 sm:bottom-8"
        onClick={() => setIsModelOpen(true)}
      >
        <span className="text-xl text-extrabold">+</span> <span>Question</span>
      </button>
      <Modal
        open={isModelOpen}
        closeIcon={close}
        onClose={() => setIsModelOpen(false)}
        closeOnEsccenter
        closeOnOverlayClick={false}
        styles={{
          overlay: {
            height: "auto",
          },
        }}
      >
        <form onSubmit={submitQuestion}>
          <div className="h-[500px] w-[700px] flex flex-col justify-around sm:h-[300px] sm:w-[280px] ">
            <h5 className="text-2xl border-b border-1 border-[#6d6d6d]">
              Add Question
            </h5>
            <div className="flex flex-col gap-4 items-center justify-center">
              <RxAvatar className="text-9xl text-[#00286b] sm:text-5xl " />
              <textarea
                onChange={(e) => {
                  setQues(e.target.value);
                }}
                className="mt-2 bg-white w-[100%] p-2 sm:mt-0"
                type="text"
                placeholder="Type your Query here..."
                maxLength="100"
              />
            </div>
            <div className="flex flex-col gap-5 items-center sm:flex-row sm:gap-3 sm:text-sm">
              <input
                type="submit"
                value="submit"
                className="w-[50%] bg-[#00286b] rounded-xl  py-2 text-white"
                onClick={() => {
                  setIsModelOpen(false);
                }}
              />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default QuestionButton;
