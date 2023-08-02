import React, { useEffect, useState } from "react";
import Blogs from "../components/Home/Blogs";
import FAQ from "../components/Home/FAQ";
import Hero from "../components/Home/Hero";
import Services from "../components/Home/Services";
import Therapist from "../components/Home/Therapist";
import Vision from "../components/Home/Vision";
import Achievement from "../components/About/Achievement";
import LocateUs from "../components/Home/LocateUs";
import Video from "../components/Home/Video";
import { motion, AnimatePresence } from "framer-motion";
import Notification from "../components/Home/Notification";
import WA_Notify from "../components/Home/WA_Notify";
import Quote from "../components/Home/Quote";
import Disease from "../components/Home/Disease";

const Home = () => {
  const [notification, setNotification] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setNotification(false);
    }, 10000);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { type: "spring", duration: 0.5, bounce: 0.5 },
      }}
    >
      <div className="relative">
        <AnimatePresence>
          {notification ? <Notification /> : ""}
        </AnimatePresence>
        <WA_Notify />
        <Hero />
        <Quote />
        <Vision />
        <div className="bg-[url(/images/service/ServiceHero.svg)] bg-cover bg-center bg-blend-overlay bg-black/20 bg-fixed pb-4 h-fit sm:h-fit">
          <Services />
        </div>
        <div className="mx-20 my-12 sm:mx-10">
          <h3 className="founder w-fit text-3xl my-1 mx-auto pb-4 font-bold text-[#00286b]">
            Achievements
          </h3>
          <Achievement />
        </div>
        <div className="bg-[url(/images/DiseaseBG.jpg)] bg-cover bg-center bg-fixed h-fit sm:h-fit">
          <Disease />
        </div>
        <LocateUs />
        <div className="bg-[url(/images/DiseaseBG.jpg)] bg-cover bg-center bg-fixed">
          <Therapist />
        </div>
        <Blogs />

        <div className="bg-[url(/images/HealedBG.jpg)] bg-cover bg-center bg-fixed">
          <Video />
        </div>
        <FAQ />
      </div>
    </motion.div>
  );
};

export default Home;
