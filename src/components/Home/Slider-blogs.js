import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderBlogs = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
  };
  return (
    <Container>
      <Slider {...settings} className='slider'>
        <div className="blog container">
          <div className="blog-item">
            <div className="blog-img">
              <img src="/images/blog-img1.jpg" alt="" />
            </div>
            <div className="blog-con">
              <div className="blog-head">
                <h3 className="blog-title">Back Pain</h3>
                <p className="blog-date">2020 dec 14</p>
              </div>
              <p className="blog-para">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                nam, aspernatur quisquam commodi ullam neque. Eos nesciunt vel
                quam unde.
              </p>
              <div className="blog-button">
                <a href="Blogs">Read more</a>
              </div>
            </div>
          </div>
        </div>
        <div className="blog container">
          <div className="blog-item">
            <div className="blog-img">
              <img src="/images/blog-img1.jpg" alt="" />
            </div>
            <div className="blog-con">
              <div className="blog-head">
                <h3 className="blog-title">Back Pain</h3>
                <p className="blog-date">2020 dec 14</p>
              </div>
              <p className="blog-para">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                nam, aspernatur quisquam commodi ullam neque. Eos nesciunt vel
                quam unde.
              </p>
              <div className="blog-button">
                <a href="Blogs">Read more</a>
              </div>
            </div>
          </div>
        </div>
        <div className="blog container">
          <div className="blog-item">
            <div className="blog-img">
              <img src="/images/blog-img1.jpg" alt="" />
            </div>
            <div className="blog-con">
              <div className="blog-head">
                <h3 className="blog-title">Back Pain</h3>
                <p className="blog-date">2020 dec 14</p>
              </div>
              <p className="blog-para">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                nam, aspernatur quisquam commodi ullam neque. Eos nesciunt vel
                quam unde.
              </p>
              <div className="blog-button">
                <a href="Blogs">Read more</a>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </Container>
  );
};

export default SliderBlogs;

const Container = styled.div`
  width: 90%; 
  margin: 1rem auto;

  .blog {
    padding: 1rem 2rem;
    
  }
  .blog-item {
    background-color: #F8C7DC;
    border-radius: 0.5rem;
    padding: 5% 0 5% 3rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 90%;
    box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.2 )
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
    padding: 1rem 1rem;
    width: 70rem;
    margin-left: -3rem;
  }

  .blog-date {
    font-size: smaller;
    color: white;
    margin-bottom: 20px;
  }

  .blog-title {
    font-size: x-large;
    color: white;
  }

  .blog-para {
    font-size: 15px;
  }

  .blog-button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    width: 6rem;
    border-radius: 1rem;
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
  }
`;
