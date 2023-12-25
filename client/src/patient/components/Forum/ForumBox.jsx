import React, { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { BiSearchAlt } from "react-icons/bi";
import {
  getAllQuestions,
  resetIsKeywordUpdated,
  resetIsPageUpdated,
  setKeyword,
  setPage,
} from "../../../store/slices/forumSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const ForumBox = () => {
  const dispatch = useDispatch();
  const { page, keyword, isPageUpdated, isKeywordUpdated } = useSelector(
    (state) => state.forum
  );
  const [search, setSearch] = useState("");
  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(setKeyword(search));
  };
  useEffect(() => {
    if (isKeywordUpdated) {
      const query = {
        keyword,
        page,
      };
      dispatch(getAllQuestions(query));
      dispatch(resetIsKeywordUpdated());
      page != 1 && dispatch(setPage(1));
    }
  }, [isKeywordUpdated]);

  useEffect(() => {
    if (isPageUpdated) {
      const query = {
        keyword,
        page,
      };
      dispatch(getAllQuestions(query));
      dispatch(resetIsPageUpdated());
    }
  }, [isPageUpdated]);

  return (
    <div className="flex gap-8 sm:flex-col-reverse sm:gap-2">
      <div className="flex gap-4 items-center bg-white shadow-lg py-3 px-5 w-full">
        <RxAvatar className="text-[2rem] text-[#00286b]" />
        <p className="text-[#9b9b9b]">Discuss your problems with everyone...</p>
      </div>
      <form className=" border-2 flex w-fit shadow-lg">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="bg-white p-[0.4vmax]"
          placeholder="Search"
        />
        <button
          className="bg-[#00286b] px-[1vmax] text-white hover:bg-white hover:text-[#00286b]"
          onClick={searchHandler}
        >
          <BiSearchAlt className="text-xl" />
        </button>
      </form>
    </div>
  );
};

export default ForumBox;
