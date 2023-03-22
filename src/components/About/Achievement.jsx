import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";

const Achievement = () => {
  const [CounterOn, setCounterOn] =  useState(false)
  const { ref: refrence, inView } = useInView({ threshold: 0.5 });
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
    <Container>
      <ScrollTrigger onEnter={()=> setCounterOn(true)} onExit={()=> setCounterOn(false)}>
      <motion.div
        ref={refrence}
        initial={{ opacity: 0, y: 100 }}
        animate={animation}
      >
        <h3 className="w-fit text-2xl my-1 mx-auto pb-4 font-bold text-[#50acfb]">
          Achievements
        </h3>
        <div className="ach-cards">
          <div className="ach-card">
            <h4>Trained Wellness Facilitators</h4>
            <p id="counter" >
              {CounterOn && <CountUp start={0} end={20} duration={8} delay={0}/>}+
              </p>
          </div>
          <div className="ach-card">
            <h4>Imparted wellness Education through camps</h4>
            <p id="counter1">
            {CounterOn && <CountUp start={0} end={12000} duration={5} delay={0}/>}+
            </p>
          </div>
          <div className="ach-card">
            <h4>Wellness consultation</h4>
            <p id="counter2">
            {CounterOn && <CountUp start={0} end={15000} duration={5} delay={0}/>}+
            </p>
          </div>
          <div className="ach-card">
            <h4>Wellness therapy sessions</h4>
            <p id="counter3">
            {CounterOn && <CountUp start={0} end={60000} duration={5} delay={0}/>}+
            </p>
          </div>
        </div>
      </motion.div>
      </ScrollTrigger>
    </Container>
  );
};

export default Achievement;

const Container = styled.div`
  margin: 1rem 0;
  
  .ach-cards {
    width: 90%;
    margin: 2rem auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20%, 1fr));

    grid-gap: 1.5rem;
  }
  .ach-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 1.5rem 0;
    text-align: center;
    background-color: #2d4e89;
    height: 10rem;
    border-radius: 0.5rem;
    > h4 {
      font-weight: 700;
      color: #fff;
    }
    > p {
      font-size: 2rem;
      font-weight: 700;
      color: white;
    }
  }

  @media screen and (max-width: 680px) {
    .ach-cards {
      grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
    }
  }
  @media screen and (max-width: 480px) {
    .ach-cards {
      grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
    }
  }
`;
