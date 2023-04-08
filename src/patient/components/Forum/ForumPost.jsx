import React, { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { AiFillCloseSquare } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import Modal from "react-responsive-modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForumPost = ({ item, setLoading }) => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [answerState, setAnswerState] = useState("");
  const close = <AiFillCloseSquare className="text-2xl text-[#00286b]" />;
  const navigate = useNavigate();

  // console.log(item)
  const postAnswer = async (e) => {
    e.preventDefault();
    if (
      !localStorage.getItem("authToken") ||
      !localStorage.getItem("userName")
    ) {
      window.alert("Please Login or Register to post a question !");
    } else {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      await axios
        .post(
          "http://isha-server.onrender.com/api/forum/postAnswer",
          {
            user: localStorage.getItem("userName"),
            questionId: item._id,
            answer: answerState,
          },
          config
        )
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
          window.alert("Your session has been expired, Please login !");
          navigate("/login");
          localStorage.clear();
        });
      setIsModelOpen(false);
      setLoading(true);
    }
  };
  return (
    <div className=" py-3 px-5 mb-[2rem]  bg-white shadow-lg flex flex-col gap-4">
      <div className="flex gap-4 items-center ">
        <RxAvatar className="text-3xl text-[#00286b]" />
        <p className="text-xs text-[#00286b]">{item.user}</p>
        <small className="text-xs text-[#00286b]">
          {item.timePosted.substring(0, 10)}
        </small>
      </div>
      <div className="flex justify-between">
        <div className="flex justify-between w-[100%] gap-4 mx-12 ">
          <p className="w-[100%]">{item.question}</p>
          <BiCommentDetail
            className="text-xl text-[#00286b]"
            onClick={() => {
              setIsModelOpen(true);
            }}
          />
        </div>
        <Modal
          classNames=" h-[80vh] w-[80vw] "
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
          <form onSubmit={postAnswer}>
            <div className="h-[500px] w-[700px] flex flex-col justify-around sm:h-[300px] sm:w-[280px] ">
              <h6 className="text-2xl border-b border-1 border-[#6d6d6d]">
                Add Answer
              </h6>
              <div className="flex flex-col gap-6 items-center justify-center">
                <RxAvatar className="text-9xl text-[#00286b] sm:text-5xl" />
                <textarea
                  onChange={(e) => {
                    setAnswerState(e.target.value);
                  }}
                  className="mt-2 bg-white w-[100%] p-2 sm:mt-0"
                  type="text"
                  placeholder="Type your Answer here..."
                  maxLength="100"
                />
              </div>
              <div className="flex flex-col gap-5 items-center sm:flex-row sm:gap-3 sm:text-sm">
                <button className="w-[50%] bg-[#00286b] rounded-xl  py-2 text-white">
                  Add Answer
                </button>
                <button
                  className="w-[50%] bg-[#00286b] rounded-xl  py-2 text-white"
                  onClick={() => {
                    setIsModelOpen(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </Modal>
      </div>
      <p className="text-xs text-gray-500">Answers: {item.allAnswers.length}</p>
      <hr />
      {item.allAnswers.map((answers) => {
        return (
          <div key={answers._id} className=" answer px-10 flex flex-col gap-4">
            <div className="flex gap-4 items-center ">
              <RxAvatar className="text-3xl text-[#00286b]" />
              <p className="text-xs text-[#00286b]">{answers.user}</p>
              <small className="text-xs text-[#00286b]">
                {answers.timePosted.substring(0, 10)}
              </small>
            </div>
            <p className="ml-12">{answers.answer}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ForumPost;
