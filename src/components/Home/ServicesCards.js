import React from "react";
import styled from "styled-components";
import { IconContext } from "react-icons/lib";
import { FaBabyCarriage, FaWheelchair } from "react-icons/fa";
import { TbYoga } from "react-icons/tb";
import { RiMentalHealthFill } from "react-icons/ri";
import { MdPersonSearch } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";

const data = [
  {
    id: 0,
    processName: `Wellness Therapy`,
    processImg: <FaWheelchair />,
    process: `A combination of Physiotherapy, occupational therapy, Iyengar Yoga etc`,
  },
  {
    id: 1,
    processName: `Yoga`,
    processImg: <TbYoga />,
    process: `For those who wants wellness and have no pain or syndrome`,
  },
  {
    id: 2,
    processName: `Pregnancy Care`,
    processImg: <FaBabyCarriage />,
    process: `From planning pregnancy to delivering a healthy baby normally`,
  },
  {
    id: 3,
    processName: `Hormone Balance Therapy`,
    processImg: <RiMentalHealthFill />,
    process: `An specially designed therapy to balance and stabilize hormones and helps in situations like iregular menstrual cycle, PCOD, thyroid, etc.`,
  },
  {
    id: 4,
    processName: `Counseling`,
    processImg: <MdPersonSearch />,
    process: `One on one communication to help you understand your problem well and to help you find solutions and act accordingly.`,
  },
  {
    id: 5,
    processName: `Employee Wellness Program`,
    processImg: <IoIosPeople />,
    process: `Health education and exercise sessions for company employees to empower them to prevent and deal with several occupational health problems.`,
  },
];

const ProcessCards = () => {
  return (
    <Container>
      <IconContext.Provider value={{
        size: '4rem',
        color: '#f4b9d2',
    }}>
        <div className="process-grid">
          {data.map((data) => {
            return (
              <div key={data.id} className="process-item">
                <div className="card">
                  {data.processImg}
                  <div className="card-con">
                    <h1 className="card-head">{data.processName}</h1>
                    <p className="card-text">{data.process}</p>
                  </div>
                </div>
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
    margin: 6rem auto;
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
    height: 14rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 1rem 0.5rem;
  }

  .card-con {
    padding: 0.8rem;
  }

  .card-head {
    color: #f480b1;
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
`
