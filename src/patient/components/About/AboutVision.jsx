import React from "react";

const vision =
  "Our vision is a world where everyone has access to evidence based Integrative therapy and support, leading to a fulfilling pain-free life, with empowered patients taking control of their health and well-being.";

const mission = `Our mission is to provide evidence-based, patient-centered therapy
  services that address the root cause of MsNDs and lifestyle-related
  NCDs. Through our holistic wellness model, we aim to empower
  patients with the tools and resources they need to achieve long-term
  health and wellness, regardless of their age, occupation, or
  economic status. We are committed to increasing awareness about the
  impact of musculoskeletal pain on other health conditions and
  providing accessible, sustainable, and cost-effective therapy
  solutions that promote patient empowerment and support patients in
  achieving their health goals.`;
const AboutVision = () => {
  return (
    <div className=" mt-20  md:block">
      <div className="w-[30%] mr-12 mb-8 shadow-[5px_5px_15px_5px_#00286b] float-left sm:w-full ">
        <img className="w-fit" src="./images/About/vision.jpg" alt="" />
      </div>
      <div className="pb-20 w-fit lg:pb-0">
        <div className="py-8 w-fit">
          <h2 className="mb-5 pb-2 text-3xl text-[#00286b] font-bold border-b-[4px]  border-[#00286b] tracking-wide">
            Our Vision
          </h2>
          <p className="tracking-widest	leading-6">{vision}</p>
        </div>
        <div>
          <h2 className="mb-5 pb-2 text-3xl text-[#00286b] font-bold border-b-[4px]  border-[#00286b] tracking-wide">
            Our Mission
          </h2>
          <p className="tracking-widest	leading-6">{mission}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutVision;
