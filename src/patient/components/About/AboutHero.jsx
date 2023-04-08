import React from "react";

const AboutHero = () => {
  return (
    <div className="bg-[url(/images/bg/AboutBg.jpg)] bg-blend-overlay bg-black/20 bg-opacity-0  bg-cover bg-top w-[100%] h-[100vh]">
      <div className="absolute bottom-20 left-20 text-white  w-[40%] sm:w-[60%] sm:text-center sm:left-[23%] lg:bottom-[20%]">
        <h2 className="text-3xl font-extrabold mb-4 bg-opacity-0">
          ISHA Wellness Centre
        </h2>
        <p className=" font-extrabold bg-opacity-0">
          Healing hands, compassionate hearts - Join us on a journey towards
          wellness and a better life.
        </p>
      </div>
    </div>
  );
};

export default AboutHero;
