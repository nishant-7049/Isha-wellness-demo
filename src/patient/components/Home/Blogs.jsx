import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import SliderBlogs from "./Slider-blogs";

const Blogs = () => {
  const { ref, inView } = useInView({ threshold: 0.5 });
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
  return (
    <Container>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 100 }}
        animate={animation}
        className="blogs"
      >
        <h2 className="blog-h text-3xl font-bold">Blogs</h2>
        <p className="blog-text">
          Discover the world through our words: insights, inspiration, and
          perspectives
        </p>
        <div className="slides">
          <SliderBlogs />
        </div>
      </motion.div>
    </Container>
  );
};

export default Blogs;

const Container = styled.div`
  .blogs {
    margin: 2rem 0;
    padding-top: 1rem;
    padding-bottom: 4rem;
  }

  .blog-h {
    color: #00286b;
    text-align: center;
    margin: 1rem;
  }

  .blog-text {
    text-align: center;
    margin: 1rem auto;
    max-width: 70%;
  }

  .slides {
    margin: 2rem auto;
  }

  @media (max-width: 480px) {
    .blogs {
      margin: 1rem 0.5rem;
      padding: 1rem 0;
    }

    .blog-text {
      max-width: 95%;
      font-size: small;
    }

    .slides {
      margin: 1rem auto;
    }
  }
`;
