import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider_testimonial = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          dots: true,
          arrows: false,
          pauseOnHover: false,
        },
      },
    ],
  };
  return (
    <Slider className="slider w-[90%] mx-auto my-4" {...settings}>
      {data.map((data) => {
        return (
          <div key={data.id} className="">
            <div className=" flex  w-[90%]  py-4 mx-auto rounded-md sm:flex-col sm:px-4 sm:py-2">
              <div className="h-full w-20 rounded-full sm:mx-auto ">
                <img
                  src={data.img}
                  alt="/"
                  className=" h-12  object-cover rounded-full sm:mx-auto"
                />
              </div>
              <div className=" flex flex-col flex-1  justify-between gap-2 text-left h-[10rem] sm:h-[15rem] sm:gap-1">
                <div>
                  <h2 className=" font-extrabold text-white sm:text-center">
                    {data.name}
                  </h2>
                </div>
                <p className="overflow-y-auto text-white text-sm sm:overflow-y-auto sm:h-20 ">
                  {data.des}
                </p>
                <a
                  href={data.goo}
                  target="_blank"
                  className="text-white text-sm  "
                >
                  Read more...
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </Slider>
  );
};

export default Slider_testimonial;
