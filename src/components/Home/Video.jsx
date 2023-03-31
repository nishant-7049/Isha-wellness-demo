import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const video = [
  {
    id: 0,
    title: "IWC 15 Aug",
    src: "https://www.youtube.com/embed/DWIghVp17so",
  },
  {
    id: 1,
    title: "Isha Wellness Centre",
    src: "https://www.youtube.com/embed/S3VAcGIiMNw",
  },
  {
    id: 2,
    title: "Mujhko thik karega kon",
    src: "https://www.youtube.com/embed/m2uxzxlKm5Q",
  },
  {
    id: 3,
    title: "Me Gym jau ya na jau",
    src: "https://www.youtube.com/embed/jSgg3CvlX5c",
  },
  {
    id: 4,
    title: "Isha Wellness Centre Cartoon- Ra2",
    src: "https://www.youtube.com/embed/yZuMWNouA2A",
  },
];
const Video = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          dots: false,
          arrows: false,
          pauseOnHover: false,
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="mx-auto px-[9rem] py-16 mt-8 mb-16 sm:px-4 ">
      <h2 className=" text-3xl mb-8 mx-auto capitalize text-[#50acfb] text-center">
        Youtube Content
      </h2>
      <Slider {...settings}>
        {video.map((video) => (
          <iframe
            className="px-4 sm:px-0 sm:w-full"
            key={video.id}
            width="100%"
            height="300"
            src={video.src}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ))}
      </Slider>
    </div>
  );
};

export default Video;
