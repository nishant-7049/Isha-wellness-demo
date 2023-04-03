import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const tabs = [
  {
    id: "2",
    location: "indore",
    mobile: "+91-73836-77661",
    email: " abs@gmail.com",
    address:
      "13, Narmada nagar, Chanakyapuri, Annapurna Road, behind SBI Vaishali nagar, 452009",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.2367843716133!2d75.83363191473049!3d22.682227685126406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd9a766e4bc5%3A0x950dbd8f954cea80!2sIsha%20Wellness%20Centre%20Indore!5e0!3m2!1sen!2sin!4v1676123749873!5m2!1sen!2sin",
  },
  {
    id: "1",
    location: "ratlam",
    mobile: "+91-74123-59676",
    email: " ",
    address:
      "37, Chandni Chowk, near Hussaini Provision, opposite HDFC Bank, Laxman Pura, Ratlam, Madhya Pradesh 457001",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3663.8039676033886!2d75.03967301474339!3d23.322870284801738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3963fea578acaff7%3A0x847dac23ee0d0262!2sISHA%20Wellness%20Centre%20Ratlam!5e0!3m2!1sen!2sin!4v1676121397028!5m2!1sen!2sin",
  },
];
function LocateUs() {
  const { ref, inView } = useInView({ threshold: 0.5 });
  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1 },
      });
    }
  }, [inView]);
  const [toggle, setToggle] = useState("2");

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 100 }} animate={animation}>
      <Container className="mx-20 con sm:mx-10">
        <div className="container" itemID="Location">
          <h2 className="centers">Our Centers</h2>
          <div className="locations flex justify-center">
            {tabs.map((data) => {
              return (
                <button
                  key={data.id}
                  className={toggle === data.id ? "btn active-btn" : "btn"}
                  onClick={() => setToggle(data.id)}
                >
                  {data.location}
                </button>
              );
            })}
          </div>

          {tabs.map((data) => {
            return (
              <div
                key={data.id}
                className={
                  toggle === data.id ? "content active-content" : "content"
                }
              >
                <div className="flex-row items-center">
                  <div className="address h-[300px]">
                    <p>{data.address}</p>
                    <p>
                      <a href="tel:">Mobile: {data.mobile}</a>
                    </p>
                  </div>
                  <div className="map">
                    <iframe
                      src={data.map}
                      title="ratlam"
                      width="500"
                      height="300"
                      style={{ border: "0" }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
                <div className="text-center my-6 text-xl">
                  <p>
                    Home-based services available @ Ahmedabad, Jaora(Ratlam)
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </motion.div>
  );
}

export default LocateUs;

const Container = styled.div`
  .centers {
    text-align: center;
    color: #50acfb;
    font-size: 2rem;
  }
  .container {
    margin: 2rem auto;
    font-size: large;

    .content {
      display: none;
    }

    .active-content {
      display: block;
    }
  }

  .locations {
    margin: 2rem auto;
    text-align: center;
    .btn {
      margin: 0 1rem;
      font-size: 1.5rem;
      background: transparent;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      color: black;
      border: 2px solid #50acfb;
      transition: 0.2s ease-in-out;
      text-transform: capitalize;

      &:hover {
        background-color: #50acfb;
      }
    }
  }

  .locations .active-btn {
    background-color: #50acfb;
  }

  .flex-row {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    padding: 2rem;
  }

  .address {
    width: 50%;
    font-size: x-large;
    text-transform: capitalize;
    background-color: #50acfb;
    border-radius: 0.5rem;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    p {
      color: white;
      font-weight: 700;
    }
    a {
      text-decoration: none;
      color: white;
    }
  }

  @media screen and (max-width: 1300px) {
    .address {
      width: 100%;
      > p {
        font-size: 1rem;
      }
    }
    .map {
      > iframe {
        width: 400px;
        height: 300px;
        margin-left: 1rem;
      }
    }
  }
  @media screen and (max-width: 840px) {
    .flex-row {
      flex-direction: column;
      padding: 0.7rem;
      gap: 1rem;
    }
    .address {
      width: 100%;
      height: 200px;
      text-align: center;
    }
    .map {
      > iframe {
        width: 100%;
        height: 300px;
        margin-top: 1rem;
        margin-left: 0;
      }
    }
  }

  @media (max-width: 480px) {
    .container {
      margin: 2rem auto;
    }
    .locations {
      display: flex;

      .btn {
        font-size: small;
      }
    }

    .centers {
      font-size: 1.5rem;
    }

    .flex-row {
      justify-content: center;
      padding: 0;
      gap: 0;
    }

    .address {
      padding: 0.5rem;
      border-radius: 0.5rem;

      p {
        font-size: small;
      }
    }
  }
`;
