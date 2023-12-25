import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../auth/Loader";
import ErrorAlert from "../../auth/ErrorAlert";
import { AiOutlineUser } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { editBlog, getBlogDetail } from "../../store/slices/EditFrontSlice";

const EditBlog = () => {
  const { loading, error, faq, isFaqEdited } = useSelector(
    (state) => state.frontpage
  );
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePrev, setBlogImagePrev] = useState("");

  const { id } = useParams();

  const blogImageHandle = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setBlogImage(reader.result);
        setBlogImagePrev(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const { isBlogEdited, blog } = useSelector((state) => state.frontpage);
  const submitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.set("name", title);
    formdata.set("description", description);
    if (blogImage) {
      formdata.set("image", blogImage);
    }
    const options = {
      id,
      formdata,
    };
    dispatch(editBlog(options));
  };

  useEffect(() => {
    if (!blog || id != blog._id) {
      dispatch(getBlogDetail(id));
    }
    if (blog) {
      setTitle(blog.name);
      setDescription(blog.description);
      if (blog.image) {
        setBlogImagePrev(blog.image.url);
      }
    }
  }, [dispatch, blog]);

  return (
    <>
      <div className="flex sm:flex-col">
        <Sidebar />
        {loading ? (
          <Loader />
        ) : (
          <div className="w-full h-[100vh] flex justify-center items-center ">
            <form
              onSubmit={submitHandler}
              className="flex flex-col relative top-[2vmax] gap-8 shadow-lg shadow-[#00286b] border-2 p-[2vmax] items-center w-4/5 sm:shadow-none sm:w-[95%] sm:p-[1vmax]"
            >
              <h1 className="text-2xl font-bold border-b-4 text-[#00286b] border-[#00286b] w-3/5 text-center mx-auto">
                Edit Blog
              </h1>
              <div className="flex gap-4 items-center w-4/5 ">
                <AiOutlineUser className="text-xl" />
                <input
                  className=" px-[1vmax] py-[0.5vmax] bg-white border-2 w-full  "
                  type="text"
                  placeholder="Enter Title of Video"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div className="flex gap-4 items-center w-4/5 ">
                <BiCommentDetail className="text-xl" />
                <textarea
                  className=" px-[1vmax] py-[0.5vmax] bg-white border-2 w-full "
                  type="text"
                  cols={30}
                  rows={10}
                  placeholder="Paste Video Link"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className="flex  items-center gap-4">
                {blogImagePrev && (
                  <img src={blogImagePrev} alt="img" className=" w-[3vmax]" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={blogImageHandle}
                  className="w-[10vmax] border-2 p-[0.5vmax] bg-[#e5e7eb]"
                />
              </div>

              <input
                type="submit"
                className="py-[0.8vmax] bg-[#00286b] w-3/5 text-white font-semibold cursor-pointer"
              />
            </form>
          </div>
        )}
      </div>
      {error && <ErrorAlert message={error} alert={true} />}
      {isFaqEdited && (
        <ErrorAlert message={"FAQ updated successfully."} alert={false} />
      )}
    </>
  );
};

export default EditBlog;
