import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const data = [
  {
    id: 0,
    image: `/images/img (1).png`,
    name: `NEEL TC`,
    time: '3 months ago',
    review: `"Would definitely recommend if you are facing any musculoskeletal imbalance , pain related issue. Sir,Mam and whole staff here is HIGHLY skilled and you will get well customized treatment which is mix of modern physiotherapy exercises , yoga ,aerobics etc etc based one your issue. Special mention to ora around here which is highly unmatchable and can't be described but it will take no time for you to feel you came to right place. PS: Isha wellness center is truly a gift to the people of Ratlam by the vision seen by sir Nd mam."`,
  },
  {
    id: 1,
    image: `/images/img (2).png`,
    name: `KAVITA CHAWLA`,time: '2 years ago',
    review: `"I am KAVITA CHAWLA I lived in Ahmedabad I have back pain & foot pain for that I visited many doctors in Ratlam as well as in Ahmedabad but I don't get... read more"`,
  },
  {
    id: 2,
    image: `/images/img (3).png`,
    name: `SANJAY SONI`,
    time: '1 months ago',
    review: `"Best therapy centre with very nice atmosphere and careable staff.They cure my back pain in very less time."`,
  },
]

const Slider_testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    arrows: true,
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
    <Slider className="slider w-[70%] mx-auto my-4" {...settings}>
      {data.map((data) => {
        return ( 
        <div key={data.id} className="" >
        <div className=" flex gap-4 w-[90%] bg-white px-12 py-4 mx-auto rounded-md">
          <div  className='w-8 rounded-full'>
            <img src={data.image} alt="/" className=" w-8 rounded-full"/>
          </div>
          <div className=" flex flex-col gap-2 text-left h-[10rem]">
            <div>
            <h2 className=" font-extrabold text-[#50acfb]">
              {data.name}
            </h2>
            <div className="flex gap-3 items-center">
            <span>⭐⭐⭐⭐⭐</span>
            <span className=" text-sm">
              {data.time}
            </span>
            </div>
            </div>
            <p className="overflow-y-auto text-sm">
              {data.review}
            </p>
          <a href="https://www.google.com/search?q=ishawellness+centre&oq=ishawellness+centre&aqs=chrome..69i57j0i13i512j46i13i175i199i512j0i22i30j0i390j69i60l3.4024j0j7&sourceid=chrome&ie=UTF-8#" target='_blank' className="text-[#50acfb] text-sm ">Read more... </a>
          </div>
          </div>
        </div>
        )
      })}
    </Slider>
  );
};

export default Slider_testimonial;
