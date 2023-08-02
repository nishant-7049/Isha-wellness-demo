import { lazy, Suspense } from "react";
import AnimatedRoutes from "./AnimatedRoutes";
import { Provider } from "react-redux";
import store from "./store/store";
import Loader from "./auth/Loader";
import "./App.css";

const Navbar = lazy(() => import("./patient/components/Navbar"));
const Footer = lazy(() => import("./patient/components/Footer"));

// pages to be defined: home, blogs, services, about

function App() {
  return (
    <>
      <Provider store={store}>
        <Suspense fallback={<Loader />}>
          <Navbar />
          <AnimatedRoutes />
          <Footer />
        </Suspense>
      </Provider>
    </>
  );
}
export default App;
