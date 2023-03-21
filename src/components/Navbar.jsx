import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

function Navbar() {
  const [toggle, setToggle] = useState(true)

  return (
    <Contain>
      <Nav>
        <Logo src='/images/nav-logo.png' alt='img' />
        <Links>
          <Link to='/'> Home</Link>
          <Link to='/about'> About</Link>
          <Link to='/service'> Service</Link>
          <Link to='/blogs'> Blogs</Link>
          <Link to='/forem'> Forem</Link>
          {localStorage.getItem('authToken') ? (
            <Link to='/booknow'>
              <button>Book Now</button>
            </Link>
          ) : (
            <Link to='/register'>
              <button>SignIn</button>
            </Link>
          )}
        </Links>
        <Button>
          <button onClick={() => setToggle(!toggle)}>
            <p className=''>{toggle ? '=' : 'x'}</p>
          </button>
        </Button>
      </Nav>
      {!toggle && (
        <NavSmall>
          <LinksSmall>
            <Link
              onClick={() => {
                setToggle(!toggle)
              }}
              to='/'
            >
              {' '}
              Home
            </Link>
            <Link
              onClick={() => {
                setToggle(!toggle)
              }}
              to='/blogs'
            >
              {' '}
              Blogs
            </Link>
            <Link
              onClick={() => {
                setToggle(!toggle)
              }}
              to='/about'
            >
              {' '}
              About
            </Link>
            <Link
              onClick={() => {
                setToggle(!toggle)
              }}
              to='/service'
            >
              {' '}
              Service
            </Link>
            <Link
              onClick={() => {
                setToggle(!toggle)
              }}
              to='/register'
            >
              <button>Book Now</button>
            </Link>
          </LinksSmall>
        </NavSmall>
      )}
    </Contain>
  )
}

export default Navbar

const Contain = styled.div`
  position: fixed;
  z-index: 10;
  height: 5rem;
  width: 100%;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  top: 0;
`

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 5rem;
  padding-top: 1rem;
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
`
const Logo = styled.img`
  max-width: 70px;
  border-radius: 50%;
`
const Links = styled.div`
  font-size: 18px;
  letter-spacing: 0.5px;
  a {
    text-decoration: none;
    color: black;
    margin: 0 1rem;
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

  @media (max-width: 480px) {
    display: none;
  }
`

const Button = styled.div`
  button {
    width: 50px;
    height: 50px;
    font-size: x-large;
    border-radius: 50%;
    border: none;
    font-weight: 800;
  }

  @media (min-width: 480px) {
    display: none;
  }
`
const NavSmall = styled.div`
  background: white;
  height: 100vh;
`

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
`
