import React, { useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { AiFillCloseSquare } from "react-icons/ai";
import { BiCommentDetail, BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import Modal from "react-responsive-modal";
import { useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  createAnswer,
  deleteQuestion,
  editQuestion,
  getAnswers,
  resetAnswers,
} from "../../../store/slices/forumSlice";

const ForumPost = ({ item }) => {
  const dispatch = useDispatch();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const close = <AiFillCloseSquare className="text-2xl text-[#00286b]" />;
  const navigate = useNavigate();

  const questionTime = new Date(item.createdAt);
  const editedTime = new Date(item.editedAt);

  const editedAt = `${editedTime.getDate()}/${
    editedTime.getMonth() + 1
  }/${editedTime.getFullYear()} ${editedTime.getHours()}hr ${editedTime.getMinutes()}min`;
  const createdAt = `${questionTime.getDate()}/${
    questionTime.getMonth() + 1
  }/${questionTime.getFullYear()} ${questionTime.getHours()}hr ${questionTime.getMinutes()}min`;

  const { user } = useSelector((state) => state.user);

  const [toggle, setToggle] = useState(false);
  const [toggleAnswers, setToggleAnswers] = useState(false);
  const [isEditingQuestion, setIsEditingQuestion] = useState(false);

  const [editedQuestion, setEditedQuestion] = useState("");

  const submitEditedQuestion = (e) => {
    e.preventDefault();
    const options = {
      id: item._id,
      question: editedQuestion,
    };
    dispatch(editQuestion(options));
  };

  const { answers: ans } = useSelector((state) => state.forum);
  const [answers, setAnswers] = useState([]);
  const [answerPage, setAnswerPage] = useState(1);
  const [answer, setAnswer] = useState("");

  const submitAnswer = (e) => {
    e.preventDefault();
    const options = {
      questionId: item._id,
      answer,
    };
    dispatch(createAnswer(options));
    setAnswers([]);
    setAnswerPage(1);
  };

  useEffect(() => {
    if (ans && ans[0] && ans[0].questionId == item._id) {
      for (let a of ans) {
        setAnswers((prevArray) => [...prevArray, a]);
      }
      dispatch(resetAnswers());
    }
  }, [ans]);
  return (
    <div className=" py-3 px-5   bg-white shadow-lg flex flex-col gap-4 relative">
      <div className="flex gap-4 items-center ">
        {item.userDetails && item.userDetails.avatar ? (
          <img
            className="w-[2rem] rounded-full"
            src={item.userDetails.avatar.url}
          />
        ) : (
          <RxAvatar className="text-[2rem] text-[#00286b]" />
        )}
        <p className="text-sm font-bold text-[#00286b]">
          {item.userDetails && item.userDetails.name}
        </p>
        <small className=" text-[10px] text-[#00286b]">{createdAt}</small>
        {item.editedAt && (
          <small className="text-[10px] text-[#00286b]">
            Edited At: {editedAt}
          </small>
        )}
        {(item.user == user._id || user.role == "admin") && (
          <BsThreeDots
            onClick={() => {
              setToggle(!toggle);
            }}
            className="text-[#00286b] hover:bg-gray-300 rounded-full sm:text-2xl"
          />
        )}
        {toggle && (
          <div className="shadow-md absolute top-4  bg-white  p-4 ">
            <div
              className="text-gray-400 font-bold cursor-pointer"
              onClick={() => {
                setToggle(false);
                setIsEditingQuestion(true);
              }}
            >
              Edit
            </div>
            <div
              className="text-red-800 font-bold cursor-pointer"
              onClick={() => {
                dispatch(deleteQuestion(item._id));
              }}
            >
              Delete
            </div>
            <div
              className="text-gray-400 font-bold cursor-pointer"
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              Close
            </div>
          </div>
        )}
        {isEditingQuestion && (
          <>
            {item.isEdited ? (
              <div className="flex flex-col justify-center items-center  absolute top-4 shadow-md bg-white  p-4">
                <p className="font-bold text-gray-400">
                  Question cannot be edited again.
                </p>
                <button
                  className="font-bold text-gray-400"
                  onClick={() => {
                    setIsEditingQuestion(false);
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                className="shadow-md absolute top-4  bg-white  p-4 "
                onSubmit={submitEditedQuestion}
              >
                <p>You can only enter Edited Question once.</p>
                <input
                  className="bg-white border-2 p-1"
                  type="text"
                  value={editedQuestion}
                  onChange={(e) => {
                    setEditedQuestion(e.target.value);
                  }}
                  placeholder="Type Edited Question."
                />
                <div className="flex gap-2 justify-end mt-2">
                  <input
                    className="text-[#00286b] font-bold"
                    type="submit"
                    value="Edit"
                  />
                  <button
                    className="font-bold text-gray-400"
                    onClick={() => {
                      setIsEditingQuestion(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
      <div className="flex justify-between">
        <div className="flex justify-between items-center w-[100%] gap-4 mx-12 ">
          <div>
            <p className="w-[100%]">{item.question}</p>
            {item.editedQuestion && (
              <p className="w-[100%]">{item.editedQuestion}</p>
            )}
          </div>
          <BiCommentDetail
            className="text-xl text-[#00286b] w-[20%]"
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
          <form onSubmit={submitAnswer}>
            <div className="h-[500px] w-[700px] flex flex-col justify-around sm:h-[300px] sm:w-[280px] ">
              <h6 className="text-2xl border-b border-1 border-[#6d6d6d]">
                Add Answer
              </h6>
              <div className="flex flex-col gap-6 items-center justify-center">
                <RxAvatar className="text-9xl text-[#00286b] sm:text-5xl" />
                <textarea
                  onChange={(e) => {
                    setAnswer(e.target.value);
                  }}
                  value={answer}
                  className="mt-2 bg-white w-[100%] p-2 sm:mt-0"
                  type="text"
                  placeholder="Type your Answer here..."
                  maxLength="100"
                />
              </div>
              <div className="flex flex-col gap-5 items-center sm:flex-row sm:gap-3 sm:text-sm">
                <input
                  type="submit"
                  value="Add Answer"
                  className="w-[50%] bg-[#00286b] rounded-xl  py-2 text-white"
                  onClick={() => {
                    setIsModelOpen(false);
                  }}
                />
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
      {item.answersCount > 0 && (
        <button
          className="w-fit text-xs  items-center bg-[#00276b23] p-1 rounded-lg"
          onClick={() => {
            if (!toggleAnswers && answers.length == 0) {
              const options = {
                page: answerPage,
                id: item._id,
              };
              dispatch(getAnswers(options));
              setAnswerPage(answerPage + 1);
            }
            setToggleAnswers(!toggleAnswers);
          }}
        >
          {toggleAnswers ? (
            <div className="flex gap-2">
              <p>Hide Replies </p>
              <BiUpArrowAlt className="text-sm" />
            </div>
          ) : (
            <div className="flex gap-2">
              <p>Show Replies </p>
              <BiDownArrowAlt className="text-sm" />
            </div>
          )}
        </button>
      )}
      <p
        className={`text-xs text-gray-500 ${
          toggleAnswers && "border-b-2 pb-2"
        }`}
      >
        No. of Replies: {item.answersCount}
      </p>

      {toggleAnswers && (
        <div className="ml-10">
          {answers &&
            answers.map((answers) => {
              const createdDate = new Date(answers.createdAt);
              const createdAt = `${createdDate.getDate()}/${
                createdDate.getMonth() + 1
              }/${createdDate.getFullYear()} ${createdDate.getHours()}hr ${createdDate.getMinutes()}min`;
              return (
                <div
                  key={answers._id}
                  className=" answer py-2 flex flex-col gap-4 my-2 border-b-2 "
                >
                  <div className="flex gap-4 items-center ">
                    {answers.userDetails.avatar ? (
                      <img
                        className="w-[2rem] rounded-full"
                        src={answers.userDetails.avatar.url}
                      />
                    ) : (
                      <RxAvatar className="text-[2rem] text-[#00286b]" />
                    )}
                    <p className="text-sm font-bold text-[#00286b]">
                      {answers.userDetails.name}
                    </p>
                    <small className="text-xs text-[#00286b]">
                      {createdAt}
                    </small>
                  </div>
                  <p className="ml-12">{answers.answer}</p>
                </div>
              );
            })}
          {answers.length < item.answersCount && (
            <button
              className="w-fit text-xs  items-center bg-[#00276b23] p-1 rounded-lg"
              onClick={() => {
                const options = {
                  page: answerPage,
                  id: item._id,
                };
                dispatch(getAnswers(options));
                setAnswerPage(answerPage + 1);
              }}
            >
              <div className="flex gap-2">
                <p>Show More </p>
                <BiDownArrowAlt className="text-sm" />
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ForumPost;
