import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";

const data = [
  {
    id: 0,
    blogImg: "/images/blog/process.jpg",
    senderName: "Sender1",
    sentDate: "15 jan 2020",
    topic: "What should be the topic of this blog ?",
    blogText:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate vitae cumque porro rem exercitationem praesentium repudiandae atque error inventore? Doloribus quas sed beatae assumenda vel?Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate vitae cumque porro rem exercitationem praesentium repudiandae atque error inventore? Doloribus quas sed beatae assumenda vel?Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate vitae cumque porro rem exercitationem praesentium repudiandae atque error inventore? Doloribus quas sed beatae assumenda vel?Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate vitae cumque porro rem exercitationem praesentium repudiandae atque error inventore? Doloribus quas sed beatae assumenda vel?Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate vitae cumque porro rem exercitationem praesentium repudiandae atque error inventore? Doloribus quas sed beatae assumenda vel?Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate vitae cumque porro rem exercitationem praesentium repudiandae atque error inventore? Doloribus quas sed beatae assumenda vel?Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate vitae cumque porro rem exercitationem praesentium repudiandae atque error inventore? Doloribus quas sed beatae assumenda vel?Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate vitae cumque porro rem exercitationem praesentium repudiandae atque error inventore? Doloribus quas sed beatae assumenda vel?Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate vitae cumque porro rem exercitationem praesentium repudiandae atque error inventore? Doloribus quas sed beatae assumenda vel?Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate vitae cumque porro rem exercitationem praesentium repudiandae atque error inventore? Doloribus quas sed beatae assumenda vel?Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate vitae cumque porro rem exercitationem praesentium repudiandae atque error inventore? Doloribus quas sed beatae assumenda vel?Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate vitae cumque porro rem exercitationem praesentium repudiandae atque error inventore? Doloribus quas sed beatae assumenda vel?",
  },
  {
    id: 1,
    blogImg: "/images/blog/process4.jpg",
    senderName: "Sender2",
    sentDate: "15 jan 2020",
    topic: "What should be the topic of this blog ?",
    blogText:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus alias necessitatibus consequatur iure illum cum eos molestiae est consequuntur nisi!",
  },
  {
    id: 2,
    blogImg: "/images/blog/process2.jpg",
    senderName: "Sender3",
    sentDate: "15 jan 2020",
    topic: "What should be the topic of this blog ?",
    blogText:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus alias necessitatibus consequatur iure illum cum eos molestiae est consequuntur nisi!",
  },
  {
    id: 3,
    blogImg: "/images/blog/process3.jpg",
    senderName: "Sender4",
    sentDate: "15 jan 2020",
    topic: "What should be the topic of this blog ?",
    blogText:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus alias necessitatibus consequatur iure illum cum eos molestiae est consequuntur nisi!",
  },
  {
    id: 4,
    blogImg: "/images/blog/process4.jpg",
    senderName: "Sender5",
    sentDate: "15 jan 2020",
    topic: "What should be the topic of this blog ?",
    blogText:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus alias necessitatibus consequatur iure illum cum eos molestiae est consequuntur nisi!",
  },
  {
    id: 5,
    blogImg: "/images/blog/process2.jpg",
    senderName: "Sender6",
    sentDate: "15 jan 2020",
    topic: "What should be the topic of this blog ?",
    blogText:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus alias necessitatibus consequatur iure illum cum eos molestiae est consequuntur nisi!",
  },
  {
    id: 6,
    blogImg: "/images/blog/process.jpg",
    senderName: "Sender7",
    sentDate: "15 jan 2020",
    topic: "What should be the topic of this blog ?",
    blogText:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus alias necessitatibus consequatur iure illum cum eos molestiae est consequuntur nisi!",
  },
];
const BlogPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/");
      window.alert("Please login to access!");
    }
  }, [navigate]);

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
        <div className="blog">
          <span>Out Recent Blogs</span>
          <h3>Our Blogs</h3>
        </div>
        <div className="card-con">
          {data.map((data) => {
            return (
              <div
                className="card bg-[url(/images/bg/blog-bg.jpg)] bg-cover bg-center bg-fixed"
                key={data.id}
              >
                <div className="image">
                  <img src={data.blogImg} alt="" />
                </div>
                <div className="blog-text bg-black bg-opacity-20 text-white">
                  <span>
                    {data.senderName} | {data.sentDate}
                  </span>
                  <h2
                    className="cursor-pointer"
                    onClick={() => {
                      navigate(`/blogs/${data.id}`, { state: { data: data } });
                    }}
                  >
                    {data.topic}
                  </h2>
                  <p className="blog-para tracking-wider">{data.blogText}</p>
                  <p
                    className=" cursor-pointer  hover:transition-all hover:duration-300 hover:text-[#00286b]"
                    onClick={() => {
                      navigate(`/blogs/${data.id}`, { state: { data: data } });
                    }}
                  >
                    Read more...
                  </p>
                </div>
              </div>
            );
          })}
        </div>
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
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
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
    margin: 0 auto;
    display: grid;
    width: 90%;
    grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
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
      > a {
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
