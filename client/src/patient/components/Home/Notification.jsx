import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const notifications = [
  {
    id: 1,
    name: "Book an Appointment",
    redirect: "/booknow",
  },
  {
    id: 0,
    name: "Have Some Questions",
    redirect: "/forum",
  },
];

const Notification = () => {
  return (
    <div className="flex flex-col-reverse  h-fit fixed gap-8 z-10 bottom-[2rem] sm:gap-6">
      {notifications.map((data) => {
        return (
          <motion.div
            key={data.id}
            initial={{ opacity: 0, x: -200 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { type: "spring", duration: 1, bounce: 0.5 },
            }}
            exit={{
              opacity: 0,
              x: -200,
            }}
          >
            <Link
              to={data.redirect}
              className="relative  text-white bg-[#4e77bd] py-2 px-4 rounded-full tracking-wide z-10  left-10 sm:left-2 sm:text-xs"
            >
              {data.name}
              <span className="animate-ping absolute w-4 h-4 rounded-full bg-red-600 top-0 right-0"></span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Notification;
