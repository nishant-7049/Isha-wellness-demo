import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IconContext } from "react-icons/lib";

const data = [
  {
    id: 0,
    processName: `Physical Therapy`,
    processImg: "images/service/1.svg",
    process: `Pain management, Paralysis care, Paediatric care, pre-post operative therapy`,
  },
  {
    id: 1,
    processName: `Yoga`,
    processImg: "images/service/2.svg",
    process: `Discover our innovative yoga program, designed for all levels from beginners to advanced practitioners to enhance overall wellness and prevent common health disorders`,
  },
  {
    id: 2,
    processName: `Women Wellness care`,
    processImg: "images/service/3.svg",
    process: `Pregnancy care and education, Hormone balance therapy, Weight management, Menopause management and education, reproductive health education`,
  },
  {
    id: 3,
    processName: `Community Wellness Program`,
    processImg: "images/service/4.svg",
    process: `Making evidence-based therapy services accessible to all, because we believe in a healthier, happier, and more equitable society for all.`,
  },
  {
    id: 4,
    processName: `Employee Wellness Program`,
    processImg: "images/service/5.svg",
    process: `Health education and exercise sessions for company employees to empower them to prevent and deal with several occupational health problems.`,
  },
  {
    id: 5,
    processName: `Lifestyle Wellness Program`,
    processImg: "images/service/6.jpg",
    process: `Get fit Get active, Lifestyle management, Balanced Digestion, Healthy ageing, Technology detoxification, Relational wellbeing, Depression & anxiety relief and Hormone Balance therapy`,
  },
  // {
  //   id: 6,
  //   processName: `Wellness Resort`,
  //   processImg: <FaHotel />,
  //   process: `(Coming Soon)`,
  // },
];

const ProcessCards = () => {
  return (
    <Container>
      <IconContext.Provider
        value={{
          size: "4rem",
          color: "#00286b",
        }}
      >
        <div className="process-grid ">
          {data.map((data) => {
            return (
              <div key={data.id} className="process-item">
                <Link to="/service">
                  <div className="card bg-white text-[#00286b] hover:scale-105 ">
                    <div className="  sm:animate-bounce-1 w-24">
                      <img
                        className="object-contain"
                        src={data.processImg}
                        alt=""
                      />
                    </div>
                    <div className="card-con ">
                      <h1 className="card-head text-[#00286b] sm:animate-bounce-1">
                        {data.processName}
                      </h1>
                      <p className="card-text text-black tracking-wider  leading-5 text-xs">
                        {data.process}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
          <div className="process-item process-item-last ">
            <Link to="/service">
              <div className="card bg-white text-[#00286b] hover:scale-105">
                <div className="sm:animate-bounce-1 w-24">
                  <img
                    className="object-contain"
                    src="images/service/6.svg"
                    alt=""
                  />
                </div>
                <div className="card-con">
                  <h1 className="card-head text-[#00286b] sm:animate-bounce-1">
                    Wellness Resort
                  </h1>
                  <p className="card-text text-black tracking-wider text-xs">
                    (Coming Soon)
                  </p>
                </div>
              </div>
            </Link>
          </div>
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
  .process-item-last {
    grid-column: 2/ 3;
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
    // color: #00286b;
    font-size: 1.4rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 0.7rem;
  }

  .card-text {
    text-align: center;
  }

  @media screen and (max-width: 1020px) {
    .process-grid {
      grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
    }
    .process-item-last {
      grid-column: -1/ 1;
    }
  }
  @media screen and (max-width: 480px) {
    .process-grid {
      grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
    }
    .process-item-last {
      grid-column: 1/ 2;
    }
  }
`;
