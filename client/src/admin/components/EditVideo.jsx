import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../auth/Loader";
import ErrorAlert from "../../auth/ErrorAlert";
import { MdTitle } from "react-icons/md";
import { BiLinkExternal } from "react-icons/bi";
import {
  editVideo,
  getVideoDetail,
  resetIsVideoEdited,
} from "../../store/slices/EditFrontSlice";

const EditVideo = () => {
  const { id } = useParams();
  const { loading, error, video, isVideoEdited } = useSelector(
    (state) => state.frontpage
  );
  console.log(id);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const options = {
      id,
      title,
      link,
    };
    dispatch(editVideo(options));
  };
  useEffect(() => {
    if (!video || id !== video._id) {
      dispatch(getVideoDetail(id));
    }
    if (video) {
      setTitle(video.title);
      setLink(video.link);
    }
    if (isVideoEdited) {
      setTimeout(() => {
        dispatch(resetIsVideoEdited());
      }, 5000);
    }
  }, [dispatch, isVideoEdited, video]);

  return (
    <>
      <div className="flex sm:flex-col">
        <Sidebar />
        {loading ? (
          <Loader />
        ) : (
          <div className="w-full h-[100vh] flex justify-center items-center sm:h-fit">
            <form
              onSubmit={submitHandler}
              className="w-2/5  flex flex-col  relative top-[2vmax] gap-8 shadow-lg shadow-[#00286b] border-2 p-[2vmax] items-center sm:static sm:my-8 sm:w-[95%]"
            >
              <h1 className="text-2xl font-bold border-b-4 text-[#00286b] border-[#00286b] w-3/5 text-center mx-auto">
                Edit Video
              </h1>
              <div className="flex gap-4 items-center w-3/4">
                <MdTitle className="text-xl" />
                <input
                  className="text-lg px-[1vmax] py-[0.5vmax] bg-white border-2 w-full"
                  type="text"
                  placeholder="Enter Title of Video"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div className="flex gap-4 items-center w-3/4">
                <BiLinkExternal className="text-xl" />
                <input
                  className="text-lg px-[1vmax] py-[0.5vmax] bg-white border-2 w-full "
                  type="text"
                  placeholder="Paste Video Link"
                  value={link}
                  onChange={(e) => {
                    setLink(e.target.value);
                  }}
                />
              </div>

              <input
                type="submit"
                className="py-[0.8vmax] bg-[#00286b] w-3/5 text-white font-semibold cursor-pointer hover:text-[#00286b] border-2 border-[#00286b] hover:bg-white"
              />
            </form>
          </div>
        )}
      </div>
      {error && <ErrorAlert message={error} alert={true} />}
      {isVideoEdited && (
        <ErrorAlert message={"Video updated successfully."} alert={false} />
      )}
    </>
  );
};

export default EditVideo;
