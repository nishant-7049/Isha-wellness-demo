import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 5rem;
  .main-head {
    padding-top: 1.5rem;
    background-color: white;
    width: fit-content;
    margin: 0 auto;
    border-bottom: 4px solid #00286b;
    text-align: center;
    color: #00286b;
    font-weight: 700;
    font-size: 1.75rem;
  }
  .det-con {
    display: flex;
    width: 25%;
    flex-direction: column;
    gap: 1rem;
    margin: 0 auto;
  }
  .det-head {
    color: #00286b;
    font-weight: 700;
    font-size: 1.25rem;
    border-bottom: 2px solid #00286b;
    width: fit-content;
    margin: 1rem 0;
  }
  .ques-ans {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .ques-ans-con {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
  .ques {
    color: #00286b;
    font-weight: 700;
  }
  .ans {
    color: #000000bf;
  }
  @media screen and (max-width: 821px) {
    .det-con {
      width: 40%;
    }
  }
  @media screen and (max-width: 436px) {
    .det-con {
      width: 100%;
      margin: 0;
    }
  }
`;

export default Container;
