import { lazy, Suspense } from 'react'
import AnimatedRoutes from './AnimatedRoutes'
import './App.css'

const Navbar = lazy(() => import('./components/Navbar'))
const Footer = lazy(() => import('./components/Footer'))

// pages to be defined: home, blogs, services, about

function App() {
  return (
    <>
      <Suspense
        fallback={
          <div className='flex justify-center items-center inset-0 fixed text-center'>
            <p className='text-2xl'>Loading...</p>
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
