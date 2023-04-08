import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Testimonial from "./Testimonial";

const tabs = [
  {
    id: "2",
    location: "indore",
    mobile: "+91-73836-77661",
    email: " abs@gmail.com",
    address:
      "13, Narmada nagar, Chanakyapuri, Annapurna Road, behind SBI Vaishali nagar, 452009",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.2367843716133!2d75.83363191473049!3d22.682227685126406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd9a766e4bc5%3A0x950dbd8f954cea80!2sIsha%20Wellness%20Centre%20Indore!5e0!3m2!1sen!2sin!4v1676123749873!5m2!1sen!2sin",
    testi: [
      {
        id: 0,
        img: "https://lh3.googleusercontent.com/a/AGNmyxbIDgEueY84i-9KygAxtMq6n8tiZyTXPmOXrvcb=w75-h75-p-rp-mo-br100",
        name: "Nita Tamrakar",
        des: `Namskar,
        Myself Neeta Tamrakar, 52, house-wife, delivers my gratitude while writing my review & sharing my progress experience at Isha Wellness Centre, Indore.
        I am a patient of severe arthritis from past 10 years. I have experienced unbearable pain in both my knees all these years & was suggested both knee replacement surgery by well known doctors. My condition was worsened as I was on wheelchair, walking 10-20 steps was almost impossible, climbing stairs was once again a dream like a new born child & even getting in & out of a car were frightening experiences.
        This was the time of 2021 when I & my family were almost helpless about my condition & both knee replacement surgery was the only option we thought we had until we met the founders of ISHA WELLNESS CENTRE, Dr. Hitesh & Dr. Minjan.
        This was the turning point of my life as we decided to postpone (& now cancelled) our plan for surgery & go with the physio-acupressure-yoga-stretching therapy as suggested by both the doctors at Isha wellness centre, Indore.
        The founders are gems individually & in the field of health, mind, body & wellness as well.
        With their team of expertly well trained Facilitators, they (Dr. Hitesh & Dr. Minjan) curated a well effective program of daily therapy sessions for me which included Physiotherapy, acupressure therapy, yoga, stretching & aerobics. Also they made changes in my diet & lifestyle.
        Since one year, I am going for these sessions, daily 2-2.5 hours & I am immensely happy in telling you that the results my body has achieved are MIRACULOUS.
        * I left using my wheelchair after 1.5 months of therapy & haven't used it since then.
        * After 5-6 months of therapy, I was able to walk without walker or any other support.
        * After 10 months of therapy I started to climb stairs.
        * And today, I am able to walk, do all the household chores, attend social gatherings & do everything that I was restricted due to my health condition one year back.
        Nothing, I think would have made me this much healthier, confident & harmonious than Isha wellness centre, Indore, the founders & their expert team.
        Wish I would have met them earlier so I could have enjoyed my son's wedding instead of using a wheelchair back then.
        No words can do justice to the hard work, sincerity, time & energy that the founders & the team of Isha wellness centre has put in me as a patient.
        Everyone at the centre encourages me to overcome this problem & make every possible effort by their expert program for me to do so.
        Apart from relieve in knee joint pain, there are other various good impact on my body that I have achieved with this therapy.
        My energy level, my sleep cycle, my digestion, metabolism, sugar level (as I am diabetic) & mind-body wellness has improved to great levels.
        I would suggest Isha Wellness Centre, Indore to anybody young or old with any problem in the body they may have, surgery suggested patients or just routine pain patients and Isha wellness centre has the solution for all of them.
        At last I would like to thank both the founder doctors & their entire team, Ashwin bhaiya, Ayush Bhaiya & Pooja didi for the second life that I am living because of them. They are truly the people of GOD.
        Hope they grow themselves across the world & spread life, happiness & wellness.`,
        goo: "https://www.google.com/maps/place/ISHA+Wellness+Centre+Ratlam/@18.7207366,67.5205801,5z/data=!4m12!1m2!2m1!1sisha+wellness+centre!3m8!1s0x3963fea578acaff7:0x847dac23ee0d0262!8m2!3d23.3201068!4d75.0335898!9m1!1b1!15sChRpc2hhIHdlbGxuZXNzIGNlbnRyZZIBFHBoeXNpb3RoZXJhcHlfY2VudGVy4AEA!16s%2Fg%2F11gg6c4lzc",
      },
      {
        id: 1,
        img: "https://lh3.googleusercontent.com/a/AGNmyxZnfj7xsvepSz1QVxSdCsejJ2ZpQH9qZvud0I4=w75-h75-p-rp-mo-br100",
        name: "Shubham Sharma",
        des: `As being sports person, I had a very severe pain in my back while playing. I was unable to move any side. I had received therapy from ISHA Wellness Centre, and found therapy session very helpful and effective for me. On the first session, just after few hrs it felt very much relaxed & there was less pain in my back. I am fine with my problem in couple of sessions. They have also guided me so that I can prevent injury and also strengthen my particular muscles in a way so that I can play better.

        Now I have started playing again without any pain. Special thanks to the team for helping me fit, Best supporting Doctors and staff! I will recommend to all must visit IWC for any health related issues.`,
        goo: "https://www.google.com/maps/place/ISHA+Wellness+Centre+Ratlam/@18.7207366,67.5205801,5z/data=!4m12!1m2!2m1!1sisha+wellness+centre!3m8!1s0x3963fea578acaff7:0x847dac23ee0d0262!8m2!3d23.3201068!4d75.0335898!9m1!1b1!15sChRpc2hhIHdlbGxuZXNzIGNlbnRyZZIBFHBoeXNpb3RoZXJhcHlfY2VudGVy4AEA!16s%2Fg%2F11gg6c4lzc",
      },
      {
        id: 2,
        img: "https://lh3.googleusercontent.com/a-/ACB-R5RQX9AN0H8KsPlOKIsWzRGf1Lh-WtvRMw41sAzw=w75-h75-p-rp-mo-br100",
        name: "Mahi Gautam",
        des: `There was a severe pain in my shoulder, elbow and hand. It was very difficult for me to do any work. Even to hold the utensils is also difficult and much painful. I took therapy at ISHA Wellness Centre. It worked very well, they have guided me for do's and don'ts, provided therapy home work as well. I felt so much relaxed, now I am able to do my routine well. This is really great  Wellness Centre and best supportive staff.
        `,
        goo: "https://www.google.com/maps/place/ISHA+Wellness+Centre+Ratlam/@18.7207366,67.5205801,5z/data=!4m12!1m2!2m1!1sisha+wellness+centre!3m8!1s0x3963fea578acaff7:0x847dac23ee0d0262!8m2!3d23.3201068!4d75.0335898!9m1!1b1!15sChRpc2hhIHdlbGxuZXNzIGNlbnRyZZIBFHBoeXNpb3RoZXJhcHlfY2VudGVy4AEA!16s%2Fg%2F11gg6c4lzc",
      },
      {
        id: 3,
        img: "https://lh3.googleusercontent.com/a-/ACB-R5TDwS5pIV1OX4vz6tZjw-Rw_CTbzrO_0BC5UbDn=w75-h75-p-rp-mo-br100",
        name: "CHANDNI KOTWANI",
        des: `I have received guidance for my health issue and the best suitable treatment options for the hair issue from ISHA Wellness Centre. And I'm glad to admit that I have overcome from my health issues as well and recovered fully. I'm Grateful to the Doctor for their support and all the wonderful suggestions and encouragement provided.
        I'm happy that I made a right choice by choosing this ISHA wellness center 😊 thankyou for all the care.
        `,
        goo: "https://www.google.com/maps/place/ISHA+Wellness+Centre+Ratlam/@18.7207366,67.5205801,5z/data=!4m12!1m2!2m1!1sisha+wellness+centre!3m8!1s0x3963fea578acaff7:0x847dac23ee0d0262!8m2!3d23.3201068!4d75.0335898!9m1!1b1!15sChRpc2hhIHdlbGxuZXNzIGNlbnRyZZIBFHBoeXNpb3RoZXJhcHlfY2VudGVy4AEA!16s%2Fg%2F11gg6c4lzc",
      },
    ],
  },
  {
    id: "1",
    location: "ratlam",
    mobile: "+91-74123-59676",
    email: " ",
    address:
      "37, Chandni Chowk, near Hussaini Provision, opposite HDFC Bank, Laxman Pura, Ratlam, Madhya Pradesh 457001",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3663.8039676033886!2d75.03967301474339!3d23.322870284801738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3963fea578acaff7%3A0x847dac23ee0d0262!2sISHA%20Wellness%20Centre%20Ratlam!5e0!3m2!1sen!2sin!4v1676121397028!5m2!1sen!2sin",
    testi: [
      {
        id: 0,
        img: "https://lh3.googleusercontent.com/a-/ACB-R5RzGd87bEc5LRVXKhxPXySgChKI0hkWoqDpM0uu5A=w75-h75-p-rp-mo-br100",
        name: "Vipul Sharma",
        des: `Great place with experienced people,
        identify issues and prescribe the best physical therapy treatment for my need and abilities. Great explanation of treatment and help with pinpointing problem areas as well as exercises to overcome issues.
        
        Thank you ISHA Wellness Centre!`,
        goo: "https://www.google.com/maps/place/ISHA+Wellness+Centre+Ratlam/@18.7207366,67.5205801,5z/data=!4m12!1m2!2m1!1sisha+wellness+centre!3m8!1s0x3963fea578acaff7:0x847dac23ee0d0262!8m2!3d23.3201068!4d75.0335898!9m1!1b1!15sChRpc2hhIHdlbGxuZXNzIGNlbnRyZZIBFHBoeXNpb3RoZXJhcHlfY2VudGVy4AEA!16s%2Fg%2F11gg6c4lzc",
      },
      {
        id: 1,
        img: "https://lh3.googleusercontent.com/a/AGNmyxa5FEG9J3KUc7w2fua2KQ3_L_hzb28ISYjCXL_3=w75-h75-p-rp-mo-br100",
        name: "Ragini Jaiswal",
        des: `"There is a clam and happy atmosphere and true expertise." Thank you all for your excellent care. I personally appreciate your professionalism, concern and friendliness. The therapist are honest towards there work they have command in tackling their patients. Almost my husband recovered from his paralysis from here only. I thank you all once again for your help and support.
        `,
        goo: "https://www.google.com/maps/place/ISHA+Wellness+Centre+Ratlam/@18.7207366,67.5205801,5z/data=!4m12!1m2!2m1!1sisha+wellness+centre!3m8!1s0x3963fea578acaff7:0x847dac23ee0d0262!8m2!3d23.3201068!4d75.0335898!9m1!1b1!15sChRpc2hhIHdlbGxuZXNzIGNlbnRyZZIBFHBoeXNpb3RoZXJhcHlfY2VudGVy4AEA!16s%2Fg%2F11gg6c4lzc",
      },
      {
        id: 2,
        img: "https://lh3.googleusercontent.com/a-/ACB-R5S5xx3e4LuFarSoNC7jG-dfrPHsp51SkFBh55s97w=w75-h75-p-rp-mo-ba2-br100",
        name: "Abhay Choudhary",
        des: `Best Physiotherapy Centre in Ratlam. Better treatment & good friendly sported staff.`,
        goo: "https://www.google.com/maps/place/ISHA+Wellness+Centre+Ratlam/@18.7207366,67.5205801,5z/data=!4m12!1m2!2m1!1sisha+wellness+centre!3m8!1s0x3963fea578acaff7:0x847dac23ee0d0262!8m2!3d23.3201068!4d75.0335898!9m1!1b1!15sChRpc2hhIHdlbGxuZXNzIGNlbnRyZZIBFHBoeXNpb3RoZXJhcHlfY2VudGVy4AEA!16s%2Fg%2F11gg6c4lzc",
      },
      {
        id: 3,
        img: "https://lh3.googleusercontent.com/a/AGNmyxafmhXJtRqnZAfQ9KKUTu2xfJsRMvHdZmLoWhM=w75-h75-p-rp-mo-br100",
        name: "Mohammed Shakil",
        des: `Best therapy centre with very nice atmosphere and careable staff.They cure my back pain in very less time.
        `,
        goo: "https://www.google.com/maps/place/ISHA+Wellness+Centre+Ratlam/@18.7207366,67.5205801,5z/data=!4m12!1m2!2m1!1sisha+wellness+centre!3m8!1s0x3963fea578acaff7:0x847dac23ee0d0262!8m2!3d23.3201068!4d75.0335898!9m1!1b1!15sChRpc2hhIHdlbGxuZXNzIGNlbnRyZZIBFHBoeXNpb3RoZXJhcHlfY2VudGVy4AEA!16s%2Fg%2F11gg6c4lzc",
      },
    ],
  },
];
function LocateUs() {
  const { ref, inView } = useInView({ threshold: 0.3 });
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
          <h2 className="centers text-3xl">Our Centers</h2>
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
                  <p className="sm:text-sm">
                    Home-based services available @ Ahmedabad, Jaora(Ratlam)
                  </p>
                </div>
                <div className="bg-[url(/images/bg/geometricBG.jpg)] bg-cover bg-center bg-fixed rounded-md">
                  <Testimonial data={data.testi} />
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
    font-weight: 700;
    text-align: center;
    color: #00286b;
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
      font-weight: 500;
      background: transparent;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      color: #00286b;
      border: 2px solid #00286b;
      transition: 0.2s ease-in-out;
      text-transform: capitalize;

      &:hover {
        background-color: #00286b;
        color: white;
      }
    }
  }

  .locations .active-btn {
    background-color: #00286b;
    color: white;
  }

  .flex-row {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    padding: 2rem 0;
  }

  .address {
    width: 50%;
    font-size: x-large;
    text-transform: capitalize;
    background-color: #00286b;
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
