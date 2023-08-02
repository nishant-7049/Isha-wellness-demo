import React, { useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation();
  const [toggle, setToggle] = useState(true);

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
          <Link to="/" className={location.pathname == "/" ? "active" : ""}>
            {" "}
            Home
          </Link>
          <Link
            to="/about"
            className={location.pathname == "/about" ? "active" : ""}
          >
            {" "}
            About
          </Link>
          <Link
            to="/service"
            className={location.pathname == "/service" ? "active" : ""}
          >
            {" "}
            Services
          </Link>
          <Link
            to="/blogs"
            className={location.pathname == "/blogs" ? "active" : ""}
          >
            {" "}
            Blogs
          </Link>
          <Link
            to="/forum"
            className={location.pathname == "/forum" ? "active" : ""}
          >
            {" "}
            Forum
          </Link>
          {isAuthenticated ? (
            <span>
              <Link to="/booknow">
                <button>Book Now</button>
              </Link>
            </span>
          ) : (
            <Link
              to="/login"
              className={location.pathname == "/register" ? "active" : ""}
            >
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
              className={location.pathname == "/" ? "active" : ""}
            >
              {" "}
              Home
            </Link>
            <Link
              onClick={() => {
                setToggle(!toggle);
              }}
              to="/blogs"
              className={location.pathname == "/blogs" ? "active" : ""}
            >
              {" "}
              Blogs
            </Link>
            <Link
              onClick={() => {
                setToggle(!toggle);
              }}
              to="/about"
              className={location.pathname == "/about" ? "active" : ""}
            >
              {" "}
              About
            </Link>
            <Link
              onClick={() => {
                setToggle(!toggle);
              }}
              to="/service"
              className={location.pathname == "/service" ? "active" : ""}
            >
              {" "}
              Services
            </Link>
            <Link
              onClick={() => {
                setToggle(!toggle);
              }}
              to="/forum"
              className={location.pathname == "/forum" ? "active" : ""}
            >
              {" "}
              Forum
            </Link>

            {isAuthenticated ? (
              <Link
                onClick={() => {
                  setToggle(!toggle);
                }}
                to="/booknow"
                className={location.pathname == "/booknow" ? "active" : ""}
              >
                <button>Book Now</button>
              </Link>
            ) : (
              <Link
                onClick={() => {
                  setToggle(!toggle);
                }}
                to="/login"
                className={location.pathname == "/register" ? "active" : ""}
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
  text-align: left;
  align-items: center;
  top: 0;

  * {
    text-align: center;
    align-items: center;
  }

  .active {
    border-bottom: 2px solid white;
    transition: 0.4 ease-in-out;
  }

  @media (max-width: 480px) {
    margin: 0 1rem;
    display: grid;
    grid-template-columns: 60% 50px;
    > *:first-child {
      justify-self: right;
    }
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
    font-weight: 700;
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
  text-align: center;
  align-items: center;
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
