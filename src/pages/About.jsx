import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import TechTeam from "../components/About/TechTeam";
import TherTeam from "../components/About/TherTeam";
import Achievement from "../components/About/Achievement";

const vision = `Our vision is a world where everyone has access to evidence based Integrative therapy and support, leading to a fulfilling pain-free life, with empowered patients taking control of their health and well-being.`;

const mission = `Our mission is to provide evidence-based, patient-centered therapy services that address the root cause of MsNDs and lifestyle-related NCDs. Through our holistic wellness model, we aim to empower patients with the tools and resources they need to achieve long-term health and wellness, regardless of their age, occupation, or economic status. We are committed to increasing awareness about the impact of musculoskeletal pain on other health conditions and providing accessible, sustainable, and cost-effective therapy solutions that promote patient empowerment and support patients in achieving their health goals.`;

const about = [
  `Welcome to Isha Wellness Centre, a place where we are committed to providing evidence-based, patient-centered therapy services that address the root cause of musculoskeletal and lifestyle-related disorders. Our goal is to empower patients with the knowledge, resources, and support they need to achieve long-term health and wellness, regardless of their age, occupation, or economic status. At Isha Wellness Centre, we believe in the power of holistic wellness and offer a range of services that address physical, emotional, and spiritual well-being. Our team of expert therapists is dedicated to providing personalized care to each patient, ensuring that they receive the best possible treatment for their unique needs. `,
  `We are proud to offer a wide range of services, including musculoskeletal pain management, paralysis care, child therapy, pregnancy care, lifestyle management, balanced digestion, healthy aging, technology detoxification, employee wellness, relational well-being, depression and anxiety relief, financial well-being, and hormone balance therapy. We also understand the importance of community wellness and have developed a program to make our therapy services accessible to as much of the population as possible. We believe that everyone should have access to high-quality healthcare and are committed to doing our part to improve the health and well-being of our community. `,
  `Thank you for choosing Isha Wellness Centre as your partner in health and wellness. We look forward to helping you achieve your health goals and living your best life.`,
];

const founders = [
  {
    id: 0,
    name: "Dr. Hitesh Purohit",
    image: "",
    about: [
      `Meet Dr. Hitesh Purohit, our Founder Director and President - a visionary leader and passionate healthcare entrepreneur dedicated to improving community health through technology-led innovations. With a Bachelor's degree in Physical Therapy and a Post-Graduation in Public Health, Dr. Purohit brings a wealth of experience and expertise to his work at ISHA Wellness Centre. He is a Founder Director of Healthprizm Private Limited and Aarogyam Knowledge to Action Society. His deep commitment to creating need-based systems for community health has driven him to develop effective, sustainable models that make a real difference in people's lives. Dr. Purohit's exceptional skills and unwavering dedication to his work inspire us every day to continue striving for excellence in the field of wellness.`,
      `Dr. Purohit's contributions to the development of various innovative community models have been recognized and awarded by many conferences. His work has been covered in various regional and national newspapers and blogs, and he has research publications to his credit. He has also worked on various technology-based health solutions and provides consultation to organizations such as WHO, UNICEF, IIPHG, PHFI, local governments, and various national and international NGOs.`,
      `As a trainer and mentor, Dr. Purohit has trained around 1000 health workers and provided wellness and therapy consultations to 20000 individuals. He firmly believes in effective solutions and systems, innovative tech-based solutions, and self-sustainable systems. Dr. Purohit's passion for improving community health through technology-led innovations has made him a true healthcare pioneer, and we are honored to have him as the driving force behind our mission at ISHA Wellness Centre and HPL.`,
    ],
  },
  {
    id: 1,
    name: "Dr. Minjan Patel",
    image: "",
    about: [
      `Dr. Minjan Patel, our Founder Director and CEO, is a true visiona dedicated to improving community health through her research-based solutions and passion for Healthy Community. With a Bachelor's degree in Occupational Therapy, a post-graduation in Public Health, and a Master's in Rural Development, Dr. Patel has honed her skills and expertise to make a real difference in the health and well-being of communities. She is the Founder Director of Healthprizm Private limited and Aarogyam Knowledge to Action Society - a non-profit platform. `,

      `Dr. Patel's passion for finding research-based solutions to empower and uplift communities and individuals is remarkable. With her inspiring vision and tireless dedication to improving community health, Dr. Patel is a true champion of wellness and a source of inspiration for all who work with her." She has contributed to primary health care, women and adolescent health, and midwifery practices with the World Bank, WHO, and IIPHG at state, national, and international levels. She has provided consultation to remarkable public health interventions and research with organizations like UNICEF, IIPHG, PHFI, and various international and national NGOs.`,

      `Dr. Patel's experience in lifestyle management and wellness industry is crucial to complete the wellness services. She has trained over 1800 health workers and provided health education to over 13000 women and 8000 non-school/school children and adolescents. Additionally, she has contributed to wellness services for 8000+ community members in urban and rural areas of Gujarat and Madhya Pradesh.`,

      `With 15+ years of experience as a public health manager, trainer, researcher, and health & wellness coach, Dr. Patel has developed health modules for the Government of India, Government of Gujarat, and various NGOs. Her outstanding research contributions have led to better health services, programs, and policies. She has been covered in various international and national media channels, newspapers, magazines, and blogs, and has published numerous research papers. Dr. Patel has been awarded and appreciated in many conferences for her work presentations, highlighting her commitment to making a positive impact on the health and well-being of communities. `,
    ],
  },
];

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { type: "spring", duration: 0.5, bounce: 0.5 },
      }}
    >
      <Container className="sm:my-20 sm: mx-8">
        <h1>
          A<span>bou</span>t Us
        </h1>
        <section className="about">
          <div className="main sm:flex-col">
            <img
              src="https://images.pexels.com/photos/5867730/pexels-photo-5867730.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
            />
            <div className="flex flex-col justify-center gap-6 items-center about-text sm:text-center sm:mx-auto sm:w-fit">
              <div>
                <h5 className="sm:flex sm:gap-1 w-fit">
                  Our<span> Vision</span>{" "}
                </h5>
                <p className="tracking-wide leading-relaxed text-justify">
                  {vision}
                </p>
              </div>
              <div>
                <h5 className="sm:flex sm:gap-1 w-fit">
                  Our<span> Mission</span>{" "}
                </h5>
                <p className="tracking-wide leading-relaxed text-justify">
                  {mission}
                </p>
              </div>
            </div>
          </div>
        </section>
        <div>
          <Achievement />
        </div>
        <div className="founder">
          About <span>Ishawellness</span> Center
        </div>
        <div className="papa ">
          {about.map((about) => {
            return (
              <p className=" tracking-wide leading-relaxed text-justify">
                {about}
              </p>
            );
          })}
        </div>

        <div className="founder ">
          Founder of<span> Ishawellness Center</span>
        </div>
        <p className="w-[80%] mx-auto text-center">
          Meet the dynamic duo behind ISHA Wellness Centre, Dr. Minjan Patel and
          Dr. Hitesh Purohit. As co-founders of Aarogyam Knowledge to Action
          Society (AKAS) and Healthprizm Pvt. Ltd. (HPL), they bring a wealth of
          knowledge and expertise to the table.
        </p>
        <p className="w-[80%] mx-auto text-center">
          Together, these two visionaries have a shared goal of bringing
          evidence-based, patient-centered therapy services to everyone. With
          their combined knowledge, experience, and commitment to community
          health, they are leading the way in making holistic wellness
          accessible and achievable for all.
        </p>
        {founders.map((founder) => {
          return (
            <section key={founder.id} className="hum sm:py-4 sm:px-2">
              <div className="tum">
                <div className="job">
                  <img
                    className="object-cover"
                    src="https://images.pexels.com/photos/5867730/pexels-photo-5867730.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt=""
                  />
                </div>
                <div className="kon">
                  <h5>{founder.name}</h5>
                  <div className="h-[10rem] pr-2 overflow-y-auto ">
                    {founder.about.map((about) => {
                      return <p>{about}</p>;
                    })}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
        <div>
          <TechTeam />
        </div>
        <div>
          <TherTeam />
        </div>
      </Container>
    </motion.div>
  );
};

export default About;

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
    margin-top: 2rem;
    margin-bottom: 5rem;
    border-radius: 1rem;
    background-color: #50acfb;
    padding: 2rem 0;
  }

  .papa p {
    padding: 0 3rem;  
    color: black;
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
`;
