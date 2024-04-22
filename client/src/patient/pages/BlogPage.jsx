import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import Loader from "../../auth/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBlogs,
  resetIsKeywordUpdated,
  resetIsPageUpdated,
  setKeyword,
  setPage,
} from "../../store/slices/EditFrontSlice";
import { BiSearchAlt } from "react-icons/bi";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const BlogPage = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const handlePage = (event, value) => {
    dispatch(setPage(value));
  };
  const itemsPerPage = 6;
  const searchHandler = (e) => {
    e.preventDefault();

    dispatch(setKeyword(search));
    page != 1 && dispatch(setPage(1));
  };
  const {
    blogs,
    loading,
    blogsCount,
    keyword,
    page,
    isKeywordUpdated,
    isPageUpdated,
  } = useSelector((state) => state.frontpage);

  useEffect(() => {
    if (!blogs) {
      const options = {
        page,
        keyword,
        itemsPerPage,
      };
      dispatch(getAllBlogs(options));
    }
  }, []);
  useEffect(() => {
    if (isKeywordUpdated) {
      const query = {
        keyword,
        page,
        itemsPerPage,
      };

      dispatch(getAllBlogs(query));
      dispatch(resetIsKeywordUpdated());
      setSearch("");
    }
  }, [isKeywordUpdated]);
  useEffect(() => {
    if (isPageUpdated) {
      const query = {
        keyword,
        page,
        itemsPerPage,
      };

      dispatch(getAllBlogs(query));
      dispatch(resetIsPageUpdated());
      setSearch("");
    }
  }, [isPageUpdated]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { type: "spring", duration: 0.5, bounce: 0.5 },
      }}
    >
      <Container>
        <div className="blog relative">
          <span>Out Recent Blogs</span>
          <h3>Our Blogs</h3>
          {keyword && (
            <p className="my-2 ml-2 text-gray-500 font-semibold ">
              Search results for '{keyword}'
            </p>
          )}
          <form className="absolute bottom-0 right-[6rem] border-2 flex sm:static sm:mt-[2rem]">
            <input
              type="text"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="bg-white p-[0.4vmax]"
              placeholder="Search"
            />
            <button
              className="bg-[#00286b] px-[0.6vmax] text-white hover:bg-white hover:text-[#00286b]"
              onClick={searchHandler}
            >
              <BiSearchAlt />
            </button>
          </form>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="card-con">
            {blogs && blogs.length > 0 ? (
              blogs.map((data) => {
                const date = new Date(data.createdAt);
                const currDate = `${date.getHours()}h${date.getMinutes()}m-${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
                return (
                  <div
                    className="card bg-[url(/images/bg/blog-bg.jpg)] bg-cover bg-center bg-fixed"
                    key={data._id}
                  >
                    <div className="image">
                      <img src={data.image.url} alt="" />
                    </div>
                    <div className="blog-text bg-black bg-opacity-20 text-white">
                      <span>
                        {data.createdBy} | {currDate}
                      </span>
                      <Link
                        to={`/blog/${data._id}`}
                        className="cursor-pointer text-2xl font-bold hover:text-[#00286b] mt-2"
                      >
                        {data.name}
                      </Link>
                      <p className="blog-para tracking-wider">
                        {data.description}
                      </p>
                      <Link
                        to={`/blog/${data._id}`}
                        className=" hover:transition-all hover:duration-300 hover:text-[#00286b]"
                      >
                        Read more...
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="w-fit mx-auto text-gray-400 font-semibold my-2">
                No Search Results for keyword '{keyword};'
              </p>
            )}
          </div>
        )}
        <Stack spacing={2} className="my-[2rem] mx-auto w-fit">
          <Pagination
            count={Math.ceil(blogsCount / itemsPerPage)}
            variant="outlined"
            shape="rounded"
            size="large"
            color="primary"
            page={page}
            onChange={handlePage}
          />
        </Stack>
      </Container>
    </motion.div>
  );
};

export default BlogPage;

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Poppins&family=Work+Sans&display=swap');
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;

  a{
    text-decoration: none;
  }

  .blog{
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    > span{
      color: #00286b;
    }
    > h3{
      font-size: 2rem;
      font-weight: 700;
    }
  }
  .main-head {
    text-align: center;
    margin-top: 5rem;
    color: #2b2b2b;
  }
  .card-con{
    display: grid;
    width: 90%;
    margin: 0 auto;
    grid-template-columns: repeat(auto-fit, minmax(33%, 33%));
    align-items: center; 
  }
  .card {
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #ececec;
    > div >img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
    }
    .blog-text {
      display: flex;
      flex-direction: column;
      align-items: flex-left;
      justify-content: space-between;
      padding: 2rem;
      > span {
        font-size: 0.8rem;
      }
      > h2 {
        font-size: 1.4rem;
        font-weight: 600;
        color: #fff;
        &:hover{
          color: #00286b;
        }
      }
      > Link {
        color: #0f0f0f;
        &:hover{
          color: #00286b;
          transition: all ease 0.3;
        }
      }
    }
  }
  .blog-para
    {
      color: #fff;
      font-size: 0.9rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      margin: 20px 0;
    }
  @media screen and (max-width: 768px) {
    .card-con {
      grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
    }
  }
  @media screen and (max-width: 500px) {
    .card-con {
      grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
    }
  }
  @media screen and (max-width: 500px) {
    .blog-text {
      padding: 1rem;
    }
  }  
`;
