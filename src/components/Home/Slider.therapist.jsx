import React from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import { MdSchool } from 'react-icons/md'
import { MdWork } from 'react-icons/md'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const data = [
  {
    id: 0,
    docName: `Dr. Name Lastname`,
    experience: `5 Years of Experience`,
    school: `This College of Science`,
    docImg: `/images/doc1.png`,
  },
  {
    id: 1,
    docName: `Dr. Name Lastname`,
    experience: `10 Years of Experience`,
    school: `This College of Science`,
    docImg: `/images/doc2.png`,
  },
  {
    id: 2,
    docName: `Dr. Name Lastname`,
    experience: `12 Years of Experience`,
    school: `This College of Science`,
    docImg: `/images/doc1.png`,
  },
  {
    id: 3,
    docName: `Dr. Name Lastname`,
    experience: `10 Years of Experience`,
    school: `This College of Science`,
    docImg: `/images/doc2.png`,
  },
]

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
          dots: false,
          pauseOnHover: false,
        },
      },
    ],
  }
  return (
    <Container>
      <Slider className='slider' {...settings}>
        {data.map((data) => {
          return (
            <Items key={data.id}>
              <div className='the-details'>
                <div className='the-con'>
                  <h3 className='the-name'>{data.docName}</h3>
                  <span className='the-exp'>
                    <MdWork />
                    <p className='the-para'>{data.experience}</p>
                  </span>
                  <span className='the-edu'>
                    <MdSchool />
                    <p className='the-para'>{data.school}</p>
                  </span>
                </div>
                <div className='the-image'>
                  <img src={data.docImg} alt='' />
                </div>
              </div>
            </Items>
          )
        })}
      </Slider>
    </Container>
  )
}

export default SliderImg

const Container = styled.div`
  margin: 2rem auto;

  .slider {
    cursor: grab;
    width: 80%;
    margin: 0 auto;
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
      }
    }
  }
`
const Items = styled.div`
  background-color: #f4c9db;
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
    margin-bottom: 1.2rem;
    color: #1c75bc;
  }
  .the-image {
    width: 40%;
  }
  .the-image img {
    width: 100%;
  }
  .the-exp,
  .the-edu {
    margin: 0 auto;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    padding: 0.5rem;
    -ms-flex-align: start;
    align-items: center;
  }

  .the-para {
    margin-left: 0.5rem;
  }
`
