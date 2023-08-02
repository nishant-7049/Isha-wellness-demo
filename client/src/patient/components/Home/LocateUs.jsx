import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Testimonial from "./Testimonial";
import { getTesti } from "../../../store/slices/testiSlice";
import { useDispatch, useSelector } from "react-redux";

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
  const [toggle, setToggle] = useState(0);

  const dispatch = useDispatch();

  const { testimonials, testiLoading, testiError } = useSelector(
    (state) => state.testimonial
  );
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
        {
          id: 4,
          img: "https://lh3.googleusercontent.com/a/AAcHTteHDbRM8ucxkU9FGUgh_6wS2jPCX6eBQpfqerGS=w75-h75-p-rp-mo-br100",
          name: "Narendra Solanki",
          des: `In Dashrath Sevashram teal of Isha Wellness centre camp to give therapy of joint pain,backpain, frozen shoulder,enable to sit properly etc;
          As experinced by parijan therapy style and system of Isha Wellness is proper and unique.   Since its totally different with routine physiotherapy.   Our parijan got benefitted with Isha Wellness therapy, behaviour of team found amicable and calm.
          
          I suggest this to experience Isha Wellness therapy for old acute pain and other problem.   Once again thank to ISHA WELLNESS team and Director.
          `,
          goo: "https://www.google.com/maps/place/ISHA+Wellness+Centre+Ratlam/@18.7207366,67.5205801,5z/data=!4m12!1m2!2m1!1sisha+wellness+centre!3m8!1s0x3963fea578acaff7:0x847dac23ee0d0262!8m2!3d23.3201068!4d75.0335898!9m1!1b1!15sChRpc2hhIHdlbGxuZXNzIGNlbnRyZZIBFHBoeXNpb3RoZXJhcHlfY2VudGVy4AEA!16s%2Fg%2F11gg6c4lzc",
        },
        {
          id: 5,
          img: "https://lh3.googleusercontent.com/a-/AD_cMMSppTgMPx1AAlpXUClJsspvE25D4C6UFd40BaQHPQ=w75-h75-p-rp-mo-br100",
          name: "VEDANSH",
          des: `Hello,
          Myself Vedansh Pendrawala, 26, businessman, is immensely happy in writing this review for Isha Wellness Centre, Indore.
          A few days back, I was diagnosed with grade 1 fatty liver. Due to which I suffered severe abdominal pain for a stretch of a month until I visited Isha Wellness Centre.
          It only took them 1 therapy session to wash away that prolonged pain.
          Also I continued the therapy for almost a month.
          There was a mix of therapies, yoga, aerobics & stretching in each session. With this physical exercise part, they also guide us through the diet, sleep cycle & other lifestyle aspects during our tenure.
          They also guided me for some corrections in my professional & personal lifestyle like my driving position, office chair position, sleeping position & a whole lot changes in my diet which resulted in reduction of some types of pains & other problems faced in daily routine.
          Everybody @Isha is dedicated to get away the unhealthy part in you & they put loads of effort to get you through it.
          The founders, Mr. & Mrs. Rajpurohit knows every detail of the body. From the functionalities of it to the minute complexities of it. These guys are true genius.
          Isha Wellness Centre is a true example of what a wellness centre should be. They are doing the work of God!
          I hope to see more upcoming centres like this in all over the world.
          Kudos to these guys!
          
          Regards,
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
          img: "https://lh3.googleusercontent.com/a/AGNmyxYMZInWMvgU2oAaDksTx7d8lH-Vt4m672Nuaxff=w45-h45-p-c0x00000000-rp-mo-br100",
          name: "Kavita Chawla",
          des: `I am KAVITA CHAWLA
          I lived in Ahmedabad
          I have back pain & foot pain for that I visited many doctors in Ratlam as well as in Ahmedabad but I don't get relief from the pain I had different types of medicines spray & ointment but it was a temporary relief I had the pain continue.
          Then I visited Ratlam to my Moms house she was having Physiotherapy at Isha wellness center fr back pain & knee pain she get so much relief from the Physiotherapy. she suggested me to join the Isha Wellness center for Physiotherapy.
          Then I started having Physiotherapy at my home for 15 days & 15 days I visited to Isha wellness center i get so much relief from the pain after having Physiotherapy.
          I don't use to take any type of pain killer .
          Both the visit at my home & at center were very good experience the tutors were very good in nature , experienced & more than that very supportive they help & guide to do all the exercise. Tutors do exercise first then they watch we our doing correct or not they guide us to do proper exercise & correct exercise.
          The atmosphere of center feels like Family & Home..
          "I Personally want To THANKS ISHA WELLNESS CENTER for the Physiotherapy by which I get so much relief"..
          " THANKYOU"..`,
          goo: "https://www.google.com/maps/place/ISHA+Wellness+Centre+Ratlam/@18.7207366,67.5205801,5z/data=!4m12!1m2!2m1!1sisha+wellness+centre!3m8!1s0x3963fea578acaff7:0x847dac23ee0d0262!8m2!3d23.3201068!4d75.0335898!9m1!1b1!15sChRpc2hhIHdlbGxuZXNzIGNlbnRyZZIBFHBoeXNpb3RoZXJhcHlfY2VudGVy4AEA!16s%2Fg%2F11gg6c4lzc",
        },
        {
          id: 1,
          img: "https://lh3.googleusercontent.com/a/AGNmyxbLt6xvbAWAhUBpPaw1ZBBaGIb0HRG41ph1P_WL=w45-h45-p-c0x00000000-rp-mo-br100",
          name: "Pankaj Sharma",
          des: `Would definitely recommend if you are facing any musculoskeletal imbalance , pain related issue.
  
          Sir,Mam and whole staff here is HIGHLY skilled and you will get well customized treatment which is mix of modern physiotherapy exercises , yoga ,aerobics etc etc based one your issue.
          
          Special mention to ora around here which is highly unmatchable and can't be described but it will take no time for you to feel you came to right place.
          
          PS: Isha wellness center is truly a gift to the people of Ratlam by the vision seen by sir Nd mam.`,
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
        {
          id: 4,
          img: "https://lh3.googleusercontent.com/a-/ACB-R5QQq_fy4sr7Cq_asZsaNocbTCIl7mfu1YXNbemdpA=w45-h45-p-c0x00000000-rp-mo-ba3-br100",
          name: "AMIT ARYAMA",
          des: `"Health is Wealth", well known phrase but realized at Isha Wellness Centre. A place beyond general perception of Health Care they provide development of your complete being in the light of Yoga, Physiotherapy as well as on the level of consciousnesses. Once the work started on level of consciousness wellness of being will come automatically that is the key factor this centre develops in person the only thing is one should be open enough to accept and follow the guidance. Feel privileged being connected to such a True Wellness Centre.`,
          goo: "https://www.google.com/maps/place/ISHA+Wellness+Centre+Ratlam/@18.7207366,67.5205801,5z/data=!4m12!1m2!2m1!1sisha+wellness+centre!3m8!1s0x3963fea578acaff7:0x847dac23ee0d0262!8m2!3d23.3201068!4d75.0335898!9m1!1b1!15sChRpc2hhIHdlbGxuZXNzIGNlbnRyZZIBFHBoeXNpb3RoZXJhcHlfY2VudGVy4AEA!16s%2Fg%2F11gg6c4lzc",
        },
        {
          id: 5,
          img: "https://lh3.googleusercontent.com/a-/ACB-R5QozbZurUdWgV-Nldy8zkHTBZ6dZEd7u2YHm2Tzag=w45-h45-p-c0x00000000-rp-mo-br100",
          name: "Tushar Purohit",
          des: `"I had a muscle injury while working out in the left trapeze region , though after massage and nerve relaxation related medication the pain got subdided an was reoccurring again and again .
          After discussing it with mummy I came to know about ISHA WELLNESS CENTER ,with doubts in my mind and anxiety I went there and discussed my problem with DR MINJAN & DR HITESH ,out of suprise I was just amaze by their approach toward my injury and healing process
          Firstly they asked me the reason of my injury ,after knowing the reason they analysed the wrong doings in my workout and explained me about the balance between stamina strength and suppleness.
          
          Secondly the councelled me about the need to know the requirement of the body and pushing myself for what can be considered as benificial toward the health of body and mind
          
          Thirdly the prospectus which any of the physio would do ie to make u do a specific set of exercise and give a type of diet or routine to be followed
          But ....belive me without the first to step it may be possible that the u will recover from Pai but in order for a complete hollistic healing from the injury the first two steps are nessecary which are forte of this place
          I will suggest any patient having any sort of injury to atleast go and meet the team for once
          I assure u won't regret
          From my side it is a complete 5 star rating for centre😇`,
          goo: "https://www.google.com/maps/place/ISHA+Wellness+Centre+Ratlam/@18.7207366,67.5205801,5z/data=!4m12!1m2!2m1!1sisha+wellness+centre!3m8!1s0x3963fea578acaff7:0x847dac23ee0d0262!8m2!3d23.3201068!4d75.0335898!9m1!1b1!15sChRpc2hhIHdlbGxuZXNzIGNlbnRyZZIBFHBoeXNpb3RoZXJhcHlfY2VudGVy4AEA!16s%2Fg%2F11gg6c4lzc",
        },
      ],
    },
  ];

  useEffect(() => {
    const options = {
      cluster: "All",
      page: 1,
      itemsPerPage: 12,
    };
    dispatch(getTesti(options));
  }, []);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 100 }} animate={animation}>
      <Container className="mx-20 con sm:mx-10">
        <div className="container" itemID="Location">
          <h2 className="centers text-3xl">Our Centers</h2>
          <div className="locations flex justify-center">
            <button
              className={toggle === 0 ? "btn active-btn" : "btn"}
              onClick={() => setToggle(0)}
            >
              Indore
            </button>
            <button
              className={toggle === 1 ? "btn active-btn" : "btn"}
              onClick={() => setToggle(1)}
            >
              Ratlam
            </button>
          </div>

          <div className={toggle === 0 ? "content active-content" : "content"}>
            <div className="flex-row items-center">
              <div className="address h-[300px]">
                <p>
                  13, Narmada nagar, Chanakyapuri, Annapurna Road, behind SBI
                  Vaishali nagar, 452009
                </p>
                <p>
                  <a href="tel:">Mobile: +91-73836-77661</a>
                </p>
              </div>
              <div className="map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.2367843716133!2d75.83363191473049!3d22.682227685126406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd9a766e4bc5%3A0x950dbd8f954cea80!2sIsha%20Wellness%20Centre%20Indore!5e0!3m2!1sen!2sin!4v1676123749873!5m2!1sen!2sin"
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
            <div className="bg-[url(/images/HealedBG.jpg)] bg-cover bg-center bg-fixed rounded-md">
              <Testimonial
                data={
                  testimonials &&
                  testimonials.filter((testi) => testi.cluster === "Indore")
                }
              />
            </div>
          </div>
          <div className={toggle === 1 ? "content active-content" : "content"}>
            <div className="flex-row items-center">
              <div className="address h-[300px]">
                <p>
                  37, Chandni Chowk, near Hussaini Provision, opposite HDFC
                  Bank, Laxman Pura, Ratlam, Madhya Pradesh 457001
                </p>
                <p>
                  <a href="tel:">Mobile: +91-74123-59676</a>
                </p>
              </div>
              <div className="map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3663.8039676033886!2d75.03967301474339!3d23.322870284801738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3963fea578acaff7%3A0x847dac23ee0d0262!2sISHA%20Wellness%20Centre%20Ratlam!5e0!3m2!1sen!2sin!4v1676121397028!5m2!1sen!2sin"
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
            <div className="bg-[url(/images/HealedBG.jpg)] bg-cover bg-center bg-fixed rounded-md">
              <Testimonial
                data={
                  testimonials &&
                  testimonials.filter((testi) => testi.cluster === "Ratlam")
                }
              />
            </div>
          </div>
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
