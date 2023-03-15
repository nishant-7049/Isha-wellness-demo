import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const data = [
  {
    id: 0,
    blogImg: '/images/process.jpg',
    senderName: 'Sender1',
    sentDate: '15 jan 2020',
    topic: 'What should be the topic of this blog ?',
    blogText:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus alkl;dajfd;alskjf asl;dkfja;lfdj ; alkdjf alsfj a;;  ias necessitatibus consequatur iure illum cum eos molestiae est consequuntur nisi!',
  },
  {
    id: 1,
    blogImg: '/images/process1.jpg',
    senderName: 'Sender2',
    sentDate: '15 jan 2020',
    topic: 'What should be the topic of this blog ?',
    blogText:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus alias necessitatibus consequatur iure illum cum eos molestiae est consequuntur nisi!',
  },
  {
    id: 2,
    blogImg: '/images/process2.jpg',
    senderName: 'Sender3',
    sentDate: '15 jan 2020',
    topic: 'What should be the topic of this blog ?',
    blogText:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus alias necessitatibus consequatur iure illum cum eos molestiae est consequuntur nisi!',
  },
  {
    id: 3,
    blogImg: '/images/process3.jpg',
    senderName: 'Sender4',
    sentDate: '15 jan 2020',
    topic: 'What should be the topic of this blog ?',
    blogText:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus alias necessitatibus consequatur iure illum cum eos molestiae est consequuntur nisi!',
  },
  {
    id: 4,
    blogImg: '/images/process4.jpg',
    senderName: 'Sender5',
    sentDate: '15 jan 2020',
    topic: 'What should be the topic of this blog ?',
    blogText:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus alias necessitatibus consequatur iure illum cum eos molestiae est consequuntur nisi!',
  },
  {
    id: 5,
    blogImg: '/images/process2.jpg',
    senderName: 'Sender6',
    sentDate: '15 jan 2020',
    topic: 'What should be the topic of this blog ?',
    blogText:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus alias necessitatibus consequatur iure illum cum eos molestiae est consequuntur nisi!',
  },
  {
    id: 6,
    blogImg: '/images/process1.jpg',
    senderName: 'Sender7',
    sentDate: '15 jan 2020',
    topic: 'What should be the topic of this blog ?',
    blogText:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus alias necessitatibus consequatur iure illum cum eos molestiae est consequuntur nisi!',
  },
]
const BlogPage = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <div className='blog'>
        <span>Out Recent Blogs</span>
        <h3>Our Blogs</h3>
      </div>
      <div className='card-con'>
        {data.map((data) => {
          return (
            <div className='card' key={data.id}>
              <div className='image'>
                <img src={data.blogImg} alt='' />
              </div>
              <div className='blog-text'>
                <span>
                  {data.senderName} | {data.sentDate}
                </span>
                <h2
                  onClick={() => {
                    navigate('/singleblog', { state: { blogId: data.id } })
                  }}
                >
                  {data.topic}
                </h2>
                <p>{data.blogText}</p>
                <a href='/' target='_blank'>
                  Read more.
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </Container>
  )
}

export default BlogPage

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Poppins&family=Work+Sans&display=swap');
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;

  a{
    text-decoration: none;
  }

  .blog{
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    > span{
      color: #f480b1;
    }
    > h3{
      font-size: 2rem;
      font-weight: 700;
    }
  }
  .main-head {
    text-align: center;
    margin-top: 5rem;
    color: #2b2b2b;
  }
  .card-con{
    margin: 0 auto;
    display: grid;
    width: 90%;
    grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
    align-items: center; 
  }
  .card {
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #ececec;
    > div >img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
    }
    .blog-text {
      display: flex;
      flex-direction: column;
      align-items: flex-left;
      justify-content: space-between;
      padding: 2rem;
      > span {
        font-size: 0.8rem;
        color: #f480b1;
      }
      > h2 {
        font-size: 1.4rem;
        font-weight: 600;
        color: #272727;
        &:hover{
          color: #f480b1;
        }
      }
      > p {
        color: #9b9b9b;
        font-size: 0.9rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        margin: 20px 0;
      }
      > a {
        color: #0f0f0f;
        &:hover{
          color: #f480b1;
          transition: all ease 0.3;
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    .card-con {
      grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
    }
  }
  @media screen and (max-width: 500px) {
    .card-con {
      grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
    }
  }
  @media screen and (max-width: 500px) {
    .blog-text {
      padding: 1rem;
    }
  }
  
`
