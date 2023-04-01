import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const data = [
  {
    id: 0,
    title: `How therepy helps to improve depression`,
    date: `2 days ago`,
    by: `Dr. Laura Croft`,
    img: `/images/blog/blog-img1.jpg`,
    link: `/`,
  },
  {
    id: 1,
    title: `How therepy helps to improve depression`,
    date: `4 days ago`,
    by: `Dr. Laura Croft`,
    img: `/images/blog/blog-img2.jpg`,
    link: `/`,
  },
  {
    id: 2,
    title: `How therepy helps to improve depression`,
    date: `10 days ago`,
    by: `Dr. Laura Croft`,
    img: `/images/blog/blog-img3.jpg`,
    link: `/`,
  },
];

const SliderBlogs = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    arrows: false,
    centerMode: true,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          dots: false,
          arrows: false,
          pauseOnHover: false,
          autoplay: true,
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <Container>
      <Slider {...settings} className="slider sm:p-4">
        {data.map((data) => {
          return (
            <div key={data.id} className="blog container">
              <div className="blog-item">
                <div className="blog-img">
                  <img src={data.img} alt="" />
                </div>
                <div className="blog-con">
                  <div className="blog-head">
                    <h3 className="blog-title">{data.title}</h3>
                    <p className="blog-date">{data.date}</p>
                  </div>
                  <p className="blog-para">{data.by}</p>
                  <div className="blog-button">
                    <a href={data.link}>Read more</a>
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

export default SliderBlogs;

const Container = styled.div`
  width: 100%;
  margin: 1rem auto;

  .blog {
    padding: 2rem 0;
  }

  .blog-item {
    background-color: #2d4e89;
    border-radius: 0.5rem;
    padding: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 80%;
    box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.2);
  }

  .blog-img {
    width: 50rem;
    position: relative;
    right: 80px;

    img {
      width: 100%;
      border-radius: 0.5rem;
    }
  }

  .blog-con {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 1rem 0 1rem 1rem;
    width: 70rem;
    margin-left: -3rem;
  }

  .blog-date {
    font-size: smaller;
    color: white;
    margin-bottom: 20px;
  }

  .blog-title {
    font-size: large;
    color: white;
  }

  .blog-para {
    font-size: 15px;
    color: white;
  }

  .blog-button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    width: 6rem;
    border-radius: 0.5rem;
    text-align: center;
    padding: auto;
    background-color: white;
    margin-top: 20px;

    a {
      color: black;
      text-decoration: none;
      font-size: smaller;
    }
  }

  .slider {
    margin: 1rem auto;
    .slick-dots li button:before {
      color: black;
    }
    .slick-dots li.slick-active button:before {
      color: black;
    }
  }

  @media (max-width: 480px) {
    .blog {
      padding: 1rem 0.5rem;
    }

    .blog-item {
      padding: 1rem 0;
      flex-direction: column;
      justify-content: center;
      width: 100%;
    }

    .blog-img {
      width: 80%;
      right: 0;

      img {
        width: 100%;
        border-radius: 0.5rem;
      }
    }

    .blog-con {
      padding: 1rem 0;
      width: 100%;
      margin-left: auto;
      align-items: center;
      text-align: center;
    }

    .blog-title {
      font-size: medium;
    }

    .slider {
      margin: 0.5rem auto;
    }
  }
`;
