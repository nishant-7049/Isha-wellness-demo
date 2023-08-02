import React from "react";
import styled from "styled-components";
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
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
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
    <Container>
      <Slider className="slider w-[90%] mx-auto my-4" {...settings}>
        {data &&
          data.map((data) => {
            return (
              <div key={data._id} className="">
                <div className=" flex  w-[90%]  py-4 mx-auto rounded-md sm:flex-col sm:px-4 sm:py-2">
                  <div className="h-full w-20 rounded-full sm:mx-auto ">
                    <img
                      src={data.image.url}
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
                      {data.testimonial}
                    </p>
                    <a
                      href={
                        data.cluster === "Indore"
                          ? "https://www.google.com/maps/place/ISHA+Wellness+Centre+Ratlam/@18.7207366,67.5205801,5z/data=!4m12!1m2!2m1!1sisha+wellness+centre!3m8!1s0x3963fea578acaff7:0x847dac23ee0d0262!8m2!3d23.3201068!4d75.0335898!9m1!1b1!15sChRpc2hhIHdlbGxuZXNzIGNlbnRyZZIBFHBoeXNpb3RoZXJhcHlfY2VudGVy4AEA!16s%2Fg%2F11gg6c4lzc"
                          : "https://www.google.com/maps/place/ISHA+Wellness+Centre+Ratlam/@18.7207366,67.5205801,5z/data=!4m12!1m2!2m1!1sisha+wellness+centre!3m8!1s0x3963fea578acaff7:0x847dac23ee0d0262!8m2!3d23.3201068!4d75.0335898!9m1!1b1!15sChRpc2hhIHdlbGxuZXNzIGNlbnRyZZIBFHBoeXNpb3RoZXJhcHlfY2VudGVy4AEA!16s%2Fg%2F11gg6c4lzc"
                      }
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
    </Container>
  );
};

export default Slider_testimonial;

const Container = styled.div`
  .slick-dots li.slick-active button:before {
    color: white;
  }
`;
