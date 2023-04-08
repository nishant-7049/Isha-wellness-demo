import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import { TbPhysotherapist, TbSchool } from "react-icons/tb";
import { MdQuestionAnswer } from "react-icons/md";
import { GiDiscussion } from "react-icons/gi";

const data = [
  {
    id: 0,
    img: <TbPhysotherapist />,
    title: "Trained Wellness Facilitators",
    end: 20,
    duration: 5,
  },
  {
    id: 1,
    img: <TbSchool />,
    title: "Imparted wellness Education through camps",
    end: 12000,
    duration: 3,
  },
  {
    id: 2,
    img: <MdQuestionAnswer />,
    title: "Wellness consultation",
    end: 15000,
    duration: 3,
  },
  {
    id: 3,
    img: <GiDiscussion />,
    title: "Wellness therapy sessions",
    end: 60000,
    duration: 3,
  },
];

const Achievement = () => {
  const [CounterOn, setCounterOn] = useState(false);
  const { ref: refrence, inView } = useInView({ threshold: 0.25 });
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
      <ScrollTrigger
        onEnter={() => setCounterOn(true)}
        onExit={() => setCounterOn(false)}
      >
        <motion.div
          ref={refrence}
          initial={{ opacity: 0, y: 100 }}
          animate={animation}
        >
          <div className="ach-cards">
            {data.map((card) => {
              return (
                <div key={card.id} className="ach-card text-white">
                  <div className="text-[3rem] mx-auto">{card.img}</div>
                  <p className=" text-lg">{card.title}</p>
                  <p className=" text-3xl">
                    {CounterOn && (
                      <CountUp
                        start={0}
                        end={card.end}
                        duration={card.duration}
                        delay={0}
                      />
                    )}
                    +
                  </p>
                </div>
              );
            })}
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
    background-color: #00286b;
    height: 13rem;
    border-radius: 0.5rem;
    > h4 {
      font-weight: 700;
      color: #fff;
    }
    > p {
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
