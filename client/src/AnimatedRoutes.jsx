import React, { lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import BookNow from "./patient/components/BookNow";
import { AnimatePresence } from "framer-motion";

// const Home = lazy(() => import("./patient/pages/Home"));
import Home from "./patient/pages/Home";
const PageNotFound = lazy(() => import("./patient/pages/PageNotFound"));
const BlogPage = lazy(() => import("./patient/pages/BlogPage"));
const About = lazy(() => import("./patient/pages/About"));
const Services = lazy(() => import("./patient/pages/ServicesPage"));
const SingleBlog = lazy(() => import("./patient/pages/SingleBlog"));
const Register = lazy(() => import("./auth/LoginSignUp"));
const ResetPassword = lazy(() => import("./auth/ResetPassword"));
const ForgotPassword = lazy(() => import("./auth/ForgotPassword"));
const ForumPage = lazy(() => import("./patient/pages/ForumPage"));
const SingleService = lazy(() => import("./patient/pages/SingleService"));
const Profile = lazy(() => import("./auth/Profile"));
const UpdateProfile = lazy(() => import("./auth/UpdateProfile"));
const UpdatePassword = lazy(() => import("./auth/UpdatePassword"));
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./store/slices/userSlice";
import { getQuote } from "./store/slices/EditFrontSlice";
const NotAuth = lazy(() => import("./auth/NotAuth"));
import UserOptions from "./auth/UserOptions";
const EditFrontend = lazy(() => import("./admin/components/EditFrontend"));
import Dashboard from "./admin/components/Dashboard";
import EditTestimonial from "./admin/components/EditTestimonial";
import EditVideo from "./admin/components/EditVideo";
import EditFaq from "./admin/components/EditFaq";
import EditBlog from "./admin/components/EditBlog";
import EditUser from "./admin/components/EditUser";
import Users from "./admin/components/Users";

const AnimatedRoutes = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getQuote());
  }, [dispatch]);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <AnimatePresence>
      {isAuthenticated && <UserOptions />}
      <Routes location={location} key={location.pathname}>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Register />} />
        <Route
          exact
          path="/passwordreset/:resetToken"
          element={<ResetPassword />}
        />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/service" element={<Services />} />
        <Route exact path="/blogs" element={<BlogPage />} />
        {isAuthenticated ? (
          <Route exact path="/forum" element={<ForumPage />} />
        ) : (
          <Route exact path="/forum" element={<NotAuth />} />
        )}
        {isAuthenticated ? (
          <Route exact path="/account" element={<Profile />} />
        ) : (
          <Route exact path="/forum" element={<NotAuth />} />
        )}
        {isAuthenticated ? (
          <Route exact path="/me/update" element={<UpdateProfile />} />
        ) : (
          <Route exact path="/forum" element={<NotAuth />} />
        )}
        {isAuthenticated ? (
          <Route exact path="/password/update" element={<UpdatePassword />} />
        ) : (
          <Route exact path="/forum" element={<NotAuth />} />
        )}
        <Route exact path="/booknow" element={<BookNow />} />
        <Route exact path="/blog/:id" element={<SingleBlog />} />
        <Route exact path="/service/:id" element={<SingleService />} />
        {isAuthenticated && user && user.role == "admin" && (
          <Route exact path="/admin/edit/frontend" element={<EditFrontend />} />
        )}
        {isAuthenticated && user && user.role == "admin" && (
          <Route exact path="/admin/dashboard" element={<Dashboard />} />
        )}
        {isAuthenticated && user && user.role == "admin" && (
          <Route exact path="/admin/users" element={<Users />} />
        )}
        {isAuthenticated && user && user.role == "admin" && (
          <Route
            exact
            path="/admin/testi/edit/:id"
            element={<EditTestimonial />}
          />
        )}
        {isAuthenticated && user && user.role == "admin" && (
          <Route exact path="/admin/video/edit/:id" element={<EditVideo />} />
        )}
        {isAuthenticated && user && user.role == "admin" && (
          <Route exact path="/admin/faq/edit/:id" element={<EditFaq />} />
        )}
        {isAuthenticated && user && user.role == "admin" && (
          <Route exact path="/admin/blog/edit/:id" element={<EditBlog />} />
        )}
        {isAuthenticated && user && user.role == "admin" && (
          <Route exact path="/admin/user/edit/:id" element={<EditUser />} />
        )}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
