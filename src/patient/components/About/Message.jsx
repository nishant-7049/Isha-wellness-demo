import React from "react";
import styled from "styled-components";

const Message = () => {
  return (
    <div className="mt-20 tracking-widest leading-6">
      <h2 className=" mb-4 text-3xl text-center border-b-4 border-[#00296b] font-extrabold">
        {" "}
        Message from Founders
      </h2>
      <div className=" mb-4 h-40 w-full bg-[url(/images/bg/AboutBg.jpg)] bg-blend-overlay bg-black/20 bg-center ">
        <img className="h-32 m-auto" src="/images/nav-logo1.png" alt="" />
      </div>
      <div>
        <p className="pb-8">
          <H>
            Are you tired of feeling like you're at the mercy of your health
            issues?
          </H>{" "}
          Do you feel like you've tried everything to get relief from your
          symptoms, but nothing seems to work? It's understandable to feel
          frustrated and discouraged, but the truth is that the solution to your
          health problems may be closer than you think.
        </p>
        <p className="pb-8">
          At its core,{" "}
          <H>
            achieving optimal health is a journey that you must take charge of
            yourself!
          </H>{" "}
          While healthcare professionals can certainly provide guidance,
          treatment, and support, they can't do it all for you. True healing and
          wellness come from within, and it's up to you to take responsibility
          for your own health and wellbeing.
        </p>
        <p className="pb-8">
          This means taking <H>an active role in your health,</H> and seeking
          out the knowledge, tools, and support you need to achieve your
          wellness goals. It means understanding that treating symptoms is only
          a temporary fix, and that identifying and addressing the root causes
          of your health issues is <H>the key to long-term healing.</H>
        </p>
        <p className="pb-8">
          At times, this journey may feel overwhelming or challenging. There may
          be obstacles to overcome, and setbacks along the way. But it's
          important to remember that your health is worth the effort. By{" "}
          <H>
            making positive changes to your lifestyle, and seeking out support
          </H>{" "}
          from healthcare professionals, loved ones, and other resources, you
          can take control of your health and achieve the vibrant, healthy life
          you deserve.
        </p>
        <p className="pb-8">
          So if you're ready to take charge of your health and embark on the
          journey towards optimal wellness,{" "}
          <H>we encourage you to start today!</H> Remember,{" "}
          <H>
            it's not a quick fix or a one-time solution - it's an ongoing
            process
          </H>{" "}
          that requires <H>your active participation and commitment.</H> But
          with the right mindset, support, and resources, you can achieve your
          health goals and <H>live your best Life!</H>
        </p>
      </div>
    </div>
  );
};
const H = styled.div`
  font-weight: 800;
  display: inline;
`;

export default Message;
