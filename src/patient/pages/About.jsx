import React from "react";
import AboutHero from "../components/About/AboutHero";
import AboutVision from "../components/About/AboutVision";
import AboutIWC from "../components/About/AboutIWC";
import Achievement from "../components/About/Achievement";
import AboutFounders from "../components/About/AboutFounders";
import OurStory from "../components/About/OurStory";
import Message from "../components/About/Message";
import TherTeam from "../components/About/TherTeam";

const About = () => {
  return (
    <div className="text-justify tracking-wide">
      <div className="">
        <AboutHero />
      </div>
      <div className="mx-36 sm:mx-8 ">
        <AboutVision />
        <AboutIWC />
        <div className="mt-20">
          <h3 className="founder text-3xl text-[#00286b] font-extrabold border-b-4 border-[#00286b] my-1 pb-2 ">
            Achievements
          </h3>
          <Achievement />
        </div>
        <AboutFounders />
        <OurStory />
        <Message />
        <TherTeam />
      </div>
    </div>
  );
};

export default About;
