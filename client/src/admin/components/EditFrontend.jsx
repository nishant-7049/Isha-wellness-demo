import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editQuote,
  clearError,
  resetIsUpdated,
  createVideo,
  getAllVideos,
  resetIsVideoDeleted,
  createFaq,
  getFaq,
  deleteFaq,
  resetIsFaqCreated,
  resetIsFaqDeleted,
  createBlog,
  getAllBlogs,
  resetIsBlogDeleted,
  resetBlog,
  deleteBlog,
} from "../../store/slices/EditFrontSlice";
import ErrorAlert from "../../auth/ErrorAlert";
import Loader from "../../auth/Loader";
import { RiCloseCircleFill } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { BiClinic, BiCommentDetail } from "react-icons/bi";
import {
  createTesti,
  clearTestiError,
  getTesti,
  deleteReset,
  clearTesti,
} from "../../store/slices/testiSlice";
import Sidebar from "./Sidebar";
import TestiCard from "./TestiCard";
import Pagination from "./Pagination";
import VideoCard from "./VideoCard";
import { DataGrid } from "@mui/x-data-grid";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import "./css/pagination.css";

const EditFrontend = () => {
  //Quote
  const [quoteText, setQuoteText] = useState("");

  const dispatch = useDispatch();
  const submitQuote = (e) => {
    e.preventDefault();
    dispatch(editQuote(quoteText));
    dispatch(resetIsUpdated());
  };

  const {
    quote,
    error,
    loading,
    isUpdated,
    videos,
    isVideoCreated,
    isVideoDeleted,
    videosCount,
  } = useSelector((state) => state.frontpage);
  useEffect(() => {
    if (quote) {
      setQuoteText(quote.quote);
    }
    if (error) {
      dispatch(clearError());
    }
    if (isUpdated) {
      setTimeout(() => {
        dispatch(resetIsUpdated());
      }, 5000);
    }
  }, [dispatch, error, isUpdated, quote]);

  //Healed Speaks
  const [createTestimonial, setCreateTestimonial] = useState("close");

  const [testiName, setTestiName] = useState("");
  const [testiDesc, setTestiDesc] = useState("");
  const [cluster, setCluster] = useState("");
  const [testiImg, setTestiImg] = useState("");
  const [imgPrev, setImgPrev] = useState("/user.png");

  const {
    testiLoading,
    testiError,
    testimonial,
    testimonials,
    totalTestimonial,
    isDeleted,
  } = useSelector((state) => state.testimonial);

  const ImageDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setTestiImg(reader.result);
        setImgPrev(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const submitCreateTestimonial = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.set("name", testiName);
    fd.set("testimonial", testiDesc);
    fd.set("cluster", cluster);
    fd.set("image", testiImg);
    dispatch(createTesti(fd));
  };
  const [clus, setClus] = useState("All");
  const [testiPage, setTestiPage] = useState(1);

  useEffect(() => {
    if (testiError) {
      dispatch(clearTestiError());
    }
    const options = {
      cluster: clus,
      page: testiPage,
      itemsPerPage: 4,
    };
    dispatch(getTesti(options));
    if (isDeleted) {
      setTimeout(() => {
        dispatch(deleteReset());
      }, 5000);
    }
    if (testimonial) {
      dispatch(clearTesti());
      setTestiName("");
      setTestiDesc("");
      setCluster("");
      setTestiImg("");
      setImgPrev("/user.png");
    }
  }, [testiError, dispatch, clus, testimonial, testiPage, isDeleted]);

  //Videos

  const [toggleVideo, setToggleVideo] = useState("close");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const submitVideo = (e) => {
    e.preventDefault();
    setToggleVideo("close");
    setTitle("");
    setLink("");
    const options = {
      title,
      link,
    };
    dispatch(createVideo(options));
  };
  const [vidPage, setVidPage] = useState(1);
  const vidItemsPerPage = 2;
  useEffect(() => {
    const options = {
      itemsPerPage: vidItemsPerPage,
      page: vidPage,
    };
    dispatch(getAllVideos(options));
    if (isVideoDeleted) {
      dispatch(resetIsVideoDeleted());
    }
  }, [dispatch, isVideoCreated, isVideoDeleted, vidPage]);

  //Faq
  const [toggleFaq, setToggleFaq] = useState("close");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const submitFaq = (e) => {
    e.preventDefault;
    const options = {
      question,
      answer,
    };
    dispatch(createFaq(options));
  };

  const { faqs, isFaqCreated, isFaqDeleted } = useSelector(
    (state) => state.frontpage
  );
  const faqCols = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "ques",
      headerName: "Question",
      minWidth: 200,
      flex: 0.3,
    },
    {
      field: "ans",
      headerName: "Answer",
      minWidth: 300,
      flex: 0.4,
    },
    {
      field: "action",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.3,
      type: "number",

      renderCell: (cellValues) => (
        <div className="flex text-2xl  justify-end">
          <Link to={`/admin/faq/edit/${cellValues.id}`}>
            <BiEdit className="text-green-400" />
          </Link>
          <button
            onClick={() => {
              console.log(cellValues.id);
              dispatch(deleteFaq(cellValues.id));
            }}
          >
            <MdOutlineDeleteOutline className="text-red-700" />
          </button>
        </div>
      ),
    },
  ];
  const faqRows = [];
  faqs &&
    faqs.map((faq) => {
      faqRows.push({
        id: faq._id,
        ques: faq.question,
        ans: faq.answer,
      });
    });

  useEffect(() => {
    dispatch(getFaq());
    if (isFaqCreated) {
      dispatch(resetIsFaqCreated());
    }
    if (isFaqDeleted) {
      dispatch(resetIsFaqDeleted());
    }
  }, [dispatch, isFaqCreated, isFaqDeleted]);

  //Blog
  const [toggleBlog, setToggleBlog] = useState("close");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePrev, setBlogImagePrev] = useState("");

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

  const submitBlog = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.set("name", blogTitle);
    fd.set("description", blogDescription);
    if (blogImage) {
      fd.set("image", blogImage);
    }
    dispatch(createBlog(fd));
  };

  const { blogs, blog, isBlogDeleted, isBlogCreated } = useSelector(
    (state) => state.frontpage
  );

  const blogCols = [
    {
      field: "image",
      headerName: "Image",
      minWidth: 150,
      flex: 0.3,
      renderCell: (cellValues) => {
        console.log(cellValues);
        return (
          <div className="w-[150px] h-[150px]">
            <img src={cellValues.row.image} alt="" />
          </div>
        );
      },
    },
    { field: "title", headerName: "Title", minWidth: 200, flex: 0.3 },
    { field: "desc", headerName: "Description", minWidth: 300, flex: 0.8 },
    { field: "date", headerName: "Created at", minWidth: 200, flex: 0.3 },
    {
      field: "action",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.3,
      type: "number",
      headerClassName: "text-[#00286b] text-lg",

      renderCell: (cellValues) => (
        <div className="flex text-2xl  justify-end">
          <Link to={`/admin/blog/edit/${cellValues.id}`}>
            <BiEdit className="text-green-400" />
          </Link>
          <button
            onClick={() => {
              dispatch(deleteBlog(cellValues.id));
            }}
          >
            <MdOutlineDeleteOutline className="text-red-700" />
          </button>
        </div>
      ),
    },
  ];
  const blogRows = [];
  blogs &&
    blogs.map((blog) => {
      const options = {
        id: blog._id,
        date: blog.createdAt,
        title: blog.name,
        desc: blog.description,
      };
      if (blog.image && blog.image.url) {
        options.image = blog.image.url;
      }
      blogRows.push(options);
    });
  useEffect(() => {
    const options = {
      page: 1,
      keyword: "",
      itemsPerPage: 50,
    };
    dispatch(getAllBlogs(options));
    if (isBlogDeleted) {
      setTimeout(() => {
        dispatch(resetIsBlogDeleted());
      }, 5000);
    }
    if (isBlogCreated) {
      dispatch(resetIsFaqCreated());
    }
    if (blog) {
      dispatch(resetBlog());
      setTestiName("");
      setTestiDesc("");
      setCluster("");
      setTestiImg("");
      setImgPrev("");
    }
  }, [dispatch, isBlogCreated, isBlogDeleted]);
  return (
    <>
      {loading || testiLoading ? (
        <Loader />
      ) : (
        <div className="flex sm:flex-col">
          <Sidebar />

          <div className="w-full ">
            <div className="bg-[#F0F0F0]">
              <div className="bg-white my-[6vmax]">
                <h1 className="text-3xl border-b-4 border-[#00286b] text-[#00286b] pb-2 font-bold w-fit text-center mx-auto sm:text-2xl sm:w-4/5">
                  Edit FrontPage
                </h1>
                <form className="w-4/5  mx-auto flex flex-col items-center my-[2vmax] gap-4 border-b-4 border-[#00286b] pb-8">
                  <h1 className="text-center text-2xl font-semibold text-[#00286b]">
                    Quote
                  </h1>
                  <input
                    type="text"
                    value={quoteText}
                    className="px-[1.5vmax] py-[1vmax]  bg-white w-full border-gray-400 border-2 rounded-md"
                    onChange={(e) => setQuoteText(e.target.value)}
                  />

                  <div>
                    <input
                      type="submit"
                      value="Update"
                      onClick={submitQuote}
                      className="py-[0.8vmax] px-[1vmax] bg-[#00286b] w-full hover:bg-[white] border-2 border-[#00286b] hover:text-[#00286b]  text-white cursor-pointer"
                    />
                  </div>
                </form>
                <div className="relative w-4/5  mx-auto flex flex-col items-center my-[2vmax] gap-4 border-b-4 border-[#00286b] pb-8">
                  <h1 className="text-center text-2xl font-semibold text-[#00286b]">
                    The Healed Speaks
                  </h1>
                  <button
                    onClick={() => setCreateTestimonial("open")}
                    className="absolute top-[-10px] right-0 border-2 border-[#00286b] bg-[#00286b] text-white font-semibold px-[1vmax] py-[0.5vmax] hover:bg-white hover:text-[#00286b] sm:static"
                  >
                    Create Testimonial
                  </button>
                  <select
                    className="p-[0.5vmax] bg-white"
                    onChange={(e) => {
                      setClus(e.target.value);
                    }}
                  >
                    <option value="">Choose Cluster</option>
                    <option value="All">All</option>
                    <option value="Ratlam">Ratlam</option>
                    <option value="Indore">Indore</option>
                  </select>

                  <div className="w-full mx-auto flex gap-4 flex-wrap justify-center">
                    {testimonials &&
                      testimonials.map((testi) => (
                        <TestiCard key={testi._id} data={testi} />
                      ))}
                  </div>
                  <div>
                    <div className="w-full">
                      <Pagination
                        currPage={testiPage}
                        totalItem={totalTestimonial}
                        setPage={setTestiPage}
                        itemsPerPage={4}
                      />
                    </div>
                  </div>
                  {createTestimonial == "open" ? (
                    <div className="fixed w-full h-[100vh] bg-black bg-opacity-60 top-0 left-0 flex justify-center items-center">
                      <div className="relative w-1/3 h-[80%]  bg-white">
                        <button
                          className="absolute top-[2vmax] right-[2vmax]"
                          onClick={() => setCreateTestimonial("close")}
                        >
                          <RiCloseCircleFill className=" text-[2vmax] font-bold text-[#00286b]" />
                        </button>
                        <form
                          className="w-full flex flex-col h-full justify-evenly items-center "
                          onSubmit={submitCreateTestimonial}
                        >
                          <h1 className="text-center mx-auto text-2xl font-semibold text-[#00286b] border-b-2 border-[#00286b] pb-4 w-1/2">
                            Create Testimonial
                          </h1>
                          <div className="flex  items-center gap-4">
                            <AiOutlineUser className="text-2xl" />
                            <input
                              type="text"
                              value={testiName}
                              placeholder="Enter Reviewer Name"
                              onChange={(e) => setTestiName(e.target.value)}
                              className="bg-white px-[1.5vmax] py-[1vmax] border-2 "
                            />
                          </div>
                          <div className="flex  items-center gap-4">
                            <BiCommentDetail className="text-2xl" />
                            <textarea
                              value={testiDesc}
                              placeholder="Enter Testimonial"
                              onChange={(e) => setTestiDesc(e.target.value)}
                              className="bg-white px-[1.5vmax] py-[1vmax] border-2 "
                            />
                          </div>
                          <div className="flex  items-center gap-4">
                            <BiClinic className="text-2xl" />
                            <select
                              className="bg-white"
                              onChange={(e) => setCluster(e.target.value)}
                            >
                              <option value="">Choose Cluster</option>
                              <option value="Ratlam">Ratlam</option>
                              <option value="Indore">Indore</option>
                            </select>
                          </div>
                          <div className="flex  items-center gap-4">
                            <img
                              src={imgPrev}
                              alt="img"
                              className="rounded-full w-[3vmax]"
                            />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={ImageDataChange}
                              className="w-[10vmax] border-2 p-[0.5vmax] bg-[#e5e7eb]"
                            />
                          </div>
                          <input
                            type="submit"
                            className="mx-auto py-[1vmax] px-[1.5vmax] bg-[#00286b] w-4/5 hover:bg-[white] border-2 border-[#00286b] hover:text-[#00286b]  text-white cursor-pointer"
                          />
                        </form>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="w-4/5 relative flex flex-col items-center gap-4 pb-8 border-b-4 border-[#00286b] mx-auto my-[2vmax]">
                  <h1 className="text-2xl text-[#00286b] font-bold text-center">
                    Youtube Videos
                  </h1>
                  <button
                    onClick={() => setToggleVideo("open")}
                    className="absolute top-[0px] right-0 border-2 border-[#00286b] bg-[#00286b] text-white font-semibold px-[1vmax] py-[0.5vmax] hover:bg-white hover:text-[#00286b] sm:static"
                  >
                    Upload Video
                  </button>
                  <div className="flex flex-wrap justify-center gap-4 mb-4">
                    {videos && videos.map((vid) => <VideoCard vid={vid} />)}
                  </div>
                  {videosCount > 2 ? (
                    <Pagination
                      currPage={vidPage}
                      setPage={setVidPage}
                      itemsPerPage={vidItemsPerPage}
                      totalItem={videosCount}
                    ></Pagination>
                  ) : (
                    ""
                  )}

                  {toggleVideo == "open" ? (
                    <div className="fixed w-full h-[100vh] bg-black bg-opacity-60 top-0 left-0 flex justify-center items-center">
                      <div className="relative w-1/3 h-[80%]  bg-white">
                        <button
                          className="absolute top-[2vmax] right-[2vmax]"
                          onClick={() => setToggleVideo("close")}
                        >
                          <RiCloseCircleFill className=" text-[2vmax] font-bold text-[#00286b]" />
                        </button>
                        <form
                          className="w-full flex flex-col h-full justify-evenly items-center "
                          onSubmit={submitVideo}
                        >
                          <h1 className="text-center mx-auto text-2xl font-semibold text-[#00286b] border-b-2 border-[#00286b] pb-4 w-1/2">
                            Upload Youtube Video
                          </h1>
                          <div className="flex  items-center gap-4">
                            {/* <AiOutlineUser className="text-2xl" /> */}
                            <input
                              type="text"
                              required
                              value={title}
                              placeholder="Enter title of Video"
                              onChange={(e) => setTitle(e.target.value)}
                              className="bg-white px-[1.5vmax] py-[1vmax] border-2 "
                            />
                          </div>
                          <div className="flex  items-center gap-4">
                            {/* <BiCommentDetail className="text-2xl" /> */}
                            <input
                              value={link}
                              required
                              placeholder="Paste link of Video"
                              onChange={(e) => setLink(e.target.value)}
                              className="bg-white px-[1.5vmax] py-[1vmax] border-2 "
                            />
                          </div>

                          <input
                            type="submit"
                            className="mx-auto py-[1vmax] px-[1.5vmax] bg-[#00286b] w-4/5 hover:bg-[white] border-2 border-[#00286b] hover:text-[#00286b]  text-white cursor-pointer"
                          />
                        </form>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="w-4/5 relative flex flex-col items-center gap-4 pb-8 border-b-4 border-[#00286b] mx-auto my-[2vmax]">
                  <h1 className="text-2xl font-bold text-[#00286b] text-center">
                    FAQs
                  </h1>
                  <button
                    onClick={() => setToggleFaq("open")}
                    className="absolute top-[0px] right-0 border-2 border-[#00286b] bg-[#00286b] text-white font-semibold px-[1vmax] py-[0.5vmax] hover:bg-white hover:text-[#00286b] sm:static"
                  >
                    Create FAQ
                  </button>
                  <DataGrid
                    className="my-8 sm:w-[95%]"
                    rows={faqRows}
                    columns={faqCols}
                    autoHeight
                  />
                  {toggleFaq == "open" ? (
                    <div className="fixed w-full h-[100vh] bg-black bg-opacity-60 top-0 left-0 flex justify-center items-center">
                      <div className="relative w-1/3 h-[80%]  bg-white">
                        <button
                          className="absolute top-[2vmax] right-[2vmax]"
                          onClick={() => setToggleFaq("close")}
                        >
                          <RiCloseCircleFill className=" text-[2vmax] font-bold text-[#00286b]" />
                        </button>

                        <form
                          className="w-full flex flex-col h-full justify-evenly items-center "
                          onSubmit={submitFaq}
                        >
                          <h1 className="text-center mx-auto text-2xl font-semibold text-[#00286b] border-b-2 border-[#00286b] pb-4 w-1/2">
                            Create FAQ
                          </h1>
                          <div className="flex  items-center gap-4">
                            {/* <AiOutlineUser className="text-2xl" /> */}
                            <input
                              type="text"
                              required
                              value={question}
                              placeholder="Enter Question"
                              onChange={(e) => setQuestion(e.target.value)}
                              className=" bg-white px-[1.5vmax] py-[1vmax] border-2 "
                            />
                          </div>
                          <div className="flex  items-center gap-4">
                            {/* <BiCommentDetail className="text-2xl" /> */}
                            <textarea
                              value={answer}
                              required
                              placeholder="Enter Answer"
                              onChange={(e) => setAnswer(e.target.value)}
                              className="bg-white px-[1.5vmax] py-[1vmax] border-2 "
                            />
                          </div>

                          <input
                            type="submit"
                            className="mx-auto py-[1vmax] px-[1.5vmax] bg-[#00286b] w-4/5 hover:bg-[white] border-2 border-[#00286b] hover:text-[#00286b]  text-white cursor-pointer"
                          />
                        </form>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="w-4/5 relative flex flex-col items-center gap-4 pb-8 border-b-4 border-[#00286b] mx-auto my-[2vmax]">
                  <h1 className="text-2xl font-bold text-[#00286b] text-center">
                    Blogs
                  </h1>
                  <button
                    onClick={() => setToggleBlog("open")}
                    className="absolute top-[-10px] right-0 border-2 border-[#00286b] bg-[#00286b] text-white font-semibold px-[1vmax] py-[0.5vmax] hover:bg-white hover:text-[#00286b] sm:static"
                  >
                    Create Blog
                  </button>
                  <DataGrid
                    className="my-8 sm:w-[95%]"
                    rows={blogRows}
                    columns={blogCols}
                    autoHeight
                  />
                  {toggleBlog == "open" ? (
                    <div className="fixed w-full h-[100vh] bg-black bg-opacity-60 top-0 left-0 flex justify-center items-center">
                      <div className="relative w-1/3 h-[80%]  bg-white">
                        <button
                          className="absolute top-[2vmax] right-[2vmax]"
                          onClick={() => setToggleBlog("close")}
                        >
                          <RiCloseCircleFill className=" text-[2vmax] font-bold text-[#00286b]" />
                        </button>
                        <form
                          className="w-full flex flex-col h-full justify-evenly items-center "
                          onSubmit={submitBlog}
                        >
                          <h1 className="text-center mx-auto text-2xl font-semibold text-[#00286b] border-b-2 border-[#00286b] pb-4 w-1/2">
                            Create Blog
                          </h1>
                          <div className="flex  items-center gap-4">
                            <AiOutlineUser className="text-2xl" />
                            <input
                              type="text"
                              value={blogTitle}
                              required
                              placeholder="Enter Title of BLog"
                              onChange={(e) => setBlogTitle(e.target.value)}
                              className="bg-white px-[1.5vmax] py-[1vmax] border-2 "
                            />
                          </div>
                          <div className="flex  items-center gap-4">
                            <BiCommentDetail className="text-2xl" />
                            <textarea
                              value={blogDescription}
                              required
                              placeholder="Enter Blog descirption"
                              onChange={(e) =>
                                setBlogDescription(e.target.value)
                              }
                              className="bg-white px-[1.5vmax] py-[1vmax] border-2 "
                            />
                          </div>

                          <div className="flex  items-center gap-4">
                            {blogImagePrev && (
                              <img
                                src={blogImagePrev}
                                alt="img"
                                className=" w-[3vmax]"
                              />
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
                            className="mx-auto py-[1vmax] px-[1.5vmax] bg-[#00286b] w-4/5 hover:bg-[white] border-2 border-[#00286b] hover:text-[#00286b]  text-white cursor-pointer"
                          />
                        </form>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            {error && <ErrorAlert message={error} alert={true} />}
            {testiError ? <ErrorAlert message={testiError} alert={true} /> : ""}
            {isUpdated ? (
              <ErrorAlert message={"Quote is Updated"} alert={false} />
            ) : (
              ""
            )}
            {isDeleted ? (
              <ErrorAlert
                message={"Testimonial is Deleted Successfully"}
                alert={false}
              />
            ) : (
              ""
            )}
            {testimonial ? (
              <ErrorAlert message={"testimonial is created"} alert={false} />
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EditFrontend;
