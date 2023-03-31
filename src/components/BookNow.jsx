import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const BookNow = () => {
  const { ref, inView } = useInView()
  const animation = useAnimation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      navigate('/login')
    }

    if (inView) {
      animation.start({
        opacity: 1,
        x: 0,
        transition: { type: 'spring', duration: 0.5, bounce: 0.5 },
      })
    }
  }, [inView])

  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: -200 }} animate={animation}>
      <Container>
        <div className='form '>
          <form action='nishant'>
            <div className=' pandu '>
              <h1 className='form-head '>Book Treatment </h1>
              <div className='first'>
                <div className='left section'>
                  <div className='flex flex-col'>
                    <label htmlFor=''>Name</label>
                    <input type='text' name='myname' />
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor=''>Mobile No.</label>
                    <input type='mobile no' name='my mobile no' />
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor=''>Alternate No.</label>
                    <input type='mobile no' name='my alternate no' />
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor=''>Age</label>
                    <input type='number' name='my age' />
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor='payment date'> payment date</label>
                    <select name='payment date' id='payment'>
                      <option value='dai'> daily</option>
                      <option value='mem'>membership</option>
                    </select>
                  </div>

                  <button className='button button1'> save details </button>
                </div>

                <div className='center section'>
                  <div className='flex flex-col'>
                    <label htmlFor='payment date'> gender</label>
                    <select name='payment date' id='gender'>
                      <option value='male'> male</option>
                      <option value='female'> female</option>
                      <option value='other'> other</option>
                    </select>
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor='martial status'> martial status</label>
                    <select name='martial status' id='status'>
                      <option value='married'> married</option>
                      <option value='unmarried'> unmarried</option>
                      <option value='divorced'> divorced</option>
                      <option value='widow'> widow</option>
                    </select>
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor=''>Address</label>
                    <textarea
                      className='bg-[#eee]'
                      type='address'
                      name='my address'
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor='ocupation'> ocupation</label>
                    <select name='ocupation' id='ocupation'>
                      <option value='govermentjob'> goverment job</option>
                      <option value='private'> private job</option>
                      <option value='daily wage'> daily wage</option>
                      <option value='farmer labour'> farmer labour</option>
                      <option value='farmer owrner'> farmer(owrner)</option>
                      <option value='student'> student</option>
                      <option value='other'> other</option>
                    </select>
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor='education'> education</label>
                    <select name='education' id='education'>
                      <option value='no education'> no education</option>
                      <option value='primary education'>
                        {' '}
                        primary eduction
                      </option>
                      <option value='medium education'>
                        {' '}
                        medium education
                      </option>
                      <option value='graduation'> graduation</option>
                      <option value='graduation or pg'>
                        {' '}
                        graduation or pg
                      </option>
                    </select>
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor='package'> packages</label>
                    <select name='package' id='package'>
                      <option value='package'>package 1</option>
                      <option value='package'> package 2 </option>
                      <option value='package'> package 3 </option>
                    </select>
                  </div>
                </div>
                <div className='right section'>
                  <h1>Type of work</h1>
                  <div className='right-con my-[2px]'>
                    <label htmlFor=''>eligibale</label>
                    <input type='checkbox' name='my eligibale' />
                  </div>

                  <div className='right-con my-[2px]'>
                    <label htmlFor=''>Sitting</label>
                    <input type='checkbox' name='my sitting' />
                  </div>

                  <div className='right-con my-[2px]'>
                    <label htmlFor=''>Sleeping</label>
                    <input type='checkbox' name='my sleeping' />
                  </div>

                  <div className='right-con my-[2px]'>
                    <label htmlFor=''>Standing Position</label>
                    <input type='checkbox' name='my standing position' />
                  </div>
                  <div className='right-con my-[2px]'></div>

                  <div className='right-con my-[2px]'>
                    <label htmlFor=''>Walking</label>
                    <input type='checkbox' name='my walking' />
                  </div>

                  <div className='right-con my-[2px]'>
                    <label htmlFor=''>Weight Lifting</label>
                    <input type='checkbox' name='my put weight' />
                  </div>

                  <div className='right-con my-[2px]'>
                    <label htmlFor=''>Travelling</label>
                    <input type='checkbox' name='my travelling' />
                  </div>
                  <br />
                  <label htmlFor=''>Please specify if not above</label>
                  <input type='address' name='my address' />
                  <br />
                  <div className='flex flex-col'>
                    <label className='info'>
                      How you get to known about IWC
                    </label>
                    <select name='choose now' id='choose'>
                      <option value='choose'> choose </option>
                      <option value='news paper'> news paper</option>
                      <option value='google'> google</option>
                      <option value='facilater'> facilater</option>
                      <option value='pempplates'> pempplates</option>
                      <option value='social media'> social media</option>
                      <option value='patient'> patients</option>
                      <option value='doctor'>doctor</option>
                      <option value='relative or friends'>
                        relatives or friends
                      </option>
                    </select>
                  </div>
                  <br />
                  <div className='flex flex-col'>
                    <label htmlFor='batch'> batch</label>
                    <select name='batch' id='batch'>
                      <option value='time'> 8:30-10:30</option>
                      <option value='time'> 10:30-12:30 </option>
                      <option value='time'> 2:00-4:00</option>
                      <option value='time'> 4:00-6:00</option>
                      <option value='time'> 6:00-8:00</option>
                    </select>
                  </div>
                  <br />
                  <label htmlFor='payment'> payment</label>
                  <input type='payment' name='payment' />
                </div>
                <button className='button button2'> save details </button>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </motion.div>
  )
}

export default BookNow

const Container = styled.div`
  margin-top: 6rem;
  margin-bottom: 4rem;

  label {
    font-size: 0.8rem;
    margin: 1px;
    text-transform: capitalize;
  }

  select {
    text-transform: capitalize;
  }

  .form-head {
    text-align: center;
    padding-top: 1rem;
    font-size: 1.5rem;
  }
  form {
    width: 80%;
    margin: 1rem auto;
    background: #fff;
  }
  .pandu {
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
    background: #fff;
  }
  .first {
    height: content-fit;
    width: content-fit;
    display: flex;
    justify-content: space-between;
  }
  .section {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 2rem;
    justify-content: space-between;
  }

  .section input {
    padding: 0.5rem 1rem;
    background-color: #eee;
  }
  .section select {
    padding: 0.5rem 1rem;
    background-color: #eee;
  }
  .right-con {
    display: flex;
    justify-content: space-between;
  }
  .right-con input {
    background-color: #fff;
    opacity: 0.3;
  }
  .section h1 {
    font-size: 1rem;
  }
  .button {
    color: #fff;
    padding: 0.5rem 1rem;
    margin: 0 auto;
    background-color: coral;
  }
  .button2 {
    display: none;
  }
  @media screen and (max-width: 480px) {
    .first {
      flex-direction: column;
    }
    input {
      width: 70%;
    }
    select {
      width: 70%;
    }
    .right-con {
      width: 80%;
    }
    .right-con > input {
      height: 20px;
      width: 20px;
    }
    .info {
      width: 80%;
    }
    .button1 {
      display: none;
    }
    .button2 {
      display: block;
      margin-bottom: 1rem;
    }
  }
`
