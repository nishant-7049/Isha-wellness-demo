import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const data = [
  {
    id: 0,
    image: `/images/img (1).png`,
    name: `NEEL TC`,
    time: "3 months ago",
    review: `"Would definitely recommend if you are facing any musculoskeletal imbalance , pain related issue.

    Sir,Mam and whole staff here is HIGHLY skilled and you will get well customized treatment which is mix of modern physiotherapy exercises , yoga ,aerobics etc etc based one your issue.
    
    Special mention to ora around here which is highly unmatchable and can't be described but it will take no time for you to feel you came to right place.
    
    PS: Isha wellness center is truly a gift to the people of Ratlam by the vision seen by sir Nd mam."`,
  },
  {
    id: 1,
    image: `/images/img (2).png`,
    name: `KAVITA CHAWLA`,
    time: "2 years ago",
    review: `"I am KAVITA CHAWLA I lived in Ahmedabad I have back pain & foot pain for that I visited many doctors in Ratlam as well as in Ahmedabad but I don't get... read more"`,
  },
  {
    id: 2,
    image: `/images/img (3).png`,
    name: `SANJAY SONI`,
    time: "1 months ago",
    review: `"Best therapy centre with very nice atmosphere and careable staff.They cure my back pain in very less time."`,
  },
];

const Slider_testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
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
    <Container>
      <Slider className="slider" {...settings}>
        {data.map((data) => {
          return (
            <div key={data.id} className='flex'>
              <div className="rounded-full w-20">
                <img className="w-full rounded-full" src={data.image} alt="/" />
              </div>
              <div className="">
                <h2>{data.name}</h2>
                <span>⭐⭐⭐⭐⭐</span>
                <span>{data.time}</span>
                <p className="">{data.review}</p>
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
  .slider {
    margin: 2rem auto;
    padding: 0rem;
    cursor: pointer;
    background-color: #fff;
    max-width: 45%;
    border-radius: 1rem;

    @media (max-width: 480px) {
      margin: 1rem auto;
      padding: 0rem;
      max-width: 90%;
      border-radius: 0.5rem;
    }
  }
  .item {
    margin: 1.5rem auto;

    @media (max-width: 480px) {
      margin: 1rem auto;
    }
  }
`;
