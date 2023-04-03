import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Navbar() {
  const [toggle, setToggle] = useState(true);

  function logout() {
    localStorage.clear();
    location.reload();
  }

  return (
    <Contain>
      <Nav>
        <Link to="/">
          <Logo
            className="w-16"
            src="/images/IWC_logo_dark blue.png"
            alt="img"
          />
        </Link>
        <Links className="">
          <Link to="/"> Home</Link>
          <Link to="/about"> About</Link>
          <Link to="/service"> Services</Link>
          <Link to="/blogs"> Blogs</Link>
          <Link to="/forum"> Forum</Link>
          {localStorage.getItem("authToken") ? (
            <span>
              <a className="cursor-pointer" onClick={logout}>
                {" "}
                Logout
              </a>
              <Link to="/booknow">
                <button>Book Now</button>
              </Link>
            </span>
          ) : (
            <Link to="/register">
              <button>SignUp</button>
            </Link>
          )}
        </Links>
        <Button>
          <button onClick={() => setToggle(!toggle)}>
            <p className="">{toggle ? "=" : "x"}</p>
          </button>
        </Button>
      </Nav>
      {!toggle && (
        <NavSmall>
          <LinksSmall>
            <Link
              onClick={() => {
                setToggle(!toggle);
              }}
              to="/"
            >
              {" "}
              Home
            </Link>
            <Link
              onClick={() => {
                setToggle(!toggle);
              }}
              to="/blogs"
            >
              {" "}
              Blogs
            </Link>
            <Link
              onClick={() => {
                setToggle(!toggle);
              }}
              to="/about"
            >
              {" "}
              About
            </Link>
            <Link
              onClick={() => {
                setToggle(!toggle);
              }}
              to="/service"
            >
              {" "}
              Services
            </Link>
            <Link
              onClick={() => {
                setToggle(!toggle);
              }}
              to="/forum"
            >
              {" "}
              Forum
            </Link>

            {localStorage.getItem("authToken") ? (
              <Link
                onClick={() => {
                  setToggle(!toggle);
                }}
                to="/booknow"
              >
                <button>Book Now</button>
              </Link>
            ) : (
              <Link
                onClick={() => {
                  setToggle(!toggle);
                }}
                to="/register"
              >
                <button>SignUp</button>
              </Link>
            )}
          </LinksSmall>
        </NavSmall>
      )}
    </Contain>
  );
}

export default Navbar;

const Contain = styled.div`
  position: fixed;
  z-index: 10;
  height: fit-content;
  width: 100%;
  background-color: #00286b;
  top: 0;
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 5rem;
  padding-top: 0.6rem;
  padding-bottom: 0.5rem;
  text-align: center;
  align-items: center;
  top: 0;

  * {
    text-align: center;
    align-items: center;
  }

  @media (max-width: 480px) {
    margin: 0 1rem;
  }
`;
const Logo = styled.img`
  max-width: 70px;
`;
const Links = styled.div`
  font-size: 18px;
  letter-spacing: 0.5px;
  a {
    text-decoration: none;
    color: white;
    margin: 0 1rem;
    transition: 0.1s ease-in-out;
    font-weight: 800;
    font-size: 1rem;
  }

  button {
    border-radius: 50px;
    padding: 7px 15px;
    border: none;
    cursor: pointer;
    transition: 0.1s ease-in-out;
    background-color: #50acfb;
    border: 1px solid transparent;
  }

  button:hover {
    background-color: transparent;
    color: black;
    border: 1px solid black;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

const Button = styled.div`
  button {
    width: 50px;
    height: 50px;
    color: white;
    font-size: x-large;
    border-radius: 50%;
    border: 1px solid white;
    font-weight: 800;
  }

  @media (min-width: 480px) {
    display: none;
  }
`;
const NavSmall = styled.div`
  background: white;
  height: 100vh;
`;

const LinksSmall = styled.div`
  font-size: large;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  letter-spacing: 0.5px;

  a {
    text-decoration: none;
    color: black;
    margin: 1rem auto;
    transition: 0.1s ease-in-out;
  }

  button {
    border-radius: 50px;
    padding: 7px 15px;
    border: none;
    cursor: pointer;
    transition: 0.1s ease-in-out;
    background-color: #50acfb;
    border: 1px solid transparent;
  }

  button:hover {
    background-color: transparent;
    color: black;
    border: 1px solid black;
  }
`;
