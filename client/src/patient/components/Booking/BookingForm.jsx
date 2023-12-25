import styled from "styled-components";

const Container = styled.div`
  input[type="date"]::-webkit-calendar-picker-indicator {
    color: black;
    z-index: 1;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 6vmax;
    padding-bottom: 4vmax;
    background-color: #00000010;
    min-height: 100vh;
  }

  .form-with-head {
    background-color: white;
    width: 80%;
    box-shadow: 0 4px 10px 0 #00000020;
  }

  .book-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    background-color: white;
    padding: 1rem 2rem 2rem;
  }

  .book-input-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
  }

  .book-head {
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

  .input-container {
    display: flex;
    flex-direction: column;
    width: 30%;
  }

  .label-head {
    color: #00286b;
    font-weight: 600;
  }

  .book-input {
    background-color: white;
    border: 1px solid #00000020;
    padding: 0.7rem;
  }

  .book-submit {
    background-color: #00286b !important;
    cursor: pointer;
    border: 2px solid #00286b;
    padding: 0.7rem;
    color: white;
    font-weight: 700;
  }

  .book-submit:hover {
    background-color: white !important;
    color: #00286b;
  }

  @media (max-width: 1024px) {
    .container {
      padding-top: 6rem;
    }
    .input-container {
      width: 45%;
    }
  }

  @media (max-width: 426px) {
    .input-container {
      width: 80%;
    }
  }
`;

export default Container;
