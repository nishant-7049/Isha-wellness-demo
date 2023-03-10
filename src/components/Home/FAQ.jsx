import React from 'react'
import styled from 'styled-components'

const data = [
  {
    id: 1,
    title: `What are the problems for which one should consult IWC?`,
    description: `Wellness has Eight aspects, they are Physical, Financial, Intellectual, Emotional, Spiritual, Social, Environmental, and Occupational- contact us if you have problems in any of 8 aspects. Following are the problems for which one should contact Isha wellness centre:- • Joint pain and arthritis, • Muscle or ligament injury, • Pregnancy care, • Paralysis care, • Child therapy • Diet & nutrition, • Lifestyle management, • Health & wellness councelling, • Headache or migraine, • Vertigo & motion sickness, • Fobia, fear, anxiety & depression, • Physical deformities or disabilities • Asthama, chronic proncaities emphysema • Post Covid recovery • Blood pressure, diabetes, hernia, prostate • Hormonal balance therapy ( Thyroid, PCOD, irregular menstrual cycle) • Weight management • Tingling, numbness, burning or any other abnormal sensation • Sciatica • Repeated weekness or illness • Healthy ageing • Technology detoxification • Employee wellness • Relational wellbeing • Behaviour disorders • Financial wellbeing`,
  },
  {
    id: 2,
    title: `Is this Physiotherapy?`,
    description: `ISHA wellness therapy is a balance therapy - holistic wellness approach for over all health and well-being. We follow multiple effective practices from various therapies, so as Physiotherapy is a part of the Holistic Wellness approach along with Occupational therapy, Yoga, Vedic/Naturopathy therapy, Chiropractic, Chakra therapy, Counselling, Nutrition, Lifestyle modifications, posture care and Ergonomic adaptations.`,
  },
  {
    id: 3,
    title: `How does this Wellness therapy work?`,
    description: `Human suffering is mostly derived either from mind or body or both. Mind contributes a lot but after a certain age body starts reminding its existence. 'Body works as a puppet of Mind whereas active Body is a key to control Mind - It is Body mind complex, understand and act accordingly.' - Minjan & Hitesh We keep looking for solutions and problems keep coming after some time at frequent intervals. Later, problem becomes permanent and we are already done with non-surgical measures. Now, surgery is the only option left. In this whole story, we are talking about problem superficially. We need to ask 5 why's rather than 1 or 2. • Why there is back pain? Due to nerve compression. • Why nerve is being compressed? Due to deformity in spinal curvature. • Why deformity in spinal curvature? Due to bad postural and lifestyle habits. • Why bad postural and lifestyle habits affects spinal curvature? Nobody is asking this question, nobody bothers. • Why Nobody is asking/bother or focus about postural and lifestyle habits? Before we understand importance of posture and lifestyle habits, we need to first understand what exactly is a muscle, because our muscles are the key of our body posture. Muscle is a living organism with partially developed mind that is completely focused to help its owner as much as possible. in order to do so every muscle have developed a tendency to vary its length and tone according to the usage. Each and every work we do is in anterior direction (front) because all of our sensory organs are in the front part of the body. Due to extra work, anterior muscles become stronger which means the muscles have increased the tone. And due to prolong sitting these anterior muscles also reduce their length. A combination of both increased muscle tone and decreased muscle length create an imbalance which keeps increasing with time. on the other hand, our lifestyle has been shifted from hard work to sedentary one, balance to imbalanced one which makes situation more problematic. Most of the musculoskeletal and neurological problems are developed over a long period of time and requires sincerest efforts to regain the balance. This Wellness therapy helps patient for below mentioned steps, • To first understand the problem • Develop skills to listen/understand your body • Imparting guidance for do's and don'ts • Direction of the way to gain balance and manage lifestyle • Repeated counselling to stick to the goal • Enabling environment through different therapies to achieve the expected outcomes • A way for healthy and happy life Further, this therapy is helpful to reactive and proactive care for many lifestyle disorders.`,
  },
  {
    id: 4,
    title: `What is my (patient's) role during and after completion of treatment?`,
    description: `• The primary role of the patient is to understand what and why exactly is suffering, root cause of the problem? • To understand the factors which increases the problems. • To make suggested changes in lifestyle, postures and ergonomics to decrease problem or its root cause. • To be regular at the therapy and avoid the avoidable leaves. • To follow home based care instructions/home work without fail. • To be in touch with the therapist regularly and share the progress. • To be honest about problem, lifestyle and progress • To continue exercises at least five times a week after the problem is solved to prevent recurrence of the problem.`,
  },
  {
    id: 5,
    title: `Is there any complication of this therapy?`,
    description: `Possible to experience some changes or reaction in the body as a part of the therapy action received. Like any exercise module, you may feel uneasiness, muscle fatigue pain or soreness for initial 2 to 5 days, which can be prevented and controlled with the help of appropriate use of hot and cold fomentation. Few patients have registered slight fever (Bone fever) for a day or two which did not required any medical treatment. Few patients have reported diarrhea for a day or two but they felt better after it further do not require any medical treatment in that case as well.`,
  },
  {
    id: 6,
    title: `How much time it takes to recover from my problem?`,
    description: `Your recovery depends on several factors, mentioned below in the order of their importance • Trust on the treatment • Dedication and efforts of patient • How old is the problem • Depth/complexity of the problem • Changes adapted in lifestyle and ergonomics • Regularity of treatment • Following frequency for homework, do's and don'ts • Mental state/ stress coping efforts • Age of the patient • Family support etc.`,
  },
  {
    id: 7,
    title: `I have tried different therapies, it work for some time but pain comes back once I stop the treatment. Will Wellness therapy sustain?`,
    description: `Any therapy would sustain if, therapy focuses on root cause not just symptoms, mostly patient prefers to be on therapy till symptoms disappear. One should give time to heal from within. Patient should understand the causing factors which increase his problem and try to minimize them, along with regular exercises suggested after the completion of the treatment. We need to understand that if pain is gone it doesn't mean problem is gone. We should identify problem, minimize the risky behavior, give time to our body to get balance everyday and increase our healthy practices. By this way you can sustain your recovery and minimize the rate of re-occurrence.`,
  },
]

function FAQ() {
  return (
    <Faq>
      <div className='faq'>
        <div className='content'>
          <div className='heading'>
            <h2>FAQs</h2>
          </div>
          {data.map((item) => {
            return (
              <div key={item.id}>
                <input
                  type='checkbox'
                  id={item.id}
                  name='q'
                  className='questions'
                />
                <div className='plus'>+</div>
                <label htmlFor={item.id} className='question'>
                  <p>{item.title}</p>
                </label>
                <div className='answers'>
                  <p>{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Faq>
  )
}

export default FAQ

const Faq = styled.div`
  .faq {
    font-family: 'Open Sans';
    font-size: 1rem;
    margin: 1.5rem 5rem;
    margin-bottom: 5rem;
  }

  .heading {
    color: #f4c9db;
    font-size: x-large;
    text-align: center;
    font-weight: 700;
    margin: 3rem auto;
    margin-top: 5rem;
  }

  .content {
    width: 100%;
    margin: 0 auto;
  }

  .centerplease {
    margin: 0 auto;
    max-width: 270px;
    font-size: 40px;
  }

  .question {
    position: relative;
    background: #f4c9db;
    margin: 0;
    padding: 10px 10px 10px 50px;
    display: block;
    width: 100%;
    cursor: pointer;
  }

  .answers {
    background: rgb(224, 217, 217);
    padding: 0px 15px;
    margin: 5px 0;
    max-height: 0;
    overflow: hidden;
    z-index: 0;
    position: relative;
    opacity: 0;
    -webkit-transition: 0.7s ease;
    -moz-transition: 0.7s ease;
    -o-transition: 0.7s ease;
    transition: 0.7s ease;
  }

  .questions:checked ~ .answers {
    max-height: fit-content;
    opacity: 1;
    padding: 15px;
  }

  .plus {
    position: absolute;
    margin-left: 10px;
    z-index: 5;
    font-size: 2em;
    line-height: 100%;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
    -webkit-transition: 0.3s ease;
    -moz-transition: 0.3s ease;
    -o-transition: 0.3s ease;
    transition: 0.3s ease;
  }

  .questions:checked ~ .plus {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .questions {
    display: none;
  }

  @media (max-width: 480px) {
    .faq {
      font-size: 10px;
      margin: 0 1rem;
      margin-bottom: 1rem;
    }

    .plus {
      font-size: 1rem;
      margin-top: 5px;
    }

    .heading {
      font-size: large;
      margin: 1rem auto;
      margin-top: 2rem;
    }
  }
`
