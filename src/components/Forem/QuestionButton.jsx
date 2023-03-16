import React, { useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const QuestionButton = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const close = <AiFillCloseSquare className="text-2xl text-[#f480b1]" />;
  return (
    <div className="p-8  bg-white h-[10rem] flex flex-col justify-between items-center shadow-xl sticky top-[8rem] bottom-0 md:hidden">
      <p>Click to ask Question</p>
      <button
        className="bg-[#f480b1] p-3 rounded-3xl text-white"
        onClick={() => setIsModelOpen(true)}
      >
        Add Question
      </button>
      <Modal
        classNames=" h-[80vh] w-[80vw]"
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
        <div className="h-[40vh] w-[40vw] flex flex-col justify-around">
          <div className="flex gap-8">
            <h5 className="text-2xl">Add Question</h5>
            <hr />
          </div>
          <div className="flex flex-col">
            <RxAvatar className="text-3xl text-[#f480b1]" />
            <input
              className="bg-white mt-2 p-2"
              type="text"
              placeholder="Start your question with 'What', 'How', 'Why' etc"
            />
          </div>
          <div className="flex flex-col gap-5">
            <button
              className="bg-[#f480b1] rounded-xl  py-1 text-white"
              onClick={() => {
                setIsModelOpen(false);
              }}
            >
              Add Question
            </button>
            <button
              className="bg-[#f480b1] rounded-xl px-3 py-1 text-white"
              onClick={() => {
                setIsModelOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default QuestionButton;
