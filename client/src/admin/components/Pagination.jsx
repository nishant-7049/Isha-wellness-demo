import React from "react";

const Pagination = ({ currPage, totalItem, setPage, itemsPerPage }) => {
  const totalPage = Math.ceil(totalItem / itemsPerPage);
  const getPrevPage = () => {
    if (currPage > 1) {
      setPage(currPage - 1);
    } else {
      setPage(totalPage);
    }
  };
  const getNextPage = () => {
    if (currPage < totalPage) {
      setPage(currPage + 1);
    } else {
      setPage(1);
    }
  };
  return (
    <div className="flex items-center gap-2 justify-center">
      <button
        onClick={() => {
          getPrevPage();
        }}
        className="px-[1vmax] py-[0.6vmax] bg-[#00286b] text-white font-semibold hover:text-[#00286b] border-2 border-[#00286b] hover:bg-white"
      >
        Prev
      </button>
      <p>
        {currPage} of {totalPage}
      </p>
      <button
        onClick={() => {
          getNextPage();
        }}
        className="px-[1vmax] py-[0.6vmax] bg-[#00286b] text-white font-semibold hover:text-[#00286b] border-2 border-[#00286b] hover:bg-white"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
