import React from "react";
import styled from "styled-components";
import {FiPhoneCall} from 'react-icons/fi'
import {FiMail} from 'react-icons/fi'
import {AiFillFacebook} from 'react-icons/ai'
import {AiFillYoutube} from 'react-icons/ai'
import {AiFillLinkedin} from 'react-icons/ai'

const Footer = () => {
  return (
    <Foo>
      <footer>
        <div className="content">
          <div className="left box">
            <div className="upper">
              <div className="topic">About us</div>
              <p>
                CodingLab is a channel where you can learn HTML, CSS, and also
                JavaScript along with creative CSS Animations and Effects.
              </p>
            </div>
            <div className="lower">
              <div className="topic">Contact us</div>
              
              <div className="phone">
                <a href="#">
                <FiPhoneCall />
                <span>
                  +007 9089 6767
                </span>
                </a>
              </div>
              <div className="email">
                <a href="#">
                  <FiMail />
                  <span>
                  abc@gmail.com
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="middle box">
            <div className="topic">Our services</div>
            <div>
              <a href="#">Web Design, Development</a>
            </div>
            <div>
              <a href="#">Web UX Design, Reasearch</a>
            </div>
            <div>
              <a href="#">Web User Interface Design</a>
            </div>
            <div>
              <a href="#">Theme Development, Design</a>
            </div>
            <div>
              <a href="#">Wire raming & Prototyping</a>
            </div>
          </div>
          <div className="right box">
            <div className="topic">Subscribe us</div>
            <form action="#">
              <input type="text" placeholder="Enter email address" />
              <input type="submit" name="" value="Send" />
              <div className="media-icons">
                <a href="#">
                  <AiFillFacebook />
                </a>
                <a href="#">
                  <AiFillYoutube />
                </a>
                <a href="#">
                  <AiFillLinkedin />
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="bottom">
          <p>
            {/* Copyright © 2023 <a href="#">Coding ka baap</a> All rights reserved */}
          </p>
        </div>
      </footer>
    </Foo>
  );
};

export default Footer;

const Foo = styled.div`

  color: black;
  width: 100%;
  overflow-x: hidden;
  bottom: 0;
  z-index: 10;

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
  footer .upper p {
    width: 50%;
  }
  footer .content p,
  footer .content .box {
    width: 30%;
    transition: all 0.4s ease;
  }
  footer .content .topic {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  footer .content p {
    text-align: justify;
    width: 70%;
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
  .phone,.email {
    width: 10rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    a{
      margin-top: 10px;
      align-items: center;
      span {
        margin-left: 15px;
        position: relative;
        bottom: 5px;
      }
    }

  }
  footer .content .middle {
    padding-left: 80px;
  }
    footer .content .middle a {
    text-decoration: none;
    color: black;
    line-height: 32px;
  }
  footer .content .right input[type="text"] {
    height: 45px;
    width: 100%;
    outline: none;
    color: white;
    background: #F8C7DC;
    border-radius: 5px;
    padding-left: 10px;
    font-size: 17px;
    border: none;
  }
  footer .content .right input[type="submit"] {
    display: block;
    width: 26rem;
    height: 45px;
    font-size: 18px;
    color: white;
    background: #F8C7DC;
    outline: none;
    border-radius: 5px;
    letter-spacing: 1px;
    cursor: pointer;
    margin-top: 12px;
    border: none;
    transition: all 0.3s ease-in-out;
  }
  .content .right input[type="submit"]:hover {
    
    border: 2px solid black;
    color: black;
  }
  footer .content .media-icons {
    display: flex;
    justify-content: space-evenly;
  }
  footer .content .media-icons a {
    font-size: 3rem;
    color: #F8C7DC;
    text-align: center;
    height: 45px;
    width: 45px;
    display: inline-block;
    text-align: center;
    line-height: 43px;
    margin: 30px 5px 0 0;
    transition: all 0.3s ease;
  }
  footer .content .media-icons a:hover{
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
  }
  @media (max-width: 950px) {
    footer .content .box {
      width: 50%;
    }
    .content .right {
      margin-top: 40px;
    }
  }
  @media (max-width: 560px) {
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
  }
`;
