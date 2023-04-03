import React from "react";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const data = [
  {
    id: 1,
    img: "/images/1.png",
    desc: ` Where Healthy & Happy Life Begins…`,
  },
  {
    id: 2,
    img: "/images/2.png",
    desc: ` Improving lives through Holistic wellness Model - The Integrative Therapeutic Approach  `,
  },
  {
    id: 3,
    img: "/images/3.png",
    desc: ` Empowering you towards a pain-free Life`,
  },
  {
    id: 4,
    img: "/images/4.png",
    desc: ` Transforming healthcare, One person at a time`,
  },
];

const Hero = () => {
  return (
    <Container>
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showArrows={true}
        showIndicators={false}
        showThumbs={false}
        interval={3000}
      >
        {data.map((item) => {
          return (
            <div key={item.id} className={`hero container hero${item.id}`}>
              <div className="hero-con">
                <h1 className="hero-head text-3xl font-extrabold">
                  ISHA Wellness Centre
                </h1>
                <p className="hero-para">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </Carousel>
    </Container>
  );
};

export default Hero;

const Container = styled.div`
  font-family: Verdana, Geneva, Tahoma, sans-serif;

  .hero {
    height: 100vh;
    min-width: 100vw;
    margin-bottom: 30px;
    background-size: cover;
    background-position: top center;
    position: relative;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .hero1 {
    background-image: url(/images/1.png);
  }
  .hero2 {
    background-image: url(/images/2.png);
  }
  .hero3 {
    background-image: url(/images/3.png);
  }
  .hero4 {
    background-image: url(/images/4.png);
  }
  .hero-con {
    color: inherit;
    font-weight: 400;
    margin-left: 20px;
    z-index: 2;
    color: white;
    width: 42%;
    text-align: center;
  }
  .hero-con:hover {
    display: block;
  }
  .hero::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100vw;
    background-color: black;
    opacity: 0.5;
    z-index: -1;
  }
  .hero img {
    width: 100vw;
    position: absolute;
    top: 5px;
    left: 4px;
  }

  .hero-head {
    margin-bottom: 10px;
    color: #fff;
  }
  .hero-para {
    font-size: 15px;
    letter-spacing: 1px;
    word-spacing: 2px;
  }
  .carousel > .control-dots .dot {
    background: #50acfb;
  }

  @media (max-width: 820px) {
    .container {
      max-height: 50vh;
    }

    .hero-con {
      font-weight: 400;
      text-align: center;
      margin-left: auto;
      margin-right: auto;
      font-size: x-large;
      margin: auto;
      width: 95%;
      top: 25%;
      right: 0;
      left: 0;
    }

    .hero-para {
      font-size: large;
    }
  }

  @media (max-width: 480px) {
    .container {
      max-height: 50vh;
    }

    .hero-con {
      font-weight: 400;
      text-align: center;
      margin-left: auto;
      margin-right: auto;
      font-size: 0.8rem;
      margin: auto;
      width: 95%;
      top: 25%;
      right: 0;
      left: 0;
    }

    .hero-para {
      font-size: 0.7rem;
    }
  }
`;
