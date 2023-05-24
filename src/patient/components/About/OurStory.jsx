import React from "react";
import styled from "styled-components";
const OurStory = () => {
  return (
    <div className="mt-20 tracking-wide leading-6 bg-[url(/images/bg/blog-bg.jpg)] bg-cover bg-right-bottom bg-blend-overlay bg-black/50">
      <h2 className="text-3xl pt-4 pl-8 text-white font-extrabold border-b-4 border-white ">
        {" "}
        Our Story
      </h2>
      <div className="text-white">
        <div className="m-8 w-[40%] float-right shadow-[5px_5px_10px_5px_white] sm:w-fit">
          <img src="./images/About/OurStory.jpg" alt="" />
        </div>
        <div className="pt-8 px-8 sm:px-4">
          <p className="mb-8">
            <H>
              Our story began with a simple yet profound dream: to make therapy
              services accessible to all!
            </H>{" "}
            We have seen the struggles and challenges people face in accessing
            therapy care, particularly in rural and tribal areas of Gujarat and
            Madhya Pradesh. We knew we had to do something about it, and that's
            how ISHA Wellness Centre was born.
          </p>
          <p className="mb-8">
            We started by working{" "}
            <H>
              closely with the community, listening to their needs and concerns,
              and understanding the root cause of the problems
            </H>{" "}
            that require therapy care. We soon realized that the current
            treatment guidelines were outdated and needed to be revised. With
            our experience and expertise, we developed new treatment protocols
            that delivered extraordinary, sustainable results.
          </p>
          <p className="mb-8">
            As we <H>trained a few wellness workers</H> to execute our suggested
            treatment, we realized that there was still a high margin of error.
            So, we developed a basic training material and transformed it into a
            highly effective, scalable, and self-sustainable system with the
            help of <H>a mobile application.</H> We now have over{" "}
            <H>20 wellness workers taking care of patients</H> at four different
            locations, all thanks to this system.
          </p>
          <p className="mb-8">
            Through our work, we have conducted over{" "}
            <H>15,000 consultations and 60,000 therapy sessions,</H> making a
            real difference in the lives of the people we serve. Our vision
            doesn't stop here - we're now working on a skill development model
            to create self-employed wellness workers across the globe.
          </p>
          <p className="pb-8">
            With a constant focus on using the latest technology and our{" "}
            <H>unwavering passion for helping others,</H> we persistently strive
            to improve our mobile application to provide even more effective
            supportive supervision and monitoring.{" "}
            <H>
              Our journey has been challenging, but also incredibly rewarding!
            </H>{" "}
            As we move forward, we're excited to{" "}
            <H>
              continue making a positive impact on the health and well-being of
              communities worldwide.
            </H>{" "}
            With the integration of cutting-edge AI and Machine Learning
            technologies, we are committed to revolutionizing therapy care and
            ensuring it's accessible to all.
          </p>
        </div>
      </div>
    </div>
  );
};
const H = styled.div`
  font-weight: 800;
  display: inline;
`;

export default OurStory;
