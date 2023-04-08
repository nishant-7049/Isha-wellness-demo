import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

function SingleBlog() {
  const { state } = useLocation();

  return (
    <motion.div
      className="mt-[4.5rem]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-[url(/images/bg/AboutBg.jpg)] bg-blend-overlay bg-black/20 bg-opacity-0  bg-cover bg-center w-[100%] h-[50vh]"></div>

      <div className=" mx-20 mt-20 gap-5">
        <div className="float-left w-[40rem] object-contain mr-8 mb-8">
          <img src={state.data.blogImg} alt="" />
        </div>
        <div className=" mb-[25rem] ">
          <h2 className="text-[1.5rem] font-bold text-[#00286b]">
            {state.data.topic}
          </h2>
          <p className="mb-2">
            {state.data.senderName} || {state.data.sentDate}
          </p>
          <p>{state.data.blogText}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default SingleBlog;
