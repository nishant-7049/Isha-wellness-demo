import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { getBlogDetail } from "../../store/slices/EditFrontSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../auth/Loader";

function SingleBlog() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { blog, loading } = useSelector((state) => state.frontpage);
  let currDate;
  if (blog) {
    const date = new Date(blog.createdAt);
    currDate = `${date.getHours()}h${date.getMinutes()}m-${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }
  useEffect(() => {
    if (!blog || blog._id !== id) {
      dispatch(getBlogDetail(id));
    }
  }, [dispatch]);

  return (
    <>
      {loading || !blog ? (
        <Loader />
      ) : (
        <motion.div
          className="mt-[4.5rem]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className=" mx-20 mt-20 gap-5">
            <div className="float-left w-[40rem] object-contain mr-8 mb-8">
              <img src={blog.image.url} alt="" />
            </div>
            <div className=" mb-[25rem] ">
              <h2 className="text-[2rem]  font-bold text-[#00286b]">
                {blog.name}
              </h2>
              <p className="mb-2 text-sm text-gray-400">
                {blog.createdBy} || {currDate}
              </p>
              <p className="text-justify">{blog.description}</p>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default SingleBlog;
