import React from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";

const data = [
  {
    id: 0,
    topic: `Physical Therapy`,
    img: `/images/service/img/2.jpg`,
    p1: [],
    logo: "/images/service/1.svg",
    list: [
      ` Pain Management: We take an integrative approach to pain management, which involves identifying the underlying cause and offering holistic treatment options for various conditions. Our services are effective in restoring optimal strength and function for joint pain in areas such as the Neck, Shoulder, Elbow, Hand, Back, hip, knee, ankle, and more. Additionally, we have a proven track record in successfully treating conditions such as spondylolisthesis, sciatica, headaches, Dizziness, Vertigo, Migraine, Motion sickness, Tingling, and Numbness in limbs.`,
      ` Neurological Rehabilitation: Our specialized care is dedicated to neurological rehabilitation for conditions such as stroke, Parkinson's disease, and multiple sclerosis, with the goal of enhancing mobility, balance, and coordination. Our team possesses a high level of expertise in optimizing functionality for patients requiring paralysis care.`,
      ` Injury Assessment and Treatment: Provide assessment and treatment for variety of injuries, such as sprains, strains, and fractures.`,
      ` Rehabilitation: After an injury or surgery, to recover strength, flexibility, and mobility through exercises, manual therapy, and other techniques`,
      ` Sports Injury Prevention and Management`,
      ` Pediatric Physiotherapy: To help them overcome developmental delays, congenital conditions, and injuries`,
      ` Geriatric Physiotherapy: To manage conditions such as arthritis, osteoporosis, and balance disorders, and improve their mobility and overall quality of life`,
    ],
    p2: ``,
  },
  {
    id: 1,
    topic: "Yoga",
    img: `/images/service/img/4.jpg`,
    p1: [
      `Welcome to our innovative yoga program, created to cater to individuals of all levels, from beginners to advanced practitioners. Our program is designed to improve your overall wellness and help prevent common health disorders. Our yoga sessions are tailored to meet your specific needs and goals, with a focus on enhancing strength, flexibility, balance, and relaxation.`,
      `Our experienced instructors bring a wealth of knowledge and expertise, making each session unique and enjoyable. Our yoga program is a great way to reduce stress, improve mental health, and enhance physical well-being.`,
    ],
    logo: "/images/service/2.svg",
    list: [],

    p2: [
      `Our experienced instructors bring a wealth of knowledge and expertise, making each session unique and enjoyable. Our yoga program is a great way to reduce stress, improve mental health, and enhance physical well-being.`,
    ],
  },
  {
    id: 2,
    topic: "Lifestyle Wellness Program",
    img: `/images/service/img/6.jpg`,
    p1: [
      `Our Lifestyle Wellness Program is a comprehensive, personalized approach to achieving optimal health and wellness. We offer a range of services to help you achieve your goals, including:
    `,
    ],
    logo: "/images/service/3.svg",
    list: [
      ` Get fit, get active: Personalized fitness coaching and support to help you reach your fitness goals and stay active.`,
      ` Lifestyle management: Strategies to help you manage stress, improve sleep, and create a healthy work-life balance.`,
      ` Balanced digestion: Nutrition counseling and support to improve digestion and gut health.`,
      ` Healthy ageing: A focus on preventive health measures to help you age well and maintain your vitality.`,
      ` Technology detoxification: Strategies to help you unplug and find balance in an increasingly digital world.`,
      ` Relational wellbeing: Counseling and support to help you navigate relationships and improve communication.`,
      ` Depression & anxiety relief: Evidence-based therapies and techniques to help manage depression and anxiety.`,
      ` Hormone balance therapy: Hormone testing and targeted therapies to help balance your hormones and improve your overall health.`,
    ],
    p2: `Our Lifestyle Wellness Program is designed to help you achieve optimal health and wellness through a holistic, personalized approach. Whether you're looking to improve your fitness, manage stress, or address specific health concerns, we are here to support you on your wellness journey. Contact us today to learn more about our Lifestyle Wellness Program and how we can help you achieve your health goals.`,
  },
  {
    id: 3,
    topic: "Women Wellness Care",
    img: `/images/service/img/8.jpg`,
    p1: [
      `Our society relies heavily on the contributions of women and we hold great respect for them for the care, respect, and love they provide in various forms. We are deeply appreciative of their services and offer a wide range of services to promote their health and happiness. The Women Wellness Wing provides numerous services, which include but are not limited to:
    `,
    ],
    logo: "/images/service/4.svg",
    list: [
      ` Pregnancy care and education`,
      ` Hormone balance therapy`,
      ` Gynecological health care and exams`,
      ` Breast health and cancer screenings`,
      ` Nutritional counseling`,
      ` Weight management`,
      ` Fitness and exercise programs
        `,
      ` Stress management
        `,
      ` Mental health counseling
        `,
      ` Sexual and reproductive health services
        `,
      ` Menopause management and education
        `,
      ` Wellness education and workshops.
        `,
    ],
    p2: `These services can be tailored to meet the unique needs of women across different age groups and backgrounds, and can be delivered by trained professionals in a supportive and caring environment.`,
  },
  {
    id: 4,
    topic: "Employee Wellness Program",
    img: `/images/service/img/10.jpg`,
    p1: [
      `We offer a comprehensive employee wellness program that includes health education and exercise sessions to empower your staff to prevent and address a range of occupational health problems. Our program is designed to promote physical and mental well-being, increase productivity, and reduce absenteeism.
    `,
      `Our experienced instructors will work with your employees to create a customized program that addresses their specific needs and goals. We provide a variety of health education sessions, covering topics such as stress management, healthy eating habits, and proper ergonomics. Our exercise sessions include a range of activities, such as yoga, and strength training, to improve cardiovascular health, flexibility, and overall fitness.
  `,
      `Our employee wellness program has been shown to reduce the incidence of workplace injuries and illnesses, and increase job satisfaction and employee retention. Investing in the health and wellness of your employees can also have a positive impact on your company's bottom line, with lower healthcare costs and increased productivity.
      `,
    ],
    logo: "/images/service/5.svg",
    list: [],
    p2: `Empower your employees to take charge of their health and well-being with our comprehensive employee wellness program. Contact us today to learn more about how we can help your company thrive.`,
  },
  {
    id: 5,
    topic: "Community Wellness Program",
    img: `/images/service/img/12.jpg`,
    p1: [
      `We take our social responsibility seriously, and that's why we've developed a community wellness program aimed at making evidence-based therapy services accessible to all. Our program provides training and enabling support to eligible active members of the community, empowering them to execute therapy services for their fellow community members. Our goal is to promote a healthier, happier, and more equitable society for all.
    `,
      `By adopting a village or town through our program, you can become a supporter of community wellness and help us make a positive impact on people's lives. We provide comprehensive training and support to our skilled-based facilitators, ensuring that they are equipped with the knowledge and skills necessary to provide quality therapy services. Our program covers a range of therapy services, including pain management, neurological rehabilitation, and yoga.
      `,
      `Participating in our community wellness program not only helps those in need, but it also benefits the community as a whole. By promoting health and well-being, we can foster a stronger and more resilient community. Additionally, our program can be an opportunity for personal growth and fulfillment, as facilitators are able to make a real difference in the lives of others.
      `,
    ],
    logo: "/images/service/6.svg",
    list: [],

    p2: `Join us in our mission to make evidence-based therapy services accessible to all by adopting a village or town and supporting our community wellness program. Contact us today to learn more about how you can get involved.`,
  },
  {
    id: 6,
    topic: "Wellness Resort (Coming Soon)",
    img: `/images/service/img/14.jpg`,
    p1: [
      `We are excited to announce that our new wellness resort project is coming soon! 
    `,
      `This project is a culmination of our years of experience in the wellness industry, and our passion for creating spaces that promote health and well-being. Our goal is to create a haven where guests can relax, recharge, and leave feeling better than when they arrived.
      `,
      `Our wellness resort will feature a range of facilities and services designed to enhance your physical, mental, and emotional wellness. You can expect to find a state-of-the-art spa offering a range of treatments, including massage, hydrotherapy, and aromatherapy. Our fitness center will feature the latest equipment and offer a variety of fitness classes, including yoga, Pilates, and strength training. Our nutritionists and chefs will work together to create a menu of healthy, delicious cuisine that is both nourishing and satisfying.`,
      `In addition to our wellness facilities, our resort will feature luxurious accommodations designed to promote rest and relaxation. We will have a variety of rooms and suites to choose from, each thoughtfully designed to create a sense of calm and tranquility.
      `,
    ],
    logo: "/images/service/7.svg",
    list: [],
    p2: `At our wellness resort, we believe that health and wellness are not a luxury, but a necessity. Our team of experts is dedicated to helping you achieve your wellness goals, and we can't wait to welcome you to our new space. Stay tuned for updates on our opening date and booking information.`,
  },
];

const SingleService = () => {
  const myLocation = useLocation();
  const idFromAddressBar = myLocation.pathname.substring(9);

  return (
    <motion.div
      className="mt-[4.5rem] "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {data
        .filter((item) => {
          return item.id == idFromAddressBar;
        })
        .map((item) => {
          return (
            <div className="text-justify ">
              <div className="bg-[url(/images/bg/OurServiceBG.jpg)]  bg-center bg-cover  bg-no-repeat w-[100%] h-[50vh]" />
              <div key={item.id} className="text-center">
                <div className="w-24 mt-8  mx-auto text-[4rem] text-[#00286b]">
                  <img src={item.logo} alt="" />
                </div>
                <h2 className="text-3xl text-[#00286b] font-extrabold border-b-4 border-[#00268b]">
                  {item.topic}
                </h2>
              </div>
              <div className="mx-20 sm:mx-8">
                <div className="float-right ml-8 mb-8 mt-8 sm:mt-8 w-1/2">
                  <img className="object-contain" src={item.img} alt="" />
                </div>
                <div className="leading-6 tracking-wide pt-20 sm:pt-12">
                  {item.p1.map((para) => {
                    return <p className="pb-8">{para}</p>;
                  })}
                  <ul className=" list-disc">
                    {item.list.map((list) => {
                      return <li className="pb-4">{list}</li>;
                    })}
                  </ul>
                  <p>{item.p2}</p>
                </div>
              </div>
            </div>
          );
        })}
      <Link to="/service">
        <div className="flex bg-[#00286b] rounded-full w-fit gap-4 text-white items-center p-4 justify-between mb-8 mx-20">
          <AiOutlineLeft />
          <p>Back to Services</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default SingleService;
