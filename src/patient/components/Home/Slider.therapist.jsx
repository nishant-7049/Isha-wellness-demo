import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const data = [
  {
    id: 0,
    docName: `Dr. Minjan Patel`,
    info: [
      `Occupational Therapist`,
      `Public Health Professional, Health Researcher`,
      `World Bank Consultant`,
      `WHO cunsultant`,
      `Rural Development expert`,
    ],
    docImg: `/images/service/img (1).png`,
  },
  {
    id: 1,
    docName: `Dr. Hitesh Purohit`,
    info: [
      `Physical Therapist`,
      `Public Health Professional`,
      `Health Researcher`,
    ],
    docImg: `/images/service/img (3).png`,
  },
];

const SliderImg = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: false,
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
            <Items key={data.id}>
              <div className="the-details">
                <div className="the-con flex-1">
                  <h3 className="the-name text-center text-xl">
                    {data.docName}
                  </h3>
                  <div className="the-exp ">
                    {data.info.map((data) => {
                      return <p>{data}</p>;
                    })}
                  </div>
                </div>
                <div className="the-image">
                  <img src={data.docImg} alt="" />
                </div>
              </div>
            </Items>
          );
        })}
      </Slider>
    </Container>
  );
};

export default SliderImg;

const Container = styled.div`
  margin: 2rem auto;

  .slider {
    cursor: grab;
    width: 80%;
    margin: 0 auto;
    .slick-dots li button:before {
      color: white;
    }
    .slick-dots li.slick-active button:before {
      color: white;
    }
  }
  .the-con {
    min-height: 13rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media screen and (max-width: 1024px) {
    .the-con {
      font-size: 15px;
    }
  }

  @media screen and (max-width: 480px) {
    .the-details {
      flex-direction: column-reverse;
      justify-content: center;

      .the-image {
        margin: 1rem;
        img {
          padding: 0;
        }
      }
    }
  }
`;
const Items = styled.div`
  // background-color: #50acfb;
  .the-details {
    display: flex;
    width: 90%;
    margin: 1rem auto;
    justify-content: space-evenly;
    align-items: center;
    background-color: #fff;
    padding: 2rem 1.5rem;
    border-radius: 0.5rem;
  }
  .the-details:hover {
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
  }
  .the-name {
    color: #50acfb;
  }
  .the-image {
    width: 40%;
  }
  .the-image img {
    width: 100%;
    padding: 1rem;
  }
  .the-exp {
    height: 8rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0.5rem;
    -ms-flex-align: start;
  }

  .the-para {
    margin-left: 0.5rem;
  }
`;
