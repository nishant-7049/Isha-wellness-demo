import React from "react";
import styled from "styled-components";

const AboutIWC = () => {
  return (
    <div className="mt-20 tracking-widest	leading-6">
      <h2 className="mb-4 text-3xl text-[#00286b] font-extrabold border-b-4 border-[#00286b]">
        About ISHA Wellness Centre
      </h2>
      <div className="w-[40%] my-8 ml-8  shadow-[5px_5px_15px_5px_#00286b] float-right sm:w-full">
        <img src="./images/About/AboutIWC.jpg" alt="" />
      </div>
      <div>
        <p className="mb-8">
          <H>Welcome to Isha Wellness Centre,</H> a place where we are committed
          to providing <H>evidence-based, patient-centered therapy services</H>{" "}
          that address the root cause of musculoskeletal and lifestyle-related
          disorders. Our goal is <H>to empower patients</H> with the knowledge,
          resources, and support they need to achieve long-term health and
          wellness, regardless of their age, occupation, or economic status. At
          Isha Wellness Centre, we believe in the power of{" "}
          <H>Holistic Wellness</H> and offer a range of services that address
          physical, emotional, and spiritual well-being. Our team of expert
          therapists is dedicated <H> to providing personalized care</H> to each
          patient, ensuring that they receive the best possible treatment for
          their unique needs.
        </p>
        <p className="mb-8">
          We are proud to offer a wide range of services, including
          musculoskeletal{" "}
          <H>
            {" "}
            pain management, paralysis care, child therapy, pregnancy care,
            lifestyle management, balanced digestion, healthy aging, technology
            detoxification, employee wellness, relational well-being, depression
            and anxiety relief, financial well-being, and hormone balance
            therapy.
          </H>{" "}
          We also understand the importance of
          <H> community wellness</H> and have developed a program to make our
          therapy services accessible to as much of the population as possible.
          We believe that everyone should have access to high-quality healthcare
          and are committed to doing our part to improve the health and
          well-being of our community.
        </p>
        <p>
          Thank you for choosing Isha Wellness Centre as your partner in health
          and wellness. We look forward{" "}
          <H>
            {" "}
            to helping you achieve your health goals and living your best life!
          </H>
        </p>
      </div>
    </div>
  );
};
const H = styled.div`
  font-weight: 800;
  display: inline;
`;
export default AboutIWC;
