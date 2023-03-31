import React from "react";
import ForumBox from "./ForemBox";
import ForumPost from "./ForemPost";

const Feed = ({ data }) => {
  return (
    <div className=" bg-gray-200 flex flex-col gap-2 flex-auto ">
      <ForumBox />
      {data
        .slice(0)
        .reverse()
        .map((item) => {
          return <ForumPost key={item._id} item={item} />;
        })}
    </div>
  );
};

export default Feed;
