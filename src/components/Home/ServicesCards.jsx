import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IconContext } from "react-icons/lib";
import { FaHandHoldingUsd, FaHotel } from "react-icons/fa";
import { RiPsychotherapyLine, RiCommunityLine } from "react-icons/ri";
import { MdPregnantWoman, MdSportsGymnastics } from "react-icons/md";
import { IoMdGlobe } from "react-icons/io";

const data = [
  {
    id: 0,
    processName: `Physical Therapy`,
    processImg: <RiPsychotherapyLine />,
    process: `Pain management, Paralysis care, Paediatric care, pre-post operative therapy`,
  },
  {
    id: 1,
    processName: `Yoga`,
    processImg: <MdSportsGymnastics />,
    process: `Discover our innovative yoga program, designed for all levels from beginners to advanced practitioners to enhance overall wellness and prevent common health disorders`,
  },
  {
    id: 2,
    processName: `Women Wellness care`,
    processImg: <MdPregnantWoman />,
    process: `Pregnancy care and education, Hormone balance therapy, Weight management, Menopause management and education, reproductive health education`,
  },
  {
    id: 3,
    processName: `Community Wellness Program`,
    processImg: <RiCommunityLine />,
    process: `Making evidence-based therapy services accessible to all, because we believe in a healthier, happier, and more equitable society for all.`,
  },
  {
    id: 4,
    processName: `Employee Wellness Program`,
    processImg: <FaHandHoldingUsd />,
    process: `Health education and exercise sessions for company employees to empower them to prevent and deal with several occupational health problems.`,
  },
  {
    id: 5,
    processName: `Social Responsibility`,
    processImg: <IoMdGlobe />,
    process: `(Coming Soon)`,
  },
  {
    id: 6,
    processName: `Wellness Resort`,
    processImg: <FaHotel />,
    process: `(Coming Soon)`,
  },
];

const ProcessCards = () => {
  return (
    <Container>
      <IconContext.Provider
        value={{
          size: "4rem",
          color: "#50acfb",
        }}
      >
        <div className="process-grid">
          {data.map((data) => {
            return (
              <div key={data.id} className="process-item">
                <Link to="/service">
                  <div className="card bg-white text-[#50acfb] ">
                    <div>{data.processImg}</div>
                    <div className="card-con">
                      <h1 className="card-head text-[#50acfb]">
                        {data.processName}
                      </h1>
                      <p className="card-text text-black tracking-wider">
                        {data.process}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </IconContext.Provider>
    </Container>
  );
};

export default ProcessCards;

const Container = styled.div`
  font-family: Verdana, Geneva, Tahoma, sans-serif;

  .process-grid {
    margin: 3rem auto;
    display: grid;
    width: 80%;
    grid-gap: 3rem;
    grid-template-columns: repeat(auto-fit, minmax(25%, 1fr));
    align-items: center;
  }

  .process-item {
    border-radius: 0.6rem;
    overflow: hidden;
    box-shadow: 0 3rem 6rem rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: 0.2s;
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.3);
  }

  // .process-item:hover {
  //   box-shadow: 0 0 2rem rgba(0, 0, 0, 0.3);
  // }

  .card {
    height: 18rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 2rem 0.5rem;
  }

  .card-con {
    padding: 0.8rem;
  }

  .card-head {
    // color: #50acfb;
    font-size: 1.4rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 0.7rem;
  }

  .card-text {
    font-size: 0.7rem;
    text-align: center;
  }

  @media screen and (max-width: 720px) {
    .process-grid {
      grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
    }
  }
  @media screen and (max-width: 480px) {
    .process-grid {
      grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
    }
  }
`;
