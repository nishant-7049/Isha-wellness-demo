import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import TechTeam from "../components/About/TechTeam";
import TherTeam from "../components/About/TherTeam";
import Achievement from "../components/About/Achievement";

const vision = `Our vision is a world where everyone has access to evidence based Integrative therapy and support, leading to a fulfilling pain-free life, with empowered patients taking control of their health and well-being.`;

const mission = `Our mission is to provide evidence-based, patient-centered therapy services that address the root cause of MsNDs and lifestyle-related NCDs. Through our holistic wellness model, we aim to empower patients with the tools and resources they need to achieve long-term health and wellness, regardless of their age, occupation, or economic status. We are committed to increasing awareness about the impact of musculoskeletal pain on other health conditions and providing accessible, sustainable, and cost-effective therapy solutions that promote patient empowerment and support patients in achieving their health goals.`;

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
          About <span>Us</span>
        </h1>
        <section className="about">
          <div className="main md:flex-col sm:flex-col">
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
          <p className="my-3 tracking-wide leading-relaxed text-justify">
            <span>Welcome to Isha Wellness Centre,</span> a place where we are
            committed to providing{" "}
            <span>evidence-based, patient-centered therapy services </span> that
            address the root cause of musculoskeletal and lifestyle-related
            disorders. Our goal is <span>to empower patients</span> with the
            knowledge, resources, and support they need to achieve long-term
            health and wellness, regardless of their age, occupation, or
            economic status. At Isha Wellness Centre, we believe in the power of{" "}
            <span>holistic wellness</span> and offer a range of services that
            address physical, emotional, and spiritual well-being. Our team of
            expert therapists is dedicated{" "}
            <span>to providing personalized care</span> to each patient,
            ensuring that they receive the best possible treatment for their
            unique needs.
          </p>
          <p className="my-3 tracking-wide leading-relaxed text-justify">
            We are proud to offer a wide range of services, including
            musculoskeletal{" "}
            <span>
              pain management, paralysis care, child therapy, pregnancy care,
              lifestyle management, balanced digestion, healthy aging,
              technology detoxification, employee wellness, relational
              well-being, depression and anxiety relief, financial well-being,
              and hormone balance therapy.
            </span>{" "}
            We also understand the importance of
            <span>community wellness</span> and have developed a program to make
            our therapy services accessible to as much of the population as
            possible. We believe that everyone should have access to
            high-quality healthcare and are committed to doing our part to
            improve the health and well-being of our community.{" "}
          </p>
          <p className="my-3 tracking-wide leading-relaxed text-justify">
            Thank you for choosing Isha Wellness Centre as your partner in
            health and wellness. We look forward{" "}
            <span>
              to helping you achieve your health goals and living your best
              life.
            </span>{" "}
          </p>
        </div>

        <div className="founder ">
          Founder of<span> Ishawellness Center</span>
        </div>
        <p className="bade w-[80%] mx-auto text-center">
          Meet the{" "}
          <span>
            {" "}
            dynamic duo behind ISHA Wellness Centre, Dr. Minjan Patel and Dr.
            Hitesh Purohit.
          </span>{" "}
          As co-founders of Aarogyam Knowledge to Action Society (AKAS) and
          Healthprizm Pvt. Ltd. (HPL), they bring a wealth of knowledge and
          expertise to the table.
        </p>
        <p className="bade w-[80%] mx-auto text-center">
          Together, these two visionaries have a shared{" "}
          <span>
            goal of bringing evidence-based, patient-centered therapy services
            to everyone.
          </span>{" "}
          With their combined knowledge, experience, and commitment to community
          health, they are{" "}
          <span>
            leading the way in making holistic wellness accessible and
            achievable for all.
          </span>
        </p>
        <section className="hum sm:py-4 sm:px-2">
          <div className="tum">
            <div className="job ">
              <img
                className="object-cover"
                src="https://images.pexels.com/photos/5867730/pexels-photo-5867730.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
            </div>
            <div className="kon">
              <h5>Dr. Hitesh Purohit</h5>
              <div className="h-[10rem] pr-2 overflow-y-auto ">
                <p className="bade">
                  Meet <span>Dr. Hitesh Purohit,</span> our Founder Director and
                  President -
                  <span>
                    a visionary leader and passionate healthcare entrepreneur
                  </span>
                  dedicated to improving community health through technology-led
                  innovations. With a Bachelor's degree in Physical Therapy and
                  a Post-Graduation in Public Health, Dr. Purohit brings a
                  wealth of experience and expertise to his work at ISHA
                  Wellness Centre. He is a Founder Director of Healthprizm
                  Private Limited and Aarogyam Knowledge to Action Society. His
                  deep commitment{" "}
                  <span>
                    to creating need-based systems for community health has
                    driven him to develop effective, sustainable models that
                    make a real difference in people's lives.
                  </span>{" "}
                  Dr. Purohit's exceptional skills and unwavering dedication to
                  his work inspire us every day to continue striving for
                  excellence in the field of wellness.
                </p>
                <p className="bade">
                  Dr. Purohit's contributions to the development of various
                  innovative community models have been recognized and awarded
                  by many conferences. His work has been covered in various
                  regional and national newspapers and blogs, and he has
                  research publications to his credit. He has also worked on
                  various <span>technology-based health solutions</span> and
                  provides consultation to organizations such as{" "}
                  <span>
                    WHO, UNICEF, IIPHG, PHFI, local governments, and various
                    national and international NGOs.
                  </span>
                </p>
                <p className="bade">
                  As a trainer and mentor, Dr. Purohit has trained around{" "}
                  <span></span>1000 health workers and provided wellness and
                  therapy consultations to <span>20000</span> individuals. He
                  firmly believes in{" "}
                  <span>
                    effective solutions and systems, innovative tech-based
                    solutions, and self-sustainable systems.
                  </span>{" "}
                  Dr. Purohit's passion for improving community health through
                  technology-led innovations has made him a{" "}
                  <span>
                    true healthcare pioneer, and we are honored to have him as
                    the driving force behind our mission at ISHA Wellness Centre
                    and HPL.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="hum sm:py-4 sm:px-2">
          <div className="tum">
            <div className="job ">
              <img
                className="object-cover"
                src="https://images.pexels.com/photos/5867730/pexels-photo-5867730.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
            </div>
            <div className="kon">
              <h5>Dr. Minjan Patel</h5>
              <div className="h-[10rem] pr-2 overflow-y-auto ">
                <p className="bade">
                  <span>Dr. Minjan Patel,</span> our Founder Director and CEO,{" "}
                  <span>
                    is a true visiona dedicated to improving community
                  </span>{" "}
                  health through her research-based solutions and passion for
                  Healthy Community. With a Bachelor's degree in Occupational
                  Therapy, a post-graduation in Public Health, and a Master's in
                  Rural Development, Dr. Patel has honed her skills and
                  expertise to make a real difference in the health and
                  well-being of communities. She is the Founder Director of
                  Healthprizm Private limited and Aarogyam Knowledge to Action
                  Society - a non-profit platform.
                </p>
                <p className="bade">
                  Dr. Patel's passion for finding{" "}
                  <span>
                    research-based solutions to empower and uplift communities
                    and individuals is remarkable!
                  </span>
                  With her <span>inspiring vision</span> and{" "}
                  <span>tireless</span> dedication to improving community
                  health, Dr. Patel is a true champion of wellness and a source
                  of inspiration for all who work with her." She has contributed
                  to primary health care, women and adolescent health, and
                  midwifery practices with the{" "}
                  <span>
                    World Bank, WHO, and IIPHG at state, national, and
                    international levels.
                  </span>{" "}
                  She has provided consultation to remarkable public health
                  interventions and research with organizations like{" "}
                  <span>
                    UNICEF, IIPHG, PHFI, and various international and national
                    NGOs.
                  </span>
                </p>
                <p className="bade">
                  `Dr. Patel's experience in lifestyle management and wellness
                  industry is crucial to complete the wellness services. She has
                  trained over 1800 health workers and provided health education
                  to over <span>13000 women</span> and{" "}
                  <span>8000 non-school/school children and adolescents.</span>{" "}
                  Additionally, she has contributed to wellness services for{" "}
                  <span>8000+ community members</span> in urban and rural areas
                  of Gujarat and Madhya Pradesh.
                </p>
                <p className="bade">
                  <span>
                    With 15+ years of experience as a public health manager,
                    trainer, researcher, and health & wellness coach,
                  </span>{" "}
                  Dr. Patel has developed health modules for the Government of
                  India, Government of Gujarat, and various NGOs. Her
                  outstanding research contributions have led to better health
                  services, programs, and policies. She has been covered in
                  various international and national media channels, newspapers,
                  magazines, and blogs, and has published numerous research
                  papers. Dr. Patel has been awarded and appreciated in many
                  conferences for her work presentations, highlighting her
                  commitment to making a positive impact on the health and
                  well-being of communities.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h5 className="founder">
            Our <span>Story</span>
          </h5>
          <div className="papa">
            <p>
              <span>
                Our story began with a simple yet profound dream: to make
                therapy services accessible to all!
              </span>{" "}
              We have seen the struggles and challenges people face in accessing
              therapy care, particularly in rural and tribal areas of Gujarat
              and Madhya Pradesh. We knew we had to do something about it, and
              that's how ISHA Wellness Centre was born.
            </p>
            <p>
              We started by working{" "}
              <span>
                closely with the community, listening to their needs and
                concerns, and understanding the root cause of the problems
              </span>{" "}
              that require therapy care. We soon realized that the current
              treatment guidelines were outdated and needed to be revised. With
              our experience and expertise, we developed new treatment protocols
              that delivered extraordinary, sustainable results.
            </p>
            <p>
              As we <span>trained a few wellness workers</span> to execute our
              suggested treatment, we realized that there was still a high
              margin of error. So, we developed a basic training material and
              transformed it into a highly effective, scalable, and
              self-sustainable system with the help of{" "}
              <span>a mobile application.</span> We now have over{" "}
              <span>20 wellness workers taking care of patients</span> at four
              different locations, all thanks to this system.
            </p>
            <p>
              Through our work, we have conducted over{" "}
              <span>15,000 consultations and 60,000 therapy sessions,</span>,
              making a real difference in the lives of the people we serve. Our
              vision doesn't stop here - we're now working on a skill
              development model to create self-employed wellness workers across
              the globe.
            </p>
            <p>
              With a constant focus on using the latest technology and our{" "}
              <span>unwavering passion for helping others,</span> we
              persistently strive to improve our mobile application to provide
              even more effective supportive supervision and monitoring.{" "}
              <span>
                Our journey has been challenging, but also incredibly rewarding!
              </span>{" "}
              As we move forward, we're excited to{" "}
              <span>
                continue making a positive impact on the health and well-being
                of communities worldwide.
              </span>{" "}
              With the integration of cutting-edge AI and Machine Learning
              technologies, we are committed to revolutionizing therapy care and
              ensuring it's accessible to all.
            </p>
          </div>
        </section>
        <section>
          <h5 className="founder">
            Message from <span>founders</span>
          </h5>
          <div className="papa">
            <p>
              <span>
                Are you tired of feeling like you're at the mercy of your health
                issues?
              </span>{" "}
              Do you feel like you've tried everything to get relief from your
              symptoms, but nothing seems to work? It's understandable to feel
              frustrated and discouraged, but the truth is that the solution to
              your health problems may be closer than you think.
            </p>
            <p>
              At its core,{" "}
              <span>
                achieving optimal health is a journey that you must take charge
                of yourself!
              </span>{" "}
              While healthcare professionals can certainly provide guidance,
              treatment, and support, they can't do it all for you. True healing
              and wellness come from within, and it's up to you to take
              responsibility for your own health and wellbeing.
            </p>
            <p>
              This means taking <span>an active role in your health,</span> and
              seeking out the knowledge, tools, and support you need to achieve
              your wellness goals. It means understanding that treating symptoms
              is only a temporary fix, and that identifying and addressing the
              root causes of your health issues is{" "}
              <span>the key to long-term healing.</span>
            </p>
            <p>
              At times, this journey may feel overwhelming or challenging. There
              may be obstacles to overcome, and setbacks along the way. But it's
              important to remember that your health is worth the effort. By{" "}
              <span>
                making positive changes to your lifestyle, and seeking out
                support
              </span>{" "}
              from healthcare professionals, loved ones, and other resources,
              you can take control of your health and achieve the vibrant,
              healthy life you deserve.
            </p>
            <p>
              So if you're ready to take charge of your health and embark on the
              journey towards optimal wellness,{" "}
              <span>we encourage you to start today!</span>
              Remember,{" "}
              <span>
                it's not a quick fix or a one-time solution - it's an ongoing
                process that requires your active participation and commitment.
              </span>{" "}
              But with the right mindset, support, and resources, you can
              achieve your health goals and <span>live your best Life!</span>
            </p>
          </div>
        </section>
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
    background-color: #00286b;
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
    color: white;
    font-size: x-large;
    border-bottom: 3px solid white;
    margin-bottom: 1rem;
  }
  .about-text p {
    font-size: small;
    color: white;
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
    box-shadow: inset 0px 250px #00286b;
    border: 1px solid #00286b;
    
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
    border-bottom: 3px solid #00286b;
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
    background-color: #00286b;
    padding: 2rem 0;
  }

  .papa p {
    padding: 0 3rem;  
    color: #c3c3c3;
    font-size: medium;
    font-weight; 400;
    }
  }
  .papa p span{
      font-weight: 900;
      color: white; 
  }
  .bade {
    color: gray;
  }
  .bade span  {
    color: black;
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
