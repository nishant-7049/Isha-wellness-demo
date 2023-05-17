import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const data = [
  {
    id: 0,
    docName: `Dr. Minjan Patel`,
    info: `She is an accomplished Occupational Therapist, Public Health Professional, and Health Researcher with extensive experience working as a consultant for the World Bank and the World Health Organization. She is also specialize in lifestyle coaching, spiritual practices, yoga, Community health and rural development, making her a versatile expert with a diverse range of skills.
    `,
    docImg: `/images/service/Dr.Minjan.png`,
  },
  {
    id: 1,
    docName: `Dr. Hitesh Purohit`,
    info: `He is an exceptional Physical Therapist, Public Health Professional, and Health Researcher with a talent for innovation and transformation. As an expert in tech-based health solutions, He has a unique ability to bring cutting-edge ideas to life, making them a visionary leader in the field`,
    docImg: `/images/service/Dr.Hitesh.png`,
  },
];

const SliderImg = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
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
          dots: true,
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
                  <h3 className="the-name text-center text-xl font-semibold">
                    {data.docName}
                  </h3>
                  <div className="the-exp ">
                    <p className=" text-sm tracking-wide leading-5">
                      {data.info}
                    </p>
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
    min-height: 12rem;
    display: flex;
    justify-content: space-between;
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
      height: fit-content;

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
  // background-color: #00286b;
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
    color: #00286b;
  }
  .the-image {
    width: 40%;
  }
  .the-image img {
    width: 100%;
    padding: 1rem;
  }
  .the-exp {
    height: 14.5rem;
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
