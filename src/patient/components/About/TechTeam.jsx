import React from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const data = [
  {
    id: 0,
    img: '/images/service/img (1).png',
    name: 'Member 1',
    post: 'Dev 1',
    edu: 'From boston university',
  },
  {
    id: 1,
    img: '/images/service/img (2).png',
    name: 'Member 2',
    post: 'Dev 2',
    edu: 'From boston university',
  },
  {
    id: 2,
    img: '/images/service/img (3).png',
    name: 'Member 3',
    post: 'Dev 3',
    edu: 'From boston university',
  },
  {
    id: 3,
    img: '/images/service/img (1).png',
    name: 'Member 4',
    post: 'Dev 4',
    edu: 'From boston university',
  },
  {
    id: 4,
    img: '/images/service/img (2).png',
    name: 'Member 5',
    post: 'Dev 5',
    edu: 'From boston university',
  },
]
const TechTeam = () => {
  const settings = {
    dots: false,
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
          slidesToShow: 1,

        },
      },
    ],
  }
  return (
    <Container className='bg-gray-100 p-4 px-8 pb-16'>
      <h2 className='text-center text-4xl mb-8 mt-[2rem] border-b-[3px] w-[80%] mx-auto pb-4 border-black'>
        Technical <span className=' text-red-700'>Team</span>
      </h2>
      <Slider {...settings}>
        {data.map((data) => {
          return (
            <div key='data.id' className='px-4 '>
              <div
                key={data.id}
                className='card swiper-slide border-[1px] border-blue-600 '
              >
                <div className='image-content'>
                  <span className='overlay'></span>

                  <div className='card-image'>
                    <img src={data.img} alt='/' className='card-img' />
                  </div>
                </div>

                <div className='card-content'>
                  <h2 className='name'>{data.name}</h2>
                  <p className='description'>{data.post}</p>
                  <p className='description'>{data.edu}</p>
                </div>
              </div>
            </div>
          )
        })}
      </Slider>
    </Container>
  )
}

export default TechTeam
const Container = styled.div`
  .card {
    border-radius: 10px;
    background-color: #fff;
  }
  .image-content,
  .card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 14px;
  }
  .image-content {
    position: relative;
    row-gap: 5px;
    padding: 25px 0;
  }
  .overlay {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: #4070f4;
    border-radius: 10px 10px 0 25px;
  }
  .overlay::before,
  .overlay::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: -40px;
    height: 40px;
    width: 40px;
    background-color: #4070f4;
  }
  .overlay::after {
    border-radius: 0 25px 0 0;
    background-color: #fff;
  }
  .card-image {
    position: relative;
    height: 150px;
    width: 150px;
    border-radius: 50%;
    background: #fff;
    padding: 3px;
  }
  .card-image .card-img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
    border: 4px solid #4070f4;
  }
  .name {
    font-size: 28px;
    font-weight: 600;
    color: #333;
  }
  .description {
    font-size: 14px;
    color: #707070;
    text-align: center;
  }
`
