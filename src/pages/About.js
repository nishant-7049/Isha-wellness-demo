import React from "react";
import styled from "styled-components";

const About = () => {
  return (
    <Container>
      <h3 className="main-head">About Us</h3>
      <div className="vision">
        <div className="vision-text">
          <div className="vision-info">
            <h3 className="vision-head">Our Vision</h3>
            <p>
              {" "}
              Dr. Minjan Patel and Dr. Hitesh Purohit had a shared vision to
              develop a system that would provide accessible and effective
              treatment for patients in need of physiotherapy and occupational
              therapy. The two met at the Indian Institute of Public Health
              Gandhinagar and their idea was strengthened. With a shared passion
              for public health and research, they established the organization
              AKAS during their post-graduate studies. After working for 6 years
              in Public Health Management and Research with various field NGOs
              in urban, rural, and tribal areas, they realized that the problems
              they sought to address were not limited to just urban areas and
              were causing even more suffering in rural and tribal areas.
            </p>
            <p>
              {" "}
              With their combined expertise in their respective therapies,
              extensive knowledge of public health and research, and a
              dedication to solve this problem, they developed treatment
              guidelines that were highly effective, more active than passive,
              easy to execute, and didn't relay on electrotherapy machines for
              recovery and sustainability. The next step was to train
              individuals with minimal background to execute the treatments
              under their guidance. As their experience grew, they realized that
              their approach could be scalable, replicable, and self-sustainable
              if supported by technology for supportive supervision and
              monitoring purposes.
            </p>
            <p>
              {" "}
              With their successful treatment model and the realization that
              expansion of services and research would require significant
              funding support, Dr. Minjan Patel and Dr. Hitesh Purohit made the
              decision to register a private limited company called 'Health
              Prism Limited'(HPL). The purpose of Health Prism was to develop
              and manage centres in urban areas to generate enough funds for
              research and provide services in rural and tribal areas where
              demand and paying capacity were not sufficient.
            </p>
            <p>
              {" "}
              Health Prism was established with the goal of improving access to
              effective physiotherapy and occupational therapy for all,
              regardless of location or financial background. With a combination
              of expertise, dedication, and innovative thinking, Dr. Patel and
              Dr. Purohit have been able to bring their vision to life and
              provide life-changing treatment to those in need.
            </p>
          </div>
        </div>
        <div className="images">
          <img src="images/Owner.jpg" alt="/" />
          <img src="images/owner1.jpg" alt="/" />
        </div>
      </div>
      <div className="achievement">
        <h3 className="ach-head">Achievements</h3>
        <div className="ach-cards">
          <div className="ach-card">
            <h4>Trained Wellness Facilitators</h4>
            <p>20+</p>
          </div>
          <div className="ach-card">
            <h4>Imparted wellness Education through camps</h4>
            <p>12000+</p>
          </div>
          <div className="ach-card">
            <h4>Wellness consultation</h4>
            <p>15000+</p>
          </div>
          <div className="ach-card">
            <h4>Wellness therapy sessions</h4>
            <p>60000+</p>
          </div>
        </div>
      </div>
      <div className="founders">
        <h3 className="founder-head">Founders of Ishacare wellness</h3>
        <div className="founder-info">
          <div className="founder-text ">
            <div className="founder-img">
              <img src="images/owner2.jpg" alt="/" />
            </div>
            <p>
              <h3 className="founder-name">Dr. Hitesh Purohit</h3>
              Dr. Hitesh Purohit is the Founder Director and President of AKAS
              and ISHA Wellness Centre. He holds a Bachelor's degree in Physical
              Therapy and a Post-Graduation in Public Health. Dr. Purohit is a
              highly skilled and passionate entrepreneur leader with a deep
              commitment to tech-led innovative ideas in organizing need-based
              systems for community health. With a wealth of experience and
              expertise in physical therapy and public health, Dr. Purohit is
              well-equipped to drive positive change and make a real difference
              to the lives of people in the community.
            </p>
          </div>
          <div className="founder-text founder-text1">
            <p>
              <h3 className="founder-name">Dr. Minjan Patel</h3>
              Dr. Minjan Patel is the Founder Director and CEO at AKAS and Isha
              Wellness Centre. With a Bachelor's degree in Occupational Therapy
              and a post-graduation in Public Health, she has further honed her
              skills with a Master's in Rural Development. She is passionate
              about finding research-based solutions to improve community health
              through empowering and uplifting communities through their
              participation and service provision. Dr. Patel is dedicated to
              making a positive impact on the health and well-being of
              communities.
            </p>
            <div className="founder-img">
              <img src="images/owner2.jpg" alt="/" />
            </div>
          </div>
        </div>
      </div>

      <div className="isha">
        <div className="isha-con">
          <div className="isha-info">
            <h3 className="isha-head">About Ishawellness Center</h3>
            <p>
              Isha Wellness Centre is a leading provider of holistic wellness
              services. The centre offers a wide range of services aimed at
              promoting physical, mental, and emotional well-being. With a team
              of highly trained and experienced wellness facilitators, Isha
              Wellness Centre is dedicated to helping people lead healthier and
              happier lives.
            </p>
            <p>
              At Isha Wellness Centre, a personalized approach is taken to meet
              the unique needs of each individual. Whether it's through yoga,
              meditation, nutrition, or any other aspect of wellness, the
              centre's goal is to empower people to take control of their health
              and happiness. With a focus on both prevention and healing, the
              services offered at Isha Wellness Centre are designed to support
              individuals in all stages of their wellness journey.
            </p>
            <p>
              In addition to one-on-one consultations, Isha Wellness Centre also
              offers group classes, workshops, and retreats. These programs
              provide opportunities for individuals to learn, grow, and connect
              with others who share a similar commitment to wellness. With a
              commitment to education and research, Isha Wellness Centre stays
              at the forefront of the latest developments in the field of
              holistic wellness.
            </p>
            <p>
              In addition to one-on-one consultations, Isha Wellness Centre also
              offers group classes, workshops, and retreats. These programs
              provide opportunities for individuals to learn, grow, and connect
              with others who share a similar commitment to wellness. With a
              commitment to education and research, Isha Wellness Centre stays
              at the forefront of the latest developments in the field of
              holistic wellness.
            </p>
            <p>
              Overall, Isha Wellness Centre is a dynamic and thriving hub for
              wellness that offers a comprehensive and holistic approach to
              health and happiness. Whether you're looking to improve your
              physical health, manage stress, or simply cultivate a deeper sense
              of inner peace, Isha Wellness Centre is the perfect place to
              start.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default About;

const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Poppins&family=Work+Sans&display=swap");
  font-family: "Poppins", sans-serif;
  .about {
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
  .main-head {
    padding-bottom: 1.5rem;
    margin: 5rem 0 2rem 0;
    font-size: 3rem;
    text-align: center;
    color: #f480b1;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.3);
  }
  .vision {
    margin: 2rem auto;
    width: 90%;
    display: flex;
    justify-content: space-around;
    background-color: #ffb5d4;
    > div {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      padding: 2rem;
    }
  }
  .vision-info {
    background-color: white;
    padding: 2rem;
    width: 90%;
    border-radius: 1.5rem;
    margin: 1rem auto;
    > p {
      color: #9b9b9b;
    }
  }
  .vision-head,
  .founder-head,
  .founder-name,
  .isha-head,
  .ach-head {
    text-align: center;
    font-weight: 700;
    margin: 1rem;
    color: #f480b1;
    font-size: 1.5rem;
  }
  .isha-head {
    margin-top: 0;
  }
  .founder-head {
    font-size: 2rem;
    margin: 4rem;
  }
  .founder-name {
    font-size: 1.25rem;
  }

  .images {
    display: flex;
    flex-direction: column;
    width: 30%;

    > img {
      object-fit: scale-down;
      border-radius: 1rem;
    }
  }
  .founder-info {
    width: 90%;
    margin: 0 auto;
    padding: 2rem;
    background-color: #ffb5d4;
  }
  .founder-text {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    > p {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
      justify-content: center;
      border-radius: 1.5rem;
      width: 80%;
      background-color: white;
      padding: 2rem;
      color: #9b9b9b;
    }
  }
  .founder-img {
    width: 30%;
    > img {
      width: 100%;
      border-radius: 1.5rem;
    }
  }
  .isha-con {
    width: 90%;
    margin: 3rem auto;
    background-color: #ffb5d4;
    padding: 2rem;
  }
  .isha-info {
    background-color: white;
    padding: 2rem;
    border-radius: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    > p {
      color: #9b9b9b;
    }
  }
  .ach-cards {
    width: 90%;
    margin: 2rem auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20%, 1fr));

    grid-gap: 1rem;
  }
  .ach-head {
    font-size: 2.5rem;
  }
  .ach-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
    align-items: center;
    text-align: center;
    background-color: #f8c7dc;
    height: 10rem;
    border-radius: 0.8rem;
    > h4 {
      font-weight: 700;
      color: #414141;
    }
    > p {
      font-size: 2rem;
      font-weight: 700;
      color: white;
    }
  }
  @media screen and (max-width: 780px) {
    .vision {
      flex-direction: column-reverse;
    }
    .images {
      width: 100%;
    }
    .vision-info {
      width: 100%;
    }
    .founder-text {
      flex-direction: column;
      align-items: center;
    }
    .founder-text1 {
      flex-direction: column-reverse;
    }
    .founder-img {
      width: 80%;
    }
  }
  @media screen and (max-width: 680px) {
    .ach-cards {
      grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
    }
    .founder-text{
      padding: 0.3rem;
    }
    .founder-info{
      padding: 2rem 0;
    }
  }
  @media screen and (max-width: 480px) {
    .ach-cards {
      grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
    }
  }
`;
