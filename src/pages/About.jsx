import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'
import TechTeam from '../components/About/TechTeam'
import TherTeam from '../components/About/TherTeam'
import Achievement from '../components/About/Achievement'

const vision = `Dr. Minjan Patel and Dr. Hitesh Purohit had a shared vision to develop a system that would provide accessible and effective treatment for patients in need of physiotherapy and occupational therapy. The two met at the Indian Institute of Public Health Gandhinagar and their idea was strengthened. With a shared passion for public health and research, they established the organization AKAS during their post-graduate studies. After working for 6 years in Public Health Management and Research with various field NGOs in urban, rural, and tribal areas, they realized that the problems they sought to address were not limited to just urban areas and were causing even more suffering in rural and tribal areas. With their combined expertise in their respective therapies, extensive knowledge of public health and research, and a dedication to solve this problem , they developed treatment guidelines that were highly effective, more active than passive, easy to execute, and didn't relay on electrotherapy machines for recovery and sustainability. The next step was to train individuals with minimal background to execute the treatments under their guidance. As their experience grew, they realized that their approach could be scalable, replicable, and self-sustainable if supported by technology for supportive supervision and monitoring purposes. With their successful treatment model and the realization that expansion of services and research would require significant funding support, Dr. Minjan Patel and Dr. Hitesh Purohit made the decision to register a private limited company called 'Health Prism Limited'(HPL). The purpose of Health Prism was to develop and manage centres in urban areas to generate enough funds for research and provide services in rural and tribal areas where demand and paying capacity were not sufficient.Health Prism was established with the goal of improving access to effective physiotherapy and occupational therapy for all, regardless of location or financial background. With a combination of expertise, dedication, and innovative thinking, Dr. Patel and Dr. Purohit have been able to bring their vision to life and provide life-changing treatment to those in need.`

const about = `Isha Wellness Centre is a leading provider of holistic wellness services. The centre offers a wide range of services aimed at promoting physical, mental, and emotional well-being. With a team of highly trained and experienced wellness facilitators, Isha Wellness Centre is dedicated to helping people lead healthier and happier lives At Isha Wellness Centre, a personalized approach is taken to meet the unique needs of each individual. Whether it's through yoga, meditation, nutrition, or any other aspect of wellness, the centre's goal is to empower people to take control of their health and happiness. With a focus on both prevention and healing, the services offered at Isha Wellness Centre are designed to support individuals in all stages of their wellness journey.In addition to one-on-one consultations, Isha Wellness Centre also offers group classNamees, workshops, and retreats. These programs provide opportunities for individuals to learn, grow, and connect with others who share a similar commitment to wellness. With a commitment to education and research, Isha Wellness Centre stays at the forefront of the latest developments in the field of holistic wellness.In addition to one-on-one consultations, Isha Wellness Centre also offers group classNamees, workshops, and retreats. These programs provide opportunities for individuals to learn, grow, and connect with others who share a similar commitment to wellness. With a commitment to education and research, Isha Wellness Centre stays at the forefront of the latest developments in the field of holistic wellness. Overall, Isha Wellness Centre is a dynamic and thriving hub for wellness that offers a comprehensive and holistic approach to health and happiness. Whether you're looking to improve your physical health, manage stress, or simply cultivate a deeper sense of inner peace, Isha Wellness Centre is the perfect place to start.`

const founders = [
  {
    id: 0,
    name: 'Dr. Hitesh Purohit',
    image: '',
    about: `Dr. Hitesh Purohit is the Founder Director and President of AKAS and ISHA Wellness Centre. He holds a Bachelor's degree in Physical Therapy and a Post-Graduation in Public Health. Dr. Purohit is a highly skilled and passionate entrepreneur leader with a deep commitment to tech-led innovative ideas in organizing need-based systems for community health. With a wealth of experience and expertise in physical therapy and public health, Dr. Purohit is well-equipped to drive positive change and make a real difference to the lives of people in the community.`,
  },
  {
    id: 1,
    name: 'Dr. Minjan Patel',
    image: '',
    about: `Dr. Minjan Patel is the Founder Director and CEO at AKAS and Isha Wellness Centre. With a Bachelor's degree in Occupational Therapy and a post-graduation in Public Health, she has further honed her skills with a Master's in Rural Development. She is passionate about finding research-based solutions to improve community health through empowering and uplifting s communities through their participation and service provision. Dr. Patel is dedicated to making a positive impact on the health and well- being of communities.`,
  },
]

const About = () => {
  const { ref, inView } = useInView({ threshold: 0 })
  const animation = useAnimation()

  useEffect(() => {
    if (inView) {
      animation.start({
        opacity: 1,
        y: 0,
        transition: { type: 'spring', duration: 0.5, bounce: 0.5 },
      })
    }
  }, [inView])

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 100 }} animate={animation}>
      <Container className='sm:my-20 sm: mx-8'>
        <h1>
          A<span>bou</span>t Us
        </h1>
        <section className='about'>
          <div className='main sm:flex-col'>
            <img
              src='https://images.pexels.com/photos/5867730/pexels-photo-5867730.jpeg?auto=compress&cs=tinysrgb&w=600'
              alt=''
            />
            <div className='about-text sm:text-center sm:mx-auto sm:w-fit'>
              <h5 className='sm:flex sm:gap-1 w-fit'>
                our<span> vision</span>{' '}
              </h5>
              <p className='tracking-wide leading-relaxed text-justify'>
                {vision}
              </p>
            </div>
          </div>
        </section>
        <div>
          <Achievement />
        </div>
        <div className='founder '>
          Founder of<span> Ishawellness Center</span>
        </div>
        {founders.map((founder) => {
          return (
            <section key={founder.id} className='hum sm:py-4 sm:px-2'>
              <div className='tum'>
                <div className='job'>
                  <img
                    className='object-cover'
                    src='https://images.pexels.com/photos/5867730/pexels-photo-5867730.jpeg?auto=compress&cs=tinysrgb&w=600'
                    alt=''
                  />
                </div>
                <div className='kon'>
                  <h5>{founder.name}</h5>
                  <p>{founder.about}</p>
                </div>
              </div>
            </section>
          )
        })}
        <div>
          <TechTeam />
        </div>
        <div>
          <TherTeam />
        </div>
        <div className='founder'>
          About <span>Ishawellness</span> Center
        </div>
        <div className='papa'>
          <p className='tracking-wide leading-relaxed text-justify'>{about}</p>
        </div>
      </Container>
    </motion.div>
  )
}

export default About

const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Poppins&family=Work+Sans&display=swap");
  font-family: "Poppins", sans-serif;
  margin: 10rem 5rem;
  h1 {
    text-align: center;
    width: 100%;
    color: black;
    border-bottom: 3px solid black;
    font-size: 3rem;
    border-radius: 2px;
    margin-bottom: 2rem;
  }
  .about {
    width: 100%;
    padding: 2rem;
    background-color: #50acfb;
    border-radius: 1rem;
  }
  .about img {
    width: 350px;
    box-shadow: 10px 13px white;
    padding:1rem;
  }

  .main {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 4rem;
  }

  span {
    color: red;
  }
  .about-text h5 {
    font-size: x-large;
    border-bottom: 3px solid black;
    margin-bottom: 1rem;
  }
  .about-text p {
    font-size: small;
    color: black;
    font-weight: 500;
  }
  .founder {
    text-align: center;
    border-bottom: 3px solid black;
    font-size: 2rem;
    color: black;
    width: 80%;
    margin-top: 5rem;
    margin-bottom: 2rem;
    margin-left: auto;
    margin-right: auto;
  }
  .hum {
    background-color:white;
    padding: 0 3rem;
    padding-top: 6%;
    padding-bottom: 5%;
    margin-top: 3rem;
    border-radius: .5rem;
    box-shadow: inset 0px 250px #50acfb;
    border: 1px solid #50acfb;
    
  }
  .job {
    width: fit-content;
    margin: 0 auto;
    border-radius: 50%;
  }
  .tum img {
    border-radius: 80%;
    height: 250px;
    width: 250px;
    box-shadow: 5px 10px 15px 8px rgba(0, 0, 0, 0.5);
  }
  .kon h5 {
    margin: 1rem auto;
    width: fit-content;
    text-align: center;

    font-size: x-large;
    border-bottom: 3px solid black;

    border-color: blue;
  }

  .kon p {
    font-size: medium;
    color: black;
  }
  .daada {
    text-align: center;
    font-size: 2rem;
    color: black;
    margin-top: 4rem;
    margin-bottom: 2rem;
  }
  .papa {
    font-size: large;
    width:80%
    padding: 2rem;
    margin-top: 2rem;
    margin-bottom: 5rem;
  }

  .papa p {
    background-color: #50acfb;
    color: black;
    padding: 2rem;
    border-radius: 1rem;
    font-size: medium;
  }
  .ayush {
    margin-top: 3rem;
    width: 100%;
    background-color: rgb(172, 210, 245);
    border-radius: 1rem;
  }
  .ayush-papa {
    display: flex;
  }
  .ayush .baap p {
    font-size: medium;
    color: black;
    margin-left: 2rem;
    font-weight: 550;
  }
  .baap h5 {
    margin: 2rem;
    font-size: x-large;
    border-bottom: 3px solid black;
    width: 30%;
    border-color: green;
  }
  @media screen and (max-width: 480px){
    margin:5rem 1rem;
    .hum {
      padding: 1rem 0;
    }
    .main{
      gap: 0.8rem;
    }
    .about {
      padding: 0 0.5rem;
    }
    .about-text > h5 {
      margin: 0 auto 1rem;
    }
    .kon p {
      padding: 0 0.5rem;
      width: 100%;
    }
    .papa h3 {
      padding: 1rem 0.5rem;
    }
  }
`
