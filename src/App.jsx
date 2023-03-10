import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import './App.css'

const Footer = lazy(() => import('./components/Footer'))
const Register = lazy(() => import('./pages/Register'))
const Login = lazy(() => import('./pages/Login'))
const Home = lazy(() => import('./pages/Home'))
const Admin = lazy(() => import('./pages/AdminPanel'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const About = lazy(() => import('./pages/About'))

// pages to be defined: home, blogs, services, about

function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route exact path={'/'} element={<Home />} />
          <Route exact path={'/register'} element={<Register />} />
          <Route exact path={'/login'} element={<Login />} />
          <Route exact path={'/adminPanel'} element={<Admin />} />
          <Route exact path={'/about'} element={<About />} />
          <Route exact path={'/blogs'} element={<BlogPage />} />
          <Route path={'/*'} element={<div>404 PAGE NOT FOUND !</div>} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}
export default App
