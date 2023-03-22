import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const data = [
  {
    id: 0,
    img: "/images/img (1).png",
    name: "salman khan ",
    post: "movie star ",
    edu: "12 pass",
    other: "bhai jaan",
  },
  {
    id: 1,
    img: "/images/img (2).png",
    name: "shahrukh khan ",
    post: " movie star",
    edu: "11 pass",
    other: "king khan",
  },
  {
    id: 2,
    img: "/images/img (3).png",
    name: "amir khan",
    post: "movie star",
    edu: "12 pass",
    other: "MR.perfect",
  },
  {
    id: 3,
    img: "/images/img (1).png",
    name: "akshay kumar",
    post: "movie star",
    edu: "12 pass",
    other: "khiladi",
  },
  {
    id: 4,
    img: "/images/img (2).png",
    name: "ajay devgun",
    post: "movie star",
    edu: "12 pass",
    other: "singham",
  },
];
const TherTeam = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
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
    <Container className="bg-gray-100 p-8 px-15 pb-16 mt-20">
      <h2 className="text-center text-4xl mb-6 mt-[2rem]">
        Therapist <span className=" text-red-700">Team</span>
      </h2>
      <Slider {...settings}>
        {data.map((data) => {
          return (
            <div key={data.id} className="px-4 my-4">
              <div className="card-container ">
                <div className="card-image w-full">
                  <img src={data.img} alt="/" className=" w-[100%]" />
                </div>
                <div className="card-body">
                  <span className="card-badge card-badge-blue">
                    {data.name}
                  </span>
                  <h1> {data.post}</h1>
                  <p className="card-subtitle">{data.edu}</p>

                  <div className="author-info">
                    <p className="author-name">{data.other}</p>
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

  .card-body h1 {
    font-size: 16px;
    margin: 8px 0;
  }

  .card-body p {
    font-size: 14px;
    margin: 8px 0 16px 0;
  }

  .card-author {
    display: flex;
    align-items: center;
  }

  .card-author p {
    margin: 0 16px;
    font-size: 12px;
  }

  .card-author p:last-child {
    color: #888;
  }

  .card-author img {
    border-radius: 50%;
    height: 48px;
    width: 48px;
    margin-top: auto;
  }

  @media screen and (max-width: 1000px) {
    .container {
      grid-template-columns: 1fr;
    }
  }
`;
