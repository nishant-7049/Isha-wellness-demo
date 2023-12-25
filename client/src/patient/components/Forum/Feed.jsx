import React, { useEffect } from "react";
import ForumBox from "./ForumBox";
import ForumPost from "./ForumPost";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllQuestions,
  resetIsAnswerCreated,
  resetIsQuestionCreated,
  resetIsQuestionDeleted,
  resetIsQuestionEdited,
} from "../../../store/slices/forumSlice";
import Loader from "../../../auth/Loader";

const Feed = () => {
  const dispatch = useDispatch();
  const {
    loadingQuestions,
    questions,
    isQuestionCreated,
    isQuestionDeleted,
    isQuestionEdited,
    isAnswerCreated,
  } = useSelector((state) => state.forum);

  const { keyword } = useSelector((state) => state.forum);
  useEffect(() => {
    if (
      !questions ||
      isQuestionCreated ||
      isQuestionDeleted ||
      isQuestionEdited ||
      isAnswerCreated
    ) {
      dispatch(getAllQuestions({ keyword: "", page: 1 }));
    }
    if (isQuestionCreated) {
      dispatch(resetIsQuestionCreated());
    }
    if (isQuestionDeleted) {
      dispatch(resetIsQuestionDeleted());
    }
    if (isQuestionEdited) {
      dispatch(resetIsQuestionEdited());
    }
    if (isAnswerCreated) {
      dispatch(resetIsAnswerCreated());
    }
  }, [
    dispatch,
    isQuestionCreated,
    isQuestionDeleted,
    isQuestionEdited,
    isAnswerCreated,
  ]);
  return (
    <>
      {loadingQuestions ? (
        <Loader />
      ) : (
        <div className=" bg-gray-200 flex flex-col gap-2 flex-auto ">
          <ForumBox />
          {keyword && (
            <p className="my-2 ml-2 text-gray-500 font-semibold ">
              Search results for '{keyword}'
            </p>
          )}
          {questions &&
            questions.map((item) => {
              return <ForumPost key={item._id} item={item} />;
            })}
        </div>
      )}
    </>
  );
};

export default Feed;
