import React, { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const Problem = ({ img, Problem, Diseases }) => {
  const [show, setShow] = useState(false);
  return (
    <div
      className="w-full m-4 mb-0 cursor-pointer"
      onClick={() => setShow(!show)}
    >
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-2">
          {img} <p>{Problem}</p>
        </div>
        <p>{show === true ? <AiOutlineUp /> : <AiOutlineDown />}</p>
      </div>
      <ul className="list-disc pt-4 pl-4">
        {show ? Diseases.map((d) => <li>{d}</li>) : ""}
      </ul>
    </div>
  );
};

export default Problem;
