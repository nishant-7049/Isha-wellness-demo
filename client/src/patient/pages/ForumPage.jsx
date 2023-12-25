import React from "react";
import Feed from "../components/Forum/Feed";
import QuestionButton from "../components/Forum/QuestionButton";
import { motion } from "framer-motion";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../store/slices/forumSlice";

const ForumPage = () => {
  const { page, questionsCount } = useSelector((state) => state.forum);
  const dispatch = useDispatch();
  const handlePage = (event, value) => {
    dispatch(setPage(value));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { type: "spring", duration: 0.5, bounce: 0.5 },
      }}
    >
      <div className="mt-[4.5rem] px-[5rem] w-70 py-[2rem]  flex gap-8  flex-col  bg-gray-200 sm:flex-col sm:px-4">
        <Feed />
        <QuestionButton />
        {questionsCount > 6 && (
          <div className="py-[2rem] mx-auto w-fit ">
            <Pagination
              count={Math.ceil(questionsCount / 6)}
              variant="outlined"
              shape="rounded"
              size="large"
              color="primary"
              page={page}
              onChange={handlePage}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ForumPage;
