import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const data = [
  {
    id: 0,
    topic: `Physical Therapy`,
    img: `/images/img (1).png`,
    para: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas inventore vitae facilis perferendis sapiente voluptate nihil ea laboriosam odio error, hic autem maxime rerum animi, vel saepe! Odit, non! Praesentium possimus eum maiores, dignissimos porro, numquam quae explicabo sint sunt et dolorum, laborum ducimus adipisci animi blanditiis quod ex tenetur?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas inventore vitae facilis perferendis sapiente voluptate nihil ea laboriosam odio error, hic autem maxime rerum animi, vel saepe! Odit, non! Praesentium possimus eum maiores, dignissimos porro, numquam quae explicabo sint sunt et dolorum, laborum ducimus adipisci animi blanditiis quod ex tenetur?',
  },
  {
    id: 1,
    topic: 'Yoga',
    img: '/images/img (2).png',
    para: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas inventore vitae facilis perferendis sapiente voluptate nihil ea laboriosam odio error, hic autem maxime rerum animi, vel saepe! Odit, non! Praesentium possimus eum maiores, dignissimos porro, numquam quae explicabo sint sunt et dolorum, laborum ducimus adipisci animi blanditiis quod ex tenetur?\\',
  },
  {
    id: 2,
    topic: 'Women Wellness care',
    img: '/images/img (1).png',
    para: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas inventore vitae facilis perferendis sapiente voluptate nihil ea laboriosam odio error, hic autem maxime rerum animi, vel saepe! Odit, non! Praesentium possimus eum maiores, dignissimos porro, numquam quae explicabo sint sunt et dolorum, laborum ducimus adipisci animi blanditiis quod ex tenetur?\\',
  },
  {
    id: 3,
    topic: 'Employee Wellness Program',
    img: '/images/img (2).png',
    para: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas inventore vitae facilis perferendis sapiente voluptate nihil ea laboriosam odio error, hic autem maxime rerum animi, vel saepe! Odit, non! Praesentium possimus eum maiores, dignissimos porro, numquam quae explicabo sint sunt et dolorum, laborum ducimus adipisci animi blanditiis quod ex tenetur?\\',
  },
  {
    id: 4,
    topic: 'Social Responsibility',
    img: '/images/img (1).png',
    para: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas inventore vitae facilis perferendis sapiente voluptate nihil ea laboriosam odio error, hic autem maxime rerum animi, vel saepe! Odit, non! Praesentium possimus eum maiores, dignissimos porro, numquam quae explicabo sint sunt et dolorum, laborum ducimus adipisci animi blanditiis quod ex tenetur?\\',
  },
  {
    id: 5,
    topic: 'Community Wellness Program',
    img: '/images/img (2).png',
    para: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas inventore vitae facilis perferendis sapiente voluptate nihil ea laboriosam odio error, hic autem maxime rerum animi, vel saepe! Odit, non! Praesentium possimus eum maiores, dignissimos porro, numquam quae explicabo sint sunt et dolorum, laborum ducimus adipisci animi blanditiis quod ex tenetur?\\',
  },
]

function ServicesPage() {
  const { ref, inView } = useInView()
  const animation = useAnimation()

  useEffect(() => {
    if (inView) {
      animation.start({
        opacity: 1,
        y: 0,
        transition: { type: 'spring', duration: 0.5, bounce: 0.5 },
      })
    }
  }, [inView])

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 200 }} animate={animation}>
      <div className='bg-[url(/images/ser-bac.jpg)] bg-cover bg-center bg-fixed py-8'>
        <div className='  pt-20 mx-20 '>
          <h3 className='text-white text-5xl text-center my-8'>Our Services</h3>
          {data.map((data) => {
            return (
              <div
                className='border-[1px] border-[white]] border-solid-50 m-4 '
                key={data.id}
              >
                <div className='flex  gap-5 items-center bg-black bg-opacity-50 px-20 py-8'>
                  <h2 className='text-[3rem] font-bold text-[#84adea] text-center'>
                    {data.topic}
                  </h2>
                  <div className='flex flex-1 flex-col '></div>
                  <div className='flex-0  object-contain '>
                    <img src={data.img} alt='' />
                  </div>
                </div>
                <p className='p-8 bg-[white]'>{data.para}</p>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

export default ServicesPage
