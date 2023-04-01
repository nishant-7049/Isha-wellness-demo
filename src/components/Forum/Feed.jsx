import React from "react";
import ForumBox from "./ForumBox";
import ForumPost from "./forumPost";

const Feed = ({ data, setLoading }) => {
  return (
    <div className=" bg-gray-200 flex flex-col gap-2 flex-auto ">
      <ForumBox />
      {data
        .slice(0)
        .reverse()
        .map((item) => {
          return <ForumPost setLoading={setLoading} key={item._id} item={item} />;
        })}
    </div>
  );
};

export default Feed;
