import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'


const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')

  const navigate = useNavigate()

  function registerUser(event) {
    event.preventDefault()

    axios
      .post('http://localhost:3001/api/register', {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.status === 'ok') {
          // window.location.href = '/login'
          navigate('/login')
        } else if (res.data.status === 'error') {
          alert(res.data.error)
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <Container>
      <div>
        <h2>User registration</h2>
        <form onSubmit={registerUser}>
          <div>
            <label>Email</label>
            <br />
            <input
              type='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              placeholder='Type your name'
              autoComplete='email'
            />
          </div>
          <div>
            <label>Password</label>
            <br />
            <input
              type='password'
              value={password}
              onChange={(e) => {
                setpassword(e.target.value)
              }}
              placeholder='Type your password'
              autoComplete='current-password'
            />
          </div>
          <Button>
            <button type='submit'>Register</button>
          </Button>
        </form>
        <p>
          Already have an account - &nbsp;
          <button className='login'
            onClick={() => {
              navigate('/login')
            }}
          >
            Login
          </button>
        </p>
      </div>
    </Container>
  )
}

export default Register

const Container = styled.div`
  display: flex;
  letter-spacing: 1px;
  margin: auto;
  align-items: center;
  padding: 2rem 1rem;
  margin-top: 10rem;
  margin-bottom: 10rem;
  width: 22%;
  justify-content: space-around;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background-color: #f4b9d2;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#8df6ff",endColorstr="#ec91ff",GradientType=1);

  h2 {
    text-align: center;
    align-items: center;
    margin: 1rem auto;
    color: white;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }

  form,
  form div {
    margin: 1rem auto;
  }

  input {
    border: none;
    border-radius: 3px;
    margin: 0.5rem 0;
    background: transparent;
    width: 100%;
    height: 30px;
    text-transform: lowercase;
    background: linear-gradient(#000, #000) center bottom 1px / calc(100% - 0px)
      2px no-repeat;
  }

  input:focus {
    outline: none;
  }

  p {
    font-size: 18px;
    text-align: center;
    align-items: center;
    text-transform: lowercase;

    button {
      color: blue;
      cursor: pointer;
      border-radius: 10px;
      border: none;
      padding: 5px 10px;
      color: black;
      text-transform: lowercase;
    }
  }

  .login {
    transition: 0.2s ease-in-out;
    background-color: #fff;
  }

  .login:hover {
    background-color: transparent;
  }

  @media screen and (max-width: 680px) {
    width: 50%;
  }
`

const Button = styled.div`
  margin: auto;
  text-align: center;
  align-items: center;

  button {
    border-radius: 15px;
    border: none;
    font-size: 20px;
    padding: 0.5rem 1rem;
    transition: 0.2s ease-in-out;
    cursor: pointer;
    background: transparent;
  }

  button:hover {
    background: #fff;
  }
`
