import React from "react";
import styled from "styled-components";

const Achievement = () => {
  const counters = document.querySelectorAll(".count");
  const speed = 200;
  counters.forEach((counter) => {
    const updateCount = () => {
      const target = parseInt(counter.getAttribute("data-target"));
      const count = parseInt(counter.innerText);
      const increment = Math.trunc(target / speed);

      if (count < target) {
        counter.innerText = count + increment;
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
  return (
    <Container>
      <h3 className="ach-head">Achievements</h3>
      <div className="ach-cards">
        <div className="ach-card">
          <h4>Trained Wellness Facilitators</h4>
          <p data-target="20" className="count">
            20+
          </p>
        </div>
        <div className="ach-card">
          <h4>Imparted wellness Education through camps</h4>
          <p>12000+</p>
        </div>
        <div className="ach-card">
          <h4>Wellness consultation</h4>
          <p>15000+</p>
        </div>
        <div className="ach-card">
          <h4>Wellness therapy sessions</h4>
          <p>60000+</p>
        </div>
      </div>
    </Container>
  );
};

export default Achievement;

const Container = styled.div`
  .ach-head {
    text-align: center;
    font-weight: 700;
    margin: 1rem 0;
    color: #50acfb;
    font-size: 1.5rem;
  }

  .ach-cards {
    width: 90%;
    margin: 2rem auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20%, 1fr));

    grid-gap: 1rem;
  }
  .ach-head {
    font-size: 2.5rem;
  }
  .ach-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
    align-items: center;
    text-align: center;
    background-color: #50acfb;
    height: 10rem;
    border-radius: 0.8rem;
    > h4 {
      font-weight: 700;
      color: #414141;
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
`
