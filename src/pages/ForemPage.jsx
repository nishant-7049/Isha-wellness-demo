import React from "react";
import Feed from "../components/Forem/Feed";
import QuestionButton from "../components/Forem/QuestionButton";

const ForemPage = () => {
  return (
    <div>
      <h3 className="text-[#f480b1] mt-[4.5rem] pt-4 bg-gray-200 text-center text-2xl">Forem</h3>

      <div className="px-[6rem] w-70 py-[2rem]  flex gap-8 flex-row justify-between bg-gray-200">
        <Feed />
        <QuestionButton />
      </div>
    </div>
  );
};

export default ForemPage;
