import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'

const Home = lazy(() => import('./pages/Home'))
const PageNotFound = lazy(() => import('./components/PageNotFound'))
const Admin = lazy(() => import('./pages/AdminPanel'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const About = lazy(() => import('./pages/About'))
const SingleBlog = lazy(() => import('./pages/SingleBlog'))
const Register = lazy(() => import('./auth/RegisterScreen'))
const Login = lazy(() => import('./auth/LoginScreen'))
const ResetPassword = lazy(() => import('./auth/ResetPasswordScreen'))
const ForgotPassword = lazy(() => import('./auth/ForgotPasswordScreen'))
const ForemPage = lazy(() => import('./pages/ForemPage'))

// pages to be defined: home, blogs, services, about

function App() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className='flex justify-center items-center inset-0 fixed text-center'>
            <p className='text-4xl'>Please Wait Loading...</p>
          </div>
        }
      >
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/adminPanel' element={<Admin />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route
            exact
            path='/passwordreset/:resetToken'
            element={<ResetPassword />}
          />
          <Route exact path='/ForgotPassword' element={<ForgotPassword />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/blogs' element={<BlogPage />} />
          <Route exact path='/forem' element={<ForemPage />} />
          <Route exact path='/blogs/:id' element={<SingleBlog />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
        <Footer />
      </Suspense>
    </>
  )
}
export default App
