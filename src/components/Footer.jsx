import React from 'react'
import styled from 'styled-components'
import { FiPhoneCall } from 'react-icons/fi'
import { FiMail } from 'react-icons/fi'
import { AiFillFacebook } from 'react-icons/ai'
import { AiFillYoutube } from 'react-icons/ai'
import { AiFillLinkedin } from 'react-icons/ai'

const Footer = () => {
  return (
    <Foo>
      <footer>
        <div className='content'>
          <div className='left box'>
            <div className='upper'>
              <div className='topic'>About us</div>
              <p>
                ISHA Wellness Centre is founded by Dr. Hitesh Purohit and Dr.
                Minjan Patel, social and innovative They are wellness leaders,
                entrepreneurs. therapists and public health professionals. They
                have developed new research based treatment guidelines and
                training material. Thus, it expanded into a team of more than 15
                trained wellness professionals at 5 locations. Every body is
                different, and IWC is committed to personalized wellness that
                everyone can fit into their lifestyle.
              </p>
            </div>
            <div className='lower'>
              <div className='topic'>Contact us</div>

              <div className='flex'>
                <div className='phone'>
                  <FiPhoneCall className='ph-icon' />
                  <a href='tel:+910123456789'>+91 01234 56789</a>
                </div>
                <div className='email'>
                  <FiMail className='eml-icon' />
                  <a href='mailto:abc@gmail.com'>abc@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
          <div className='middle box'>
            <div className='topic'>Our services</div>
            <ul>
              <li>Employee Wellness Program</li>
              <li>Hormone Balance Therapy</li>
              <li>Wellness Therapy</li>
              <li>Pregnancy Care</li>
              <li>Counseling</li>
              <li>Counseling</li>
              <li>Yoga</li>
            </ul>
          </div>
          <div className='right box'>
            <div className='topic'>Subscribe us</div>
            <form action='mailto:abc@gmail.com'>
              <input type='text' placeholder='Enter email address' />
              <input type='submit' name='' value='Send' />
              <div className='media-icons'>
                <a href='/'>
                  <AiFillFacebook />
                </a>
                <a href='/'>
                  <AiFillYoutube />
                </a>
                <a href='/'>
                  <AiFillLinkedin />
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className='bottom'>
          <p>
            {/* Copyright © 2023 <a href="/">Coding ka baap</a> All rights reserved */}
          </p>
        </div>
      </footer>
    </Foo>
  )
}

export default Footer

const Foo = styled.div`
  padding: 1rem 0;
  margin: 2rem auto;
  color: black;
  width: 100%;
  overflow-x: hidden;
  bottom: 0;
  z-index: 10;

  .flex {
    display: flex;
    margin: 0 0.5rem;
  }

  footer .topic {
    color: #f4b9d2;
  }
  footer {
    width: 100%;
    bottom: 0;
    left: 0;
    background: white;
  }
  footer .content {
    max-width: 1350px;
    margin: auto;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  footer {
    width: 100%;
    font-size: small;
  }

  footer .content .box {
    width: 30%;
    transition: all 0.4s ease;
  }
  footer .content .topic {
    font-size: x-large;
    font-weight: 600;
    margin-bottom: 16px;
  }

  footer .content .lower .topic {
    margin: 24px 0 5px 0;
  }
  footer .content .lower {
    display: inline-block;
  }
  footer .content .lower a {
    color: black;
  }
  .phone,
  .email {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.5rem;
  }
  footer .content .middle {
    padding-left: 80px;
  }
  footer .content .middle a {
    text-decoration: none;
    color: black;
    line-height: 32px;
  }
  footer .content .right input[type='text'] {
    height: 45px;
    width: 100%;
    outline: none;
    color: white;
    background: #f8c7dc;
    border-radius: 5px;
    padding-left: 10px;
    font-size: 17px;
    border: none;
  }
  footer .content .right input[type='submit'] {
    display: block;
    width: 100%;
    height: 45px;
    font-size: 18px;
    color: white;
    background: #f8c7dc;
    outline: none;
    border-radius: 5px;
    letter-spacing: 1px;
    cursor: pointer;
    margin-top: 12px;
    border: none;
    transition: all 0.3s ease-in-out;
  }
  .content .right input[type='submit']:hover {
    border: 2px solid black;
    color: black;
  }
  footer .content .media-icons {
    display: flex;
    justify-content: space-evenly;
  }
  footer .content .media-icons a {
    font-size: 2.5rem;
    color: #f8c7dc;
    text-align: center;
    height: 45px;
    width: 45px;
    display: inline-block;
    line-height: 43px;
    margin: 30px 5px 0 0;
    transition: all 0.3s ease;
  }
  footer .content .media-icons a:hover {
    color: black;
  }
  .content .media-icons a:hover {
    border-color: #eb2f06;
  }
  footer .bottom {
    width: 100%;
    text-align: center;
    color: black;
    padding: 0 40px 5px 0;
  }
  footer .bottom a {
    color: black;
  }
  footer a {
    transition: all 0.3s ease;
  }
  footer a:hover {
    color: #eb2f06;
  }

  @media (max-width: 1100px) {
    footer .content .middle {
      padding-left: 50px;
    }
    footer .content p {
      width: 100%;
      font-size: large;
    }
  }

  @media (max-width: 950px) {
    footer .content .box {
      width: 50%;
    }
    .content .right {
      margin-top: 40px;
    }
  }

  @media (max-width: 480px) {
    footer {
      position: relative;
    }
    footer .content .box {
      width: 100%;
      margin-top: 30px;
    }
    footer .content .middle {
      padding-left: 0;
    }
    footer .content p {
      width: 100%;
      font-size: small;
    }
    footer .content .topic {
      font-size: x-large;
    }

    .flex {
      font-size: small;
      justify-content: space-evenly;

      .ph-icon,
      .eml-icon {
        display: none;
      }
    }
  }
`
