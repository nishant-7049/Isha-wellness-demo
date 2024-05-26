import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos } from "../../../store/slices/EditFrontSlice";
import styled from "styled-components";

const Video = () => {
  const dispatch = useDispatch();
  const { videos } = useSelector((state) => state.frontpage);
  useEffect(() => {
    const options = {
      itemsPerPage: 0,
    };
    dispatch(getAllVideos(options));
  }, [dispatch]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
    dotsClass: "slick-dots text-white",
    responsive: [
      {
        breakpoint: 800,
        settings: {
          dots: true,
          arrows: false,
          pauseOnHover: false,
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <Container className="mx-auto px-[9rem] py-16 mt-8 mb-16 sm:px-4 ">
      <h2 className=" text-3xl mb-8 mx-auto capitalize text-[white] font-bold text-center">
        Youtube Content
      </h2>
      <Slider {...settings}>
        {videos &&
          videos.map((video, index) => (
            <div key={index}>
              <iframe
                className="px-4 w-full h-[300px] sm:px-0 sm:w-full mb-4"
                key={video._id}
                src={video.link}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <p className="text-white font-semibold w-4/5 mx-auto text-center">
                {video.title}
              </p>
            </div>
          ))}
      </Slider>
    </Container>
  );
};

export default Video;

const Container = styled.div`
  .slick-dots li.slick-active button:before {
    color: white;
  }
  .slick-dots li button:before {
    color: white;
  }
`;
