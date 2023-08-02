import React, { useEffect } from "react";
import Problem from "../Disease/Problem";
import { FaDisease } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Diseases = [
  {
    id: 0,
    img: <FaDisease />,
    Problem: "Pain",
    Diseases: [
      "Muscular pain",
      "Joint Pain",
      "Joint Stiffness",
      "Neurological pain",
      "Gastric pain",
    ],
  },
  {
    id: 1,
    img: <FaDisease />,
    Problem: "Neurological Disorders",
    Diseases: [
      "Headache",
      "Migraine",
      "Vertigo",
      "Motion Sickness",
      "Degenerative Disk Disease",
      "Stroke",
      "Bell's Palsy",
      "Guillain-Barré Syndrome",
      "Alzheimer's Disease",
      "Parkinson's disease",
      "Motor Neuron Disease",
      "Ataxia",
    ],
  },
  {
    id: 2,
    img: <FaDisease />,
    Problem: "Stroke/Paralysis",
    Diseases: [
      "Obesity",
      "Diabetes",
      "Blood pressure",
      "Cardiovascular disorders",
    ],
  },
  {
    id: 3,
    img: <FaDisease />,
    Problem: "Lifestyle Disorders",
    Diseases: ["Lifestyle Disorders"],
  },
  {
    id: 4,
    img: <FaDisease />,
    Problem: "Hormonal Disorders",
    Diseases: [
      "PCOD",
      "Hyperthyroidism",
      "Hypothyroidism",
      "Menopause",
      "Irregular periods",
      "Mood swings",
    ],
  },
  {
    id: 5,
    img: <FaDisease />,
    Problem: "Digestive Problems",
    Diseases: ["Gas", "Acidity", "Constipation", "Indigestion"],
  },
  {
    id: 6,
    img: <FaDisease />,
    Problem: "Respiratory Disorders",
    Diseases: [
      "Asthma",
      "Post infection recovery",
      "Chronic Bronchitis",
      "Shortness of Breath",
    ],
  },
  {
    id: 7,
    img: <FaDisease />,
    Problem: "Stress Managment",
    Diseases: ["Stress Managment"],
  },
  {
    id: 8,
    img: <FaDisease />,
    Problem: "Pre-Post Surgery Rehabilitation",
    Diseases: ["Pre-Post Surgery Rehabilitation"],
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
      className="container py-12 mb-20"
    >
      <div className="heading text-center">
        <h1 className="text-3xl  text-[white] font-bold mb-8">
          Diseases Treated
        </h1>
      </div>
      <div className="disease flex gap-8 flex-wrap justify-center px-12 ">
        {Diseases.map((data) => {
          return (
            <span
              className="treated flex gap-4 w-[30%] border-[1px] text-white border-black  rounded-md  items-center shadow-[0px_2px_10px_1px_white] shadow-white sm:w-[100%] duration:500 ease-in-out hover:translate-x-4"
              key={data.id}
            >
              <Problem {...data} />
            </span>
          );
        })}
      </div>
    </motion.div>
  );
}

export default Disease;
