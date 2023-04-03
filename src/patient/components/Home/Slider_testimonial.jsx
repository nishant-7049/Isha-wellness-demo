import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const data = [
  {
    id: 0,
    image: `/images/service/img (1).png`,
    name: `NEEL TC`,
    time: "3 months ago",
    review: `"Would definitely recommend if you are facing any musculoskeletal imbalance , pain related issue. Sir,Mam and whole staff here is HIGHLY skilled and you will get well customized treatment which is mix of modern physiotherapy exercises , yoga ,aerobics etc etc based one your issue. Special mention to ora around here which is highly unmatchable and can't be described but it will take no time for you to feel you came to right place. PS: Isha wellness center is truly a gift to the people of Ratlam by the vision seen by sir Nd mam."`,
  },
  {
    id: 1,
    image: `/images/service/img (2).png`,
    name: `KAVITA CHAWLA`,
    time: "2 years ago",
    review: `"I am KAVITA CHAWLA I lived in Ahmedabad I have back pain & foot pain for that I visited many doctors in Ratlam as well as in Ahmedabad but I don't get..."`,
  },
  {
    id: 2,
    image: `/images/service/img (3).png`,
    name: `SANJAY SONI`,
    time: "1 months ago",
    review: `"Best therapy centre with very nice atmosphere and careable staff.They cure my back pain in very less time."`,
  },
  {
    id: 3,
    image: `/images/service/img (1).png`,
    name: `NEEL TCdsfsf`,
    time: "3 months ago",
    review: `"Would definitely recommend if you are facing any musculoskeletal imbalance , pain related issue. Sir,Mam and whole staff here is HIGHLY skilled and you will get well customized treatment which is mix of modern physiotherapy exercises , yoga ,aerobics etc etc based one your issue. Special mention to ora around here which is highly unmatchable and can't be described but it will take no time for you to feel you came to right place. PS: Isha wellness center is truly a gift to the people of Ratlam by the vision seen by sir Nd mam."`,
  },
];

const Slider_testimonial = () => {
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
          dots: false,
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
                  src={data.image}
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
                  {data.review}
                </p>
                <a
                  href="https://www.google.com/maps/place/ISHA+Wellness+Centre+Ratlam/@18.7207366,67.5205801,5z/data=!4m12!1m2!2m1!1sisha+wellness+centre!3m8!1s0x3963fea578acaff7:0x847dac23ee0d0262!8m2!3d23.3201068!4d75.0335898!9m1!1b1!15sChRpc2hhIHdlbGxuZXNzIGNlbnRyZZIBFHBoeXNpb3RoZXJhcHlfY2VudGVy4AEA!16s%2Fg%2F11gg6c4lzc"
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
