import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')

  const navigate = useNavigate()

  function loginUser(event) {
    event.preventDefault()

    axios
      .post('http://localhost:3001/api/login', { email, password })
      .then((res) => {
        if (res.data.user) {
          localStorage.setItem('token', res.data.user)
          alert('Login Success')
          navigate('/adminPanel')
        } else {
          console.log('Please check your email and password')
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <Container>
      <h2>Login</h2>
      <form onSubmit={loginUser}>
        <div>
          <label>Email</label>
          <br />
          <input
            type='email'
            value={email}
            placeholder='Type your name'
            autoComplete='email'
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </div>
        <div>
          <label>Password</label>
          <br />
          <input
            type='password'
            value={password}
            placeholder='Type your password'
            autoComplete='current-password'
            onChange={(e) => {
              setpassword(e.target.value)
            }}
          />
        </div>
        <Button>
          <button type='submit'>Submit</button>
        </Button>
      </form>
    </Container>
  )
}

export default Login

const Container = styled.div`
  display: flex;
  margin: auto;
  letter-spacing: 1px;
  padding: 1rem;
  align-items: center;
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
