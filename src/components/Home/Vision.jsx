import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Vision() {
  const { ref, inView } = useInView({ threshold: 0.5 });
  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1 },
      });
    }
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={animation}
      className="vision my-8 mx-20 sm:m-4"
    >
      <div className="heading text-center text-lg text-white px-8 pb-4 sm:text-sm sm:p-0 sm:pb-6">
        <h2 className="text-2xl mx-0 pb-4 font-bold text-[#50acfb]">
          Our Vision & Mission
        </h2>
        <p className="text-lg text-[#635858] w-[70%] m-auto sm:text-sm sm:w-full">
          Isha Wellness Centre is an innovative holistic treatment program which
          focus on strengthening of all aspects of wellness in your life.
          Primary objective of developing this system is to avail wellness
          therapy services through wellness facilitators all over the globe.
        </p>
        <Link to="/about" className="text-[#50acfb] text-sm">
          Read More...
        </Link>
      </div>
    </motion.div>
  );
}

export default Vision;
