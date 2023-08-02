import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { AiOutlineUser } from "react-icons/ai";
import { BiClinic, BiCommentDetail } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleTesti,
  editTesti,
  updateReset,
} from "../../store/slices/testiSlice";
import Loader from "../../auth/Loader";
import ErrorAlert from "../../auth/ErrorAlert";

const EditTestimonial = () => {
  const { testiError, testiLoading, testimonial, isUpdated } = useSelector(
    (state) => state.testimonial
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [testi, setTesti] = useState("");
  const [cluster, setCluster] = useState("");
  const [imgPrev, setImgPrev] = useState("/user.png");
  const [image, setImage] = useState();
  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImgPrev(reader.result);
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.set("name", name);
    fd.set("cluster", cluster);
    fd.set("testimonial", testi);
    if (image) {
      fd.set("image", image);
    }
    const options = {
      id,
      formdata: fd,
    };
    dispatch(editTesti(options));
  };
  useEffect(() => {
    dispatch(getSingleTesti(id));

    if (isUpdated) {
      setTimeout(() => {
        dispatch(updateReset());
      }, 5000);
    }
  }, [dispatch, isUpdated]);
  useEffect(() => {
    if (testimonial) {
      setName(testimonial.name);
      setTesti(testimonial.testimonial);
      setCluster(testimonial.cluster);
    }
  }, [testimonial]);
  return (
    <>
      <div className="flex sm:flex-col ">
        <Sidebar />
        {testiLoading ? (
          <Loader />
        ) : (
          <div className="w-full h-[100vh] flex justify-center items-center ">
            <form
              onSubmit={submitHandler}
              className="w-3/4 flex flex-col relative top-[2vmax] gap-8 shadow-lg shadow-[#00286b] border-2 p-[2vmax] items-center sm:w-[95%] sm:p-[1vmax] sm:shadow-none"
            >
              <h1 className="text-2xl font-bold border-b-4 text-[#00286b] border-[#00286b] w-3/5 text-center mx-auto">
                Edit Testimonial
              </h1>
              <div className="flex gap-4 items-center w-4/5">
                <AiOutlineUser className="text-xl" />
                <input
                  className="text-lg px-[1vmax] py-[0.5vmax] bg-white border-2 w-full "
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="flex gap-4 items-center w-4/5 ">
                <BiCommentDetail className="text-xl" />
                <textarea
                  className="text-lg px-[1vmax] py-[0.5vmax] bg-white border-2 w-full h-[20vh] "
                  type="text"
                  value={testi}
                  onChange={(e) => {
                    setTesti(e.target.value);
                  }}
                />
              </div>
              <div className="flex gap-4 items-center ">
                <BiClinic className="text-xl" />
                <select
                  className="text-lg px-[1vmax] py-[0.5vmax] bg-white border-2 "
                  onChange={(e) => {
                    setCluster(e.target.value);
                  }}
                  value={cluster}
                >
                  {" "}
                  w-4/5
                  <option value="Ratlam">Ratlam</option>
                  <option value="Indore">Indore</option>
                </select>
              </div>
              <div className="flex gap-2 items-center justify-center ">
                <img src={imgPrev} className="w-[3vmax]" />
                <input
                  type="file"
                  accept="image/*"
                  className="border-2 w-3/5 p-[0.8vmax] "
                  onChange={imageHandler}
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
      {testiError && <ErrorAlert message={testiError} alert={true} />}
      {isUpdated && (
        <ErrorAlert
          message={"Testimonial updated successfully."}
          alert={false}
        />
      )}
    </>
  );
};

export default EditTestimonial;
