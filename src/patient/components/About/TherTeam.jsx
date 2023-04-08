import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const data = [
  {
    id: 0,
    img: "/images/service/img (1).png",
    name: "salman khan ",
    post: "Film Star ",
    edu: "Prinction University",
    other: "bhai jaan",
  },
  {
    id: 1,
    img: "/images/service/img (2).png",
    name: "shahrukh khan ",
    post: " Film Star",
    edu: "11 pass",
    other: "king khan",
  },
  {
    id: 2,
    img: "/images/service/img (1).png",
    name: "amir khan",
    post: "Film Star",
    edu: "Prinction University",
    other: "MR.perfect",
  },
  {
    id: 3,
    img: "/images/service/img (2).png",
    name: "akshay kumar",
    post: "Film Star",
    edu: "Prinction University",
    other: "khiladi",
  },
];
const TherTeam = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1020,
        settings: {
          dots: false,
          arrows: false,
          pauseOnHover: false,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 720,
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
    <Container className="bg-gray-100 p-8 px-15 pb-4 mt-8">
      <h2 className="text-center text-3xl font-extrabold text-[#00286b]  mb-6  border-b-[3px] w-[80%] mx-auto pb-4 border-[#00286b]">
        Our Wellness Team
      </h2>
      <Slider {...settings}>
        {data.map((data) => {
          return (
            <div key={data.id} className="px-4 my-4">
              <div className="card-container ">
                <div className="card-image w-full">
                  <img src={data.img} alt="/" className="w-full object-cover" />
                </div>
                <div className="card-body">
                  <div className="flex justify-between items-center w-full">
                    <span className="card-badge card-badge-blue">
                      {data.name}
                    </span>
                    <p> {data.post}</p>
                  </div>
                  <div className="border-b-[2px] opacity-50 w-[80%] mx-auto pb-4 border-black"></div>
                  <div className="mt-4 ml-2 h-fit">
                    <p>{data.edu}</p>
                    <p>{data.other}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </Container>
  );
};

export default TherTeam;
const Container = styled.div`
  .card-container {
    height: 400px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  }

  .card-image img {
    height: 220px;
    width: 100%;
    border-radius: 8px 8px 0 0;
    background-size: cover;
  }

  .card-body {
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 16px;
    min-height: 200px;
  }

  .card-badge {
    text-transform: uppercase;
    background-color: #fff;
    color: #fff;
    padding: 2px 8px;
    border-radius: 70px;
    margin: 0;
    font-size: 12px;
  }

  .card-badge-blue {
    background-color: #92d4e4;
  }

  .card-badge-purple {
    background-color: #3d1d94;
  }

  .card-badge-pink {
    background-color: #c62bcb;
  }

  .card-body p {
    font-size: small;
  }

  .card-body p {
    font-size: 14px;
    margin: 8px 0 16px 0;
  }

  @media screen and (max-width: 1000px) {
    .container {
      grid-template-columns: 1fr;
    }
  }
`;
