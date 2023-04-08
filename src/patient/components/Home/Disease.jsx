import React, { useEffect } from "react";
import { FaDisease } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Diseases = [
  {
    id: 0,
    img: <FaDisease />,
    name: "Detoxification",
  },
  {
    id: 1,
    img: <FaDisease />,
    name: "Diabetes",
  },
  {
    id: 2,
    img: <FaDisease />,
    name: "Neurological Disorders",
  },
  {
    id: 0,
    img: <FaDisease />,
    name: "liver diseases",
  },
  {
    id: 0,
    img: <FaDisease />,
    name: "obesit",
  },
  {
    id: 0,
    img: <FaDisease />,
    name: "heart diseases",
  },
  {
    id: 0,
    img: <FaDisease />,
    name: "hormol disorder",
  },
  {
    id: 0,
    img: <FaDisease />,
    name: "Rheumatoid Arthritis",
  },
  {
    id: 0,
    img: <FaDisease />,
    name: "disease dummy",
  },
  {
    id: 0,
    img: <FaDisease />,
    name: "Stress managament",
  },
  {
    id: 0,
    img: <FaDisease />,
    name: "Respiratory Diseases",
  },
  {
    id: 0,
    img: <FaDisease />,
    name: "Cancer Care & Management",
  },
];
function Disease() {
  const { ref, inView } = useInView({ threshold: 0.15 });
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
      className="container py-8 mb-20"
    >
      <div className="heading text-center">
        <h1 className="text-3xl  text-[white] font-bold">Diseases Treated</h1>
        <p className="text-xl p-10 text-white sm:text-sm">
          At Nimba we have adopted holistic approach to treating various
          ailments by detoxifying body to promote health and wellbeing
        </p>
      </div>
      <div className="disease flex gap-8 flex-wrap justify-center px-12 ">
        {Diseases.map((data) => {
          return (
            <span
              className="treated flex gap-4 w-[30%] border-[1px] text-white border-black px-4 py-1 rounded-md h-14 items-center shadow-[0px_2px_10px_1px_white] shadow-white sm:w-[100%] duration:500 ease-in-out hover:translate-x-4"
              key={data.id}
            >
              <div>{data.img}</div>
              <h1>{data.name}</h1>
            </span>
          );
        })}
      </div>
    </motion.div>
  );
}

export default Disease;
