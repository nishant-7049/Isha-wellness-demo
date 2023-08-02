import React from "react";
import { Link } from "react-router-dom";
import { deleteVideo } from "../../store/slices/EditFrontSlice";
import { useDispatch } from "react-redux";

const VideoCard = ({ vid }) => {
  const dispatch = useDispatch();
  return (
    <div className="min-w-[40%] px-[2vmax] py-[1vmax] shadow-lg sm:w-full">
      <div>
        <iframe
          className="w-full"
          src={vid.link}
          title="YouTube video player"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <p>{vid.title}</p>
      <div className="flex justify-end gap-2">
        <Link
          to={`/admin/video/edit/${vid._id}`}
          className="px-[1vmax] py-[0.5vmax] text-white font-semibold bg-[#00286b] hover:text-[#00286b] hover:bg-white border-2 border-[#00286b]"
        >
          Edit
        </Link>
        <button
          onClick={() => {
            dispatch(deleteVideo(vid._id));
          }}
          className="px-[1vmax] py-[0.5vmax] text-white font-semibold bg-red-700 hover:text-red-700 hover:bg-white border-2 border-"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
