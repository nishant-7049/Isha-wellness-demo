import { lazy, Suspense } from 'react'
import AnimatedRoutes from './AnimatedRoutes'
import './App.css'

const Navbar = lazy(() => import('./patient/components/Navbar'))
const Footer = lazy(() => import('./patient/components/Footer'))

// pages to be defined: home, blogs, services, about

function App() {
  return (
    <>
      <Suspense
        fallback={
          <div className='text-center items-center flex justify-center h-[50vh]'>
            <div className='animate-spin h-[5rem] w-[5rem] bg-white rounded-full border-[0.5rem] border-[#50acfb] border-t-[white]'></div>
          </div>
        }
      >
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </Suspense>
    </>
  )
}
export default App
